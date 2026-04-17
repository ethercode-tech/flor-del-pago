import { NextResponse } from "next/server";
import { z } from "zod";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { getDataAccess } from "@/infrastructure/repositories/factory";

const schema = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(2).max(140),
  description: z.string().min(8).max(800),
  priceLabel: z.string().max(80).optional(),
  imageUrl: z.url().or(z.literal("")).optional(),
  tags: z.array(z.string().max(40)).optional(),
  isSignature: z.boolean(),
  isAvailable: z.boolean(),
  displayOrder: z.number().int().min(1),
});

export async function GET(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion", "chef"]);
    const data = await getDataAccess();
    const url = new URL(request.url);
    const categoryId = url.searchParams.get("categoryId") ?? undefined;
    return NextResponse.json({ items: await data.menu.listItems(categoryId) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 500 });
  }
}

export async function POST(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const parsed = schema.parse(await request.json());
    const data = await getDataAccess();
    return NextResponse.json(
      {
        item: await data.menu.createItem({
          ...parsed,
          imageUrl: parsed.imageUrl || undefined,
          tags: parsed.tags ?? [],
        }),
      },
      { status: 201 },
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error";
    return NextResponse.json({ error: message }, { status: message === "FORBIDDEN" ? 403 : 400 });
  }
}
