import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";
import Resume from "@/models/Resume";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    
    const decoded = verifyToken(token) as { userId: string };
    await dbConnect();

    const userResumes = await Resume.find({ userId: decoded.userId }).select("_id");
    const resumeIds = userResumes.map(r => r._id);
    
    const portfolios = await Portfolio.find({ resumeId: { $in: resumeIds } }).populate("resumeId").sort({ createdAt: -1 });
    
    return NextResponse.json({ portfolios }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Error" }, { status: 500 });
  }
}
