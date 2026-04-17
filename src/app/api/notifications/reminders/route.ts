import { NextResponse } from "next/server";
import { getServices } from "@/app/api/_lib";

export async function POST() {
  try {
    const { reservationsService, notificationsService } = await getServices();
    const bookings = await reservationsService.listUpcomingForReminder();
    await Promise.all(
      bookings
        .filter((booking) => booking.status === "confirmed")
        .map((booking) =>
          notificationsService.sendReminder({
            name: booking.customerName,
            phone: booking.customerPhone,
            email: booking.customerEmail ?? "sin-email@flordelpago.com",
            date: booking.reservationDate,
            time: booking.reservationTime,
          }),
        ),
    );
    return NextResponse.json({ sent: bookings.length });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "No se pudieron enviar recordatorios" },
      { status: 500 },
    );
  }
}
