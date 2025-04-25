import { connectToDB } from "@/lib/mongoose/connect";
import cartModel from "@/models/cart.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDB();

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Missing userId in query" },
        { status: 400 }
      );
    }

    const cartItems = await cartModel.find({ userId: id });

    if (cartItems.length === 0) {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
    }

    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch cart items" },
      { status: 500 }
    );
  }
}
