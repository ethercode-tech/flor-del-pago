import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { getDataAccess } from "@/infrastructure/repositories/factory";

const schema = z.object({
  categoryId: z.string().min(1).optional(),
  name: z.string().min(2).max(140).optional(),
  description: z.string().min(8).max(800).optional(),
  priceLabel: z.string().max(80).optional(),
  imageUrl: z.url().or(z.literal("")).optional(),
  tags: z.array(z.string().max(40)).optional(),
  isSignature: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
  displayOrder: z.number().int().min(1).optional(),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const parsed = schema.parse(await request.json());
    const { id } = await context.params;
    const data = await getDataAccess();
    return NextResponse.json({
      item: await data.menu.updateItem(id, {
        ...parsed,
        imageUrl: parsed.imageUrl || undefined,
      }),
    });
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
    await data.menu.deleteItem(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 400 });
  }
}
