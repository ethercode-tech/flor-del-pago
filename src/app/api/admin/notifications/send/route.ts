import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

const schema = z.object({
  reservationId: z.string().min(1),
  templateKey: z.enum([
    "reservation_received",
    "reservation_confirmed",
    "reservation_rejected",
    "reservation_rescheduled",
    "reminder_24h",
    "reminder_same_day",
    "waitlist_opening",
    "cancellation_received",
    "no_show_followup",
  ]),
  channel: z.enum(["email", "whatsapp"]).optional(),
  customMessage: z.string().min(2).max(1000),
});

export async function POST(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const payload = schema.parse(await request.json());
    await (await getServices()).adminOpsService.sendManualNotification(payload);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo enviar notificacion" },
      { status: 400 },
    );
  }
}

