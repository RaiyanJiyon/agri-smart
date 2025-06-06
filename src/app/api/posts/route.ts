import { connectToDB } from "@/lib/mongoose/connect";
import Post from "@/models/post.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();
    const body = await req.json();

    console.log('Received data:', body); // <-- Add this line

    const newPost = await Post.create(body);

    console.log(newPost);
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}
