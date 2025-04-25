import { connectToDB } from "@/lib/mongoose/connect";
import { Product } from "@/models/Product";
import { NextRequest, NextResponse } from "next/server";

// Products POST API
export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const data = await req.json();

    const newProduct = await Product.create(data);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { message: "Failed to create product" },
      { status: 500 }
    );
  }
}

interface ProductQuery {
  $or?: Array<{
    [key: string]: {
      $regex: string;
      $options: string;
    };
  }>;
  category?: string;
  price?: {
    $gte: number;
    $lte: number;
  };
  // Add other possible query fields here
}

// Products GET API
export async function GET(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const searchTerm = searchParams.get('searchTerm') || '';
    const category = searchParams.get('category') || 'All';
    const minPrice = Number(searchParams.get('minPrice')) || 0;
    const maxPrice = Number(searchParams.get('maxPrice')) || 20000;
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 12;

    // Base query
    const query: ProductQuery = {};

    // Apply search filter
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    // Apply category filter
    if (category !== 'All') {
      query.category = category;
    }

    // Apply price range filter
    query.price = { $gte: minPrice, $lte: maxPrice };

    // Get total count for pagination
    const total = await Product.countDocuments(query);

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        itemsPerPage: limit
      }
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
