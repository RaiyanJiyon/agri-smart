import { connectToDB } from "@/lib/mongoose/connect";
import { Product } from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Connect to the database
    await connectToDB();

    // Extract the `id` parameter from the URL
    const { id } = await params;

    // Validate the `id`
    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch the product by ID
    const product = await Product.findById(id);

    // If no product is found, return a 404 response
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Return the product data
    return NextResponse.json(product);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching product:", error);

    // Return a generic error message with a 500 status code
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
