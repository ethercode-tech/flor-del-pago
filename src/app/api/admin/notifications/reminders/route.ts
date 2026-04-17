import { NextResponse } from "next/server";
import { v2ReminderSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { toISODate } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const body = await request.json().catch(() => ({}));
    const payload = v2ReminderSchema.parse(body);
    const sent = await (await getServices()).adminOpsService.sendReminders(
      payload.date ?? toISODate(new Date()),
      payload.sameDay ?? false,
    );
    return NextResponse.json({ sent });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudieron enviar recordatorios" },
      { status: 400 },
    );
  }
}

