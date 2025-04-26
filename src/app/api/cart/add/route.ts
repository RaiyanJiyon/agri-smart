import { connectToDB } from "@/lib/mongoose/connect";
import Cart from "@/models/cart.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { productId, productName, productImage, userId } = await request.json();

    // Check if the cart item already exists
    const existingItem = await Cart.findOne({ productId, userId });

    if (existingItem) {
      return NextResponse.json(
        { message: "Item already in cart" },
        { status: 409 }
      );
    }

    // Create new cart item
    const cartItem = await Cart.create({ productId, productName, productImage, userId });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to create cart item" },
      { status: 500 }
    );
  }
}
