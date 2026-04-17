import { NextResponse } from "next/server";
import { v2RescheduleWithTokenSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = v2RescheduleWithTokenSchema.parse(body);
    const { adminOpsService } = await getServices();
    const reservation = await adminOpsService.rescheduleWithToken(payload);
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo reagendar la reserva" },
      { status: 400 },
    );
  }
}

