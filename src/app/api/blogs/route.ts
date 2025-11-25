import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Blogs } from "@/database/models/Blogs";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blogs.find();
    return NextResponse.json(blogs, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}