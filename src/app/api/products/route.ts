import { connectToDB } from "@/lib/mongoose/connect";
import { Product } from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
