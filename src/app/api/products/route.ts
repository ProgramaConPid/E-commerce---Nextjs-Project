import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Product from "@/database/models/Products";
import { connectDB } from "@/lib/mongodb";

interface ProductBody {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  tags?: string;
  colors?: string;
  storageOptions?: string;
  description: string;
  stock: string;
  delivery?: string;
  warranty?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; 
}

interface Specs {
  screen?: string;
  processor?: string;
  battery?: string;
  ram?: string;
  gpu?: string;
  cpu?: string;
  storage?: string;
  resolution?: string;
  fps?: string;
  camera?: string;
  refreshRate?: string;
  type?: string;
  noiseCancelling?: string;
  bluetooth?: string;
  mode?: string;
  flightTime?: string;
  weight?: string;
  range?: string;
  video?: string;
  mainCamera?: string;
  frontCamera?: string;
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const body: Partial<ProductBody> = {};
    formData.forEach((value, key) => {
      body[key] = value.toString();
    });

    const files = formData.getAll("images") as File[];

    const uploadedImages: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult = await new Promise<{ secure_url: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "ecommerce/products",
              upload_preset: "e_commerce products",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          );

          uploadStream.end(buffer);
        }
      );

      uploadedImages.push(uploadResult.secure_url);
    }

    const specKeys: (keyof Specs)[] = [
      "screen",
      "processor",
      "battery",
      "ram",
      "gpu",
      "cpu",
      "storage",
      "resolution",
      "fps",
      "camera",
      "refreshRate",
      "type",
      "noiseCancelling",
      "bluetooth",
      "mode",
      "flightTime",
      "weight",
      "range",
      "video",
      "mainCamera",
      "frontCamera",
    ];

    const specs: Specs = {};
    specKeys.forEach((key) => {
      if (body[key]) specs[key] = body[key];
    });

    const newProduct = await Product.create({
      name: body.name,
      category: body.category,
      price: Number(body.price),
      oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
      tags: body.tags ? body.tags.split(",").map((t) => t.trim()) : [],
      colors: body.colors ? body.colors.split(",").map((c) => c.trim()) : [],
      storageOptions: body.storageOptions
        ? body.storageOptions.split(",").map((s) => s.trim())
        : [],
      specs,
      description: body.description,
      images: uploadedImages,
      stock: Number(body.stock),
      delivery: body.delivery || "3-5 days",
      warranty: body.warranty || "1 year",
    } as unknown as ProductBody);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ ERROR PRODUCT POST:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
