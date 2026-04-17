import { NextResponse } from "next/server";
import { z } from "zod";
import type { StaffRole } from "@/app/api/admin/_auth";

const schema = z.object({
  role: z.enum(["admin", "recepcion", "chef"]),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role } = schema.parse(body);
    const response = NextResponse.json({ ok: true, role });
    response.cookies.set("fdp_role", role as StaffRole, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Credenciales invalidas" },
      { status: 400 },
    );
  }
}

