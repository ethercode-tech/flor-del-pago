import { NextResponse } from "next/server";
import { availabilityQuerySchema } from "@/application/contracts";
import { getServices } from "@/app/api/_lib";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const input = availabilityQuerySchema.parse({
      date: searchParams.get("date"),
      guests: searchParams.get("guests"),
      area: searchParams.get("area") ?? undefined,
    });
    const { reservationsService } = await getServices();
    const availability = await reservationsService.checkAvailability(input);
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Parámetros inválidos" },
      { status: 400 },
    );
  }
}
