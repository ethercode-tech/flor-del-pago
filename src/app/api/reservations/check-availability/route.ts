import { NextResponse } from "next/server";
import { v2CheckAvailabilitySchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = v2CheckAvailabilitySchema.parse(body);
    const { adminOpsService } = await getServices();
    const availability = await adminOpsService.checkAvailability(payload);
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo consultar disponibilidad" },
      { status: 400 },
    );
  }
}

