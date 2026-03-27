import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string };
    const { resumeId, slug, theme } = await req.json();

    await dbConnect();

    let portfolio = await Portfolio.findOne({ resumeId });

    if (portfolio) {
        if (slug && slug !== portfolio.slug) {
            const existingSlug = await Portfolio.findOne({ slug });
            if (existingSlug && existingSlug._id.toString() !== portfolio._id.toString()) {
                return NextResponse.json({ error: "Portfolio URL already taken" }, { status: 400 });
            }
            portfolio.slug = slug;
        }
        if (theme) portfolio.theme = theme;

        await portfolio.save();
        return NextResponse.json({ message: "Portfolio updated", portfolio }, { status: 200 });
    }

    const existingSlug = await Portfolio.findOne({ slug });
    if (existingSlug) {
        return NextResponse.json({ error: "Portfolio URL already taken" }, { status: 400 });
    }

    portfolio = await Portfolio.create({
      userId: decoded.userId,
      resumeId,
      slug,
      theme: theme || "modern-dark"
    });

    return NextResponse.json({ message: "Portfolio created", portfolio }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug");

        await dbConnect();

        if (!slug) {
            const portfolios = await Portfolio.find().populate("resumeId").sort({ createdAt: -1 }).limit(20);
            return NextResponse.json({ portfolios }, { status: 200 });
        }

        const portfolio = await Portfolio.findOne({ slug }).populate("resumeId");

        if (!portfolio) {
            return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
        }

        return NextResponse.json({ portfolio }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
    }
}
