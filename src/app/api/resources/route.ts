import { connectToDB } from "@/lib/mongoose/connect";
import Resource from "@/models/Resource";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    const newResource = await Resource.create(body);

    console.log(newResource);
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating resource" },
      { status: 500 }
    );
  }
}

// Define a type for the query object
interface ResourceQuery {
  category?: string; // Optional field
  type?: string; // Optional field
}

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    // Build query
    const query: ResourceQuery = {};
    if (category) query.category = category;
    if (type) query.type = type;

    // Fetch paginated, filtered, and sorted resources
    const resources = await Resource.find(query);

    return NextResponse.json({
      data: resources,

    });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json(
      { error: "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
