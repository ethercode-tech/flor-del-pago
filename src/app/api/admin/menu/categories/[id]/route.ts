import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { getDataAccess } from "@/infrastructure/repositories/factory";

const schema = z.object({
  slug: z.string().min(2).max(80).optional(),
  name: z.string().min(2).max(120).optional(),
  description: z.string().max(300).optional(),
  displayOrder: z.number().int().min(1).optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const input = schema.parse(await request.json());
    const { id } = await context.params;
    const data = await getDataAccess();
    return NextResponse.json({ category: await data.menu.updateCategory(id, input) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 400 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const { id } = await context.params;
    const data = await getDataAccess();
    await data.menu.deleteCategory(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 400 });
  }
}
