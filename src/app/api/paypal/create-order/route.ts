import { NextResponse } from "next/server";
import {
  Client,
  Environment,
  OrdersController,
  CheckoutPaymentIntent,
} from "@paypal/paypal-server-sdk";

const client = new Client({
  environment: Environment.Sandbox,
  clientCredentialsAuthCredentials: {
    oAuthClientId: process.env.PAYPAL_CLIENT_ID!,
    oAuthClientSecret: process.env.PAYPAL_CLIENT_SECRET!,
  },
});

const ordersController = new OrdersController(client);

export async function POST(req: Request) {
  try {
    const { total } = await req.json();
    if (!total)
      return NextResponse.json({ error: "Total is required" }, { status: 400 });

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

    return NextResponse.json(JSON.parse(result.body as string));
  } catch (error) {
    console.error("PayPal Create Order Error:", error);
    return NextResponse.json({ error: "Create order failed" }, { status: 500 });
  }
}
