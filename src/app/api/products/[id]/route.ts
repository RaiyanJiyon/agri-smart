// app/api/products/[id]/route.ts
import { connectToDB } from "@/lib/mongoose/connect";
import { Product } from "@/models/product.model";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  const { id } = params;

  // Validate MongoDB ObjectId
  if (!Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("GET Product Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    const update = await req.json();

    const updatedProduct = await Product.findByIdAndUpdate(params.id, update, {
      new: true,
    });

    if (!updatedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const deletedProduct = await Product.findByIdAndDelete(params.id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
