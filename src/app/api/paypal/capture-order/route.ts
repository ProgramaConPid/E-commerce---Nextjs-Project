import { NextResponse } from "next/server";
import { Client, Environment, OrdersController } from "@paypal/paypal-server-sdk";

// ✅ Cliente PayPal configurado correctamente
const client = new Client({
  environment: Environment.Sandbox,
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  },
});

// ✅ Controlador
const ordersController = new OrdersController(client);

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    // ✅ Validación
    if (!orderId) {
      return NextResponse.json({ error: "OrderId is required" }, { status: 400 });
    }

    // ✅ Capturar orden en PayPal
    const response = await ordersController.captureOrder({
      id: orderId,
    });

    // ✅ Éxito → Devuelve respuesta completa de PayPal
    return NextResponse.json(response.body, { status: 200 });

  } catch (error: any) {
    console.error("PayPal Capture Error:", error);

    return NextResponse.json(
      {
        message: "PayPal capture failed",
        details: error?.message || error,
      },
      { status: 500 }
    );
  }
}
