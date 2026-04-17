import { NextResponse } from "next/server";
import { v2WaitlistSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = v2WaitlistSchema.parse(body);
    const { adminOpsService } = await getServices();
    const waitlist = await adminOpsService.createWaitlistEntry({
      customerId: payload.customerId,
      requestedDate: payload.requestedDate,
      requestedPeriod: payload.requestedPeriod,
      partySize: payload.partySize,
      areaPreference: payload.areaPreference ?? null,
      notes: payload.notes ?? null,
      priority: payload.priority,
      status: payload.status,
    });
    return NextResponse.json({ waitlist }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo ingresar a lista de espera" },
      { status: 400 },
    );
  }
}

