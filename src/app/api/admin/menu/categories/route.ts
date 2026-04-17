import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { getDataAccess } from "@/infrastructure/repositories/factory";

const schema = z.object({
  slug: z.string().min(2).max(80),
  name: z.string().min(2).max(120),
  description: z.string().max(300).optional(),
  displayOrder: z.number().int().min(1),
  isActive: z.boolean(),
});

export async function GET() {
  try {
    await requireStaffRole(["admin", "recepcion", "chef"]);
    const data = await getDataAccess();
    return NextResponse.json({ categories: await data.menu.listCategories() });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const input = schema.parse(await request.json());
    const data = await getDataAccess();
    return NextResponse.json({ category: await data.menu.createCategory(input) }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 400 });
  }
}
