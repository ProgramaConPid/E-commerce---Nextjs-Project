import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import Product from "@/database/models/Products";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const body: Record<string, any> = {};
    formData.forEach((value, key) => {
      body[key] = value;
    });

    const files = formData.getAll("images") as File[];

    const uploadedImages: string[] = [];

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadResult: any = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "ecommerce/products",
            upload_preset: "e_commerce products",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        uploadStream.end(buffer);
      });

      uploadedImages.push(uploadResult.secure_url);
    }

    const specs: Record<string, any> = {};

    const specKeys = [
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
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("❌ ERROR PRODUCT POST:", error);
    return NextResponse.json(
      { error: "Error creating product" },
      { status: 500 }
    );
  }
}
