import { NextResponse } from "next/server";
import { v2AuditQuerySchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function GET(request: Request) {
  try {
    await requireStaffRole(["admin"]);
    const { searchParams } = new URL(request.url);
    const { limit } = v2AuditQuerySchema.parse({
      limit: searchParams.get("limit") ?? undefined,
    });
    const logs = await (await getServices()).adminOpsService.listAuditLogs(limit ?? 200);
    return NextResponse.json({ logs });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo consultar auditoria" },
      { status: 400 },
    );
  }
}

