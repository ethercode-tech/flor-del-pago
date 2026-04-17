import { NextResponse } from "next/server";
import { v2ReservationTransitionSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function PATCH(request: Request) {
  try {
    const role = await requireStaffRole(["admin", "recepcion"]);
    const body = await request.json();
    const payload = v2ReservationTransitionSchema.parse(body);
    const reservation = await (await getServices()).adminOpsService.transitionReservation({
      reservationId: payload.reservationId,
      nextStatus: payload.nextStatus,
      reason: payload.reason,
      actorRole: role as "admin" | "recepcion",
      actorId: null,
    });
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar la reserva" },
      { status: 400 },
    );
  }
}


