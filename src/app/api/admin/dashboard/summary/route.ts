import { NextResponse } from "next/server";
import { z } from "zod";
import { getServices } from "@/app/api/_lib";
import { toISODate } from "@/lib/utils";
import { featureFlags } from "@/lib/feature-flags";
import { requireStaffRole } from "@/app/api/admin/_auth";

const schema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});

export async function GET(request: Request) {
  try {
    await requireStaffRole(["admin", "recepcion", "chef"]);
    const { searchParams } = new URL(request.url);
    const input = schema.parse({
      date: searchParams.get("date") ?? undefined,
    });
    const date = input.date ?? toISODate(new Date());
    const { dashboardService, adminOpsService } = await getServices();
    const summary = featureFlags.adminOpsV2
      ? await adminOpsService.summaryByDate(date)
      : await dashboardService.getSummary(date);
    return NextResponse.json(summary);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo cargar el dashboard" },
      { status: 400 },
    );
  }
}
