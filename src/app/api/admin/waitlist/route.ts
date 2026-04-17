import { NextResponse } from "next/server";
import { v2WaitlistSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function GET(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion", "chef"]);
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") ?? undefined;
    const waitlist = await (await getServices()).adminOpsService.listWaitlist(date);
    return NextResponse.json({ waitlist });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo consultar waitlist" },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const payload = v2WaitlistSchema.parse(await request.json());
    const waitlist = await (await getServices()).adminOpsService.createWaitlistEntry({
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
      { error: error instanceof Error ? error.message : "No se pudo agregar a waitlist" },
      { status: 400 },
    );
  }
}

