import { NextResponse } from "next/server";
import { v2SettingsPatchSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

export async function PATCH(request: Request) {
  try {
    await requireStaffRole(["admin"]);
    const payload = v2SettingsPatchSchema.parse(await request.json());
    const settings = await (await getServices()).adminOpsService.updateSettings(payload);
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar configuracion" },
      { status: 400 },
    );
  }
}

