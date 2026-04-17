import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

const schema = z.object({
  customerId: z.string().min(1),
  note: z.string().min(2).max(600),
});

export async function POST(request: Request) {
  try {
    const role = await requireStaffRole(["admin", "recepcion"]);
    const payload = schema.parse(await request.json());
    const note = await (await getServices()).adminOpsService.addCustomerNote({
      customerId: payload.customerId,
      note: payload.note,
      actorRole: role as "admin" | "recepcion",
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo guardar la nota" },
      { status: 400 },
    );
  }
}


