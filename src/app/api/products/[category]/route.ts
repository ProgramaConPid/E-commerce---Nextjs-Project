import { NextResponse } from "next/server";
import Product from "@/database/models/Products";
import { connectDB } from "@/lib/mongodb";

type Params = {
  category: string;
};

export async function GET(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  try {
    await connectDB();

    const { category } = await params;

    if (!category) {
      return NextResponse.json(
        { error: "Category is required" },
        { status: 400 }
      );
    }

    const parsedCategory = category
      .replace(/-/g, " ") 
      .replace(/\b\w/g, (c) => c.toUpperCase()); 

    const products = await Product.find({
      category: { $regex: new RegExp(`^${parsedCategory}$`, "i") },
    });

    return NextResponse.json(products, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
