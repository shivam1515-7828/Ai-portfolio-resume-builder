import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Resume from "@/models/Resume";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;
  return verifyToken(token) as { userId: string };
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const unwrappedParams = await params;
    
    await dbConnect();
    const resume = await Resume.findOne({ _id: unwrappedParams.id, userId: user.userId });
    if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const unwrappedParams = await params;
    const body = await req.json();

    await dbConnect();
    const resume = await Resume.findOneAndUpdate(
      { _id: unwrappedParams.id, userId: user.userId },
      { $set: body },
      { new: true }
    );

    if (!resume) return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ message: "Updated", resume }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}
