// app/api/users/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDB } from "@/lib/mongoose/connect";

export async function POST(req: Request) {
  await connectToDB();
  const body = await req.json();

  const { name, phone, email, password, village, district, state, primaryCrop, landSize } = body;

  try {
    // Check for existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      village,
      district,
      state,
      primaryCrop,
      landSize,
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("Error creating user:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
