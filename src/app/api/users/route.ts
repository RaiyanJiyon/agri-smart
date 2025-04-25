// app/api/users/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user.model";
import { connectToDB } from "@/lib/mongoose/connect";

export async function POST(req: Request) {
  try {
    await connectToDB();
    const body = await req.json();

    console.log("Received registration data:", body); // Debug log

    const { name, phone, email, password, village, district, state, primaryCrop, landSize } = body;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with explicit role
    const newUser = await User.create({
      name,
      phone,
      email,
      password: hashedPassword,
      role: "user", // Explicitly set role
      village: village || undefined,
      district: district || undefined,
      state: state || undefined,
      primaryCrop: primaryCrop || undefined,
      landSize: landSize || undefined,
    });

    console.log("Created user:", newUser); // Debug log

    // Return user data without password
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      village: newUser.village,
      district: newUser.district,
      state: newUser.state,
      createdAt: newUser.createdAt,
    };

    return NextResponse.json(userResponse, { status: 201 });
  } catch (error) {
    console.error("Error in user registration:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}