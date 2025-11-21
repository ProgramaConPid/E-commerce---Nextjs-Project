import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/database/models/Messages";

export async function POST(request: Request) {
  try {
    await connectDB();

    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    return NextResponse.json(
      { message: "Your message has been sent successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving message:", error);
    return NextResponse.json(
      { error: "An error occurred while sending your message." },
      { status: 500 }
    );
  }
}