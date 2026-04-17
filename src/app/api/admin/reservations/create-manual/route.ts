import { NextResponse } from "next/server";
import { v2CreateReservationSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function POST(request: Request) {
  try {
    const role = await requireStaffRole(["admin", "recepcion"]);
    const body = await request.json();
    const payload = v2CreateReservationSchema.parse(body);
    const { adminOpsService } = await getServices();
    const reservation = await adminOpsService.createManualReservation({
      customerId: payload.customerId ?? `manual_${payload.customerPhone}`,
      customerName: payload.customerName,
      customerPhone: payload.customerPhone,
      customerEmail: payload.customerEmail ?? null,
      date: payload.date,
      time: payload.time,
      partySize: payload.partySize,
      areaPreference: payload.areaPreference ?? null,
      occasionType: payload.occasionType ?? null,
      source: "manual",
      specialNotes: payload.specialNotes ?? null,
      internalNotes: payload.internalNotes ?? null,
      actorRole: role as "admin" | "recepcion",
      actorId: null,
    });
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo crear la reserva manual" },
      { status: 400 },
    );
  }
}


