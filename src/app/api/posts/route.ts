import { connectToDB } from "@/lib/mongoose/connect";
import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    const newPost = await Post.create(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error creating post" }, { status: 500 });
  }
}