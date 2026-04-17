import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const redirectUrl = new URL("/admin/login", request.url);
  const response = NextResponse.redirect(redirectUrl, { status: 303 });
  response.cookies.set("fdp_role", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
  return response;
}
