import { NextResponse } from "next/server";
import User from "@/database/models/Users";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { userId, productId, quantity = 1 } = await req.json();

    if (!userId || !productId) {
      return NextResponse.json(
        { error: "userId y productId son obligatorios" },
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

    // Buscar si el producto ya está en el carrito
    const itemIndex = user.cart.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex >= 0) {
      user.cart[itemIndex].quantity += quantity;
    } else {
      user.cart.push({
        productId,
        quantity,
      });
    }

    await user.save();

    return NextResponse.json({
      message: "Producto agregado al carrito",
      cart: user.cart,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
