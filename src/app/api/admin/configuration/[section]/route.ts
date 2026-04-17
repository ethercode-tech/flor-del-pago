import { NextResponse } from "next/server";
import { z } from "zod";
import { v2SettingsPatchSchema } from "@/application/admin-ops-contracts";
import { getServices } from "@/app/api/_lib";
import { requireStaffRole } from "@/app/api/admin/_auth";

const sectionSchema = z.object({
  section: z.enum(["horarios", "reglas", "areas", "usuarios"]),
});

export async function PATCH(
  request: Request,
  context: { params: Promise<{ section: string }> },
) {
  try {
    const { section } = sectionSchema.parse(await context.params);
    await requireStaffRole(section === "usuarios" ? ["admin"] : ["admin", "recepcion"]);
    const payload = v2SettingsPatchSchema.parse(await request.json());
    const settings = await (await getServices()).adminOpsService.updateSettings(payload);
    return NextResponse.json({ section, settings });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo actualizar configuracion del modulo" },
      { status: 400 },
    );
  }
}

