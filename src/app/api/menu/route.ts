import { NextResponse } from "next/server";
import { getDataAccess } from "@/infrastructure/repositories/factory";

export async function GET() {
  try {
    const data = await getDataAccess();
    const sections = await data.menu.listPublicMenu();
    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudo cargar el menu" },
      { status: 500 },
    );
  }
}
