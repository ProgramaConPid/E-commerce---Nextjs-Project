import { connectDB } from "@/lib/mongodb";
import Product from "@/database/models/Products";

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find({ tags: { $in: ["new"] } });
    return Response.json(products, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
