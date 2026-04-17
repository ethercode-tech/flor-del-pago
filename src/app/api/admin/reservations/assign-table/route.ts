import { NextResponse } from "next/server";
import { v2AssignTableSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function POST(request: Request) {
  try {
    const role = await requireStaffRole(["admin", "recepcion"]);
    const body = await request.json();
    const payload = v2AssignTableSchema.parse(body);
    const reservation = await (await getServices()).adminOpsService.assignTable({
      reservationId: payload.reservationId,
      tableIds: payload.tableIds,
      actorRole: role as "admin" | "recepcion",
      actorId: null,
    });
    return NextResponse.json({ reservation });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo asignar la mesa" },
      { status: 400 },
    );
  }
}


