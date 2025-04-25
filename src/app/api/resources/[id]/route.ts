import { connectToDB } from "@/lib/mongoose/connect";
import Resource from "@/models/resource.model";
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
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }

    // Fetch the resource by ID
    const resource = await Resource.findById(id);

    // If no resource is found, return a 404 response
    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    // Return the resource data
    return NextResponse.json(resource);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching resource:", error);

    // Return a generic error message with a 500 status code
    return NextResponse.json(
      { error: "Failed to fetch resource" },
      { status: 500 }
    );
  }
}
