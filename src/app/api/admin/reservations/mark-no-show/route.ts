import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

const schema = z.object({ reservationId: z.string().min(1), reason: z.string().min(2).max(250).optional() });

export async function POST(request: Request) {
  try {
    const role = await requireStaffRole(["admin", "recepcion"]);
    const payload = schema.parse(await request.json());
    const reservation = await (await getServices()).adminOpsService.transitionReservation({
      reservationId: payload.reservationId,
      nextStatus: "no_show",
      actorRole: role as "admin" | "recepcion",
      reason: payload.reason,
    });
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo marcar no_show" },
      { status: 400 },
    );
  }
}


