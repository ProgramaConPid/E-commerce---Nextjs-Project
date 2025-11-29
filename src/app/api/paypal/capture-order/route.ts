import { NextResponse } from "next/server";
import {
  Client,
  Environment,
  OrdersController,
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
    const { orderId } = await req.json();

    console.log("📩 ORDERID RECIBIDO:", orderId);

    if (!orderId) {
      return NextResponse.json({ error: "Order ID missing" }, { status: 400 });
    }

    const response = await ordersController.captureOrder({
      id: orderId,
    });

    console.log("✅ CAPTURE RESULT:", response.body);

    return NextResponse.json(JSON.parse(response.body as string));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ CAPTURE ERROR:", error?.result || error);

    return NextResponse.json(
      {
        error: "Capture failed",
        details: error?.result || "Unknown error",
      },
      { status: 500 }
    );
  }
}
