import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { generateResumeContent } from "@/lib/ai";

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = await req.json();
    const aiContent = await generateResumeContent(userData);

    return NextResponse.json({ aiContent }, { status: 200 });
  } catch (error: any) {
    console.error("AI Generation API Error:", error.response?.data || error.message);
    return NextResponse.json({ 
       error: error.response?.data?.error?.message || error.message || "Failed to generate content" 
    }, { status: 500 });
  }
}
