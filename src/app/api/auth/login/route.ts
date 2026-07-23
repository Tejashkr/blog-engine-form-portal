import {
  createSessionToken,
  getAuthSecret,
  isAuthEnabled,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  verifyPassword,
} from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!isAuthEnabled()) {
    return NextResponse.json({ success: true });
  }

  try {
    const body = (await request.json()) as { password?: string };
    const password = body.password ?? "";

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, message: "Wrong password. Try again." },
        { status: 401 },
      );
    }

    const secret = getAuthSecret();
    if (!secret) {
      return NextResponse.json(
        { success: false, message: "Auth is misconfigured." },
        { status: 500 },
      );
    }

    const token = await createSessionToken(secret);
    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request." },
      { status: 400 },
    );
  }
}
