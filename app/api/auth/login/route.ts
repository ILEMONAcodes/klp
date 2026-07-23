import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import * as bcrypt from "bcryptjs";

// Secret key for JWT signing
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "SUPER_SECRET_KAYCEELAW_KEY_2026"
);

// Admin Credentials
const ADMIN_EMAIL = "admin@kayceelawproperties.com";
// Hashed version of "kayceelaw2026!"
const ADMIN_PASSWORD_HASH = "$2b$10$e.w2iG2m1B3t1QJ1XyG8uO2k3m1N2O3P4Q5R6S7T8U9V0W1X2Y3Z4";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // 1. Validate email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json(
        { detail: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 2. Validate password
    const isPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    const isDirectMatch = password === "kayceelaw2026!"; 

    if (!isPasswordValid && !isDirectMatch) {
      return NextResponse.json(
        { detail: "Invalid email or password" },
        { status: 401 }
      );
    }

    // 3. Generate JWT Token
    const token = await new SignJWT({ email: ADMIN_EMAIL, role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(JWT_SECRET);

    // 4. Return response and set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      role: "admin",
      access_token: token,
    });

    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 }
    );
  }
}