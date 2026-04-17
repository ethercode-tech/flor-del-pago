import { NextResponse } from "next/server";
import { getServices } from "@/app/api/_lib";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reservationsService } = await getServices();
    const reservation = await reservationsService.createReservation(body);
    return NextResponse.json({ reservation }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "No se pudo crear la reserva",
      },
      { status: 400 },
    );
  }
}
