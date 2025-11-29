import { NextResponse } from "next/server";
import User from "@/database/models/Users";
import { connectDB } from "@/lib/mongodb";

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId).select("addresses");

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user.addresses || []);
  } catch (error) {
    console.error("GET ADDRESSES ERROR:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}


export async function POST(req: Request) {
  try {
    await connectDB();

    const {
      userId,
      street,
      city,
      state,
      zip,
      country,
      phone,
      place,
    } = await req.json();

    if (!userId || !street || !city || !country) {
      return NextResponse.json(
        { error: "userId, street, city y country son obligatorios" },
        { status: 400 }
      );
    }

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    user.addresses.push({
      street,
      city,
      state,
      zip,
      country,
      phone,
      place,
    });

    await user.save();

    return NextResponse.json({
      message: "Dirección agregada correctamente",
      addresses: user.addresses,
    });

  } catch (error) {
    console.error("Error guardando dirección:", error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
