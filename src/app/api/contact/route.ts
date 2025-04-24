import { connectToDB } from "@/lib/mongoose/connect";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const body = await request.json();

    const newMessage = await Contact.create(body);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error creating message" },
      { status: 500 }
    );
  }
}
