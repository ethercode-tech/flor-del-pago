import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";
import { toISODate } from "@/lib/utils";

const schema = z.object({
  metric: z.enum(["summary", "notifications", "audit"]),
});

export async function GET(
  request: Request,
  context: { params: Promise<{ metric: string }> },
) {
  try {
    await requireStaffRole(["admin", "recepcion"]);
    const { metric } = schema.parse(await context.params);
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date") ?? toISODate(new Date());
    const limit = Number(searchParams.get("limit") ?? "50");
    const { adminOpsService } = await getServices();

    if (metric === "summary") {
      return NextResponse.json(await adminOpsService.summaryByDate(date));
    }
    if (metric === "notifications") {
      return NextResponse.json(await adminOpsService.listNotificationLogs(limit));
    }
    return NextResponse.json(await adminOpsService.listAuditLogs(limit));
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo generar el reporte" },
      { status: 400 },
    );
  }
}

