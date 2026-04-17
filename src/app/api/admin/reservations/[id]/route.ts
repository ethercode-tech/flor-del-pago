import { NextResponse } from "next/server";
import { adminReservationPatchSchema } from "@/application/contracts";
import { getServices } from "@/app/api/_lib";

export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const body = await request.json();
    const payload = adminReservationPatchSchema.parse(body);
    const params = await context.params;
    const { reservationsService } = await getServices();
    const reservation = await reservationsService.updateReservation(params.id, payload);
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar la reserva" },
      { status: 400 },
    );
  }
}
