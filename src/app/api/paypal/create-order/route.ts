import { NextResponse } from "next/server";
import {
  Client,
  Environment,
  OrdersController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";

// ✅ Crear cliente de PayPal
const client = new Client({
  environment: Environment.Sandbox,

  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  },
});

// ✅ Controlador de órdenes
const ordersController = new OrdersController(client);

export async function POST(req: Request) {
  try {
    const { total } = await req.json();

    if (!total) {
      return NextResponse.json(
        { error: "Total is required" },
        { status: 400 }
      );
    }

    // ✅ Crear orden
    const result = await ordersController.createOrder({
      body: {
        intent: CheckoutPaymentIntent.Capture,
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: Number(total).toFixed(2),
            },
          },
        ],
      },
    });

    // ✅ Devolver respuesta completa de PayPal
    return NextResponse.json(result.body);

  } catch (error) {
    console.error("PayPal Create Order Error:", error);

    return NextResponse.json(
      { error: "Create order failed" },
      { status: 500 }
    );
  }
}
