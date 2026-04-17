import { addDays, parseISO } from "date-fns";
import type { DashboardSummary, Reservation, RestaurantTable, TableArea } from "@/domain/entities";

export function buildDashboardSummary(
  dateISO: string,
  reservations: Reservation[],
  tables: RestaurantTable[],
): DashboardSummary {
  const today = parseISO(dateISO);
  const nextSevenDays = addDays(today, 7);

  const todaysReservations = reservations.filter((r) => r.reservationDate === dateISO).length;
  const upcomingReservations = reservations.filter((r) => {
    const date = parseISO(r.reservationDate);
    return date > today && date <= nextSevenDays;
  }).length;

  const occupiedTables = new Set(
    reservations
      .filter(
        (r) =>
          r.reservationDate === dateISO &&
          r.assignedTableId &&
          (r.status === "confirmed" || r.status === "seated" || r.status === "completed"),
      )
      .map((r) => r.assignedTableId as string),
  ).size;

  const cancellations = reservations.filter(
    (r) => r.reservationDate === dateISO && r.status === "cancelled",
  ).length;
  const noShows = reservations.filter(
    (r) => r.reservationDate === dateISO && r.status === "no_show",
  ).length;

  const confirmed = reservations.filter(
    (r) => r.reservationDate === dateISO && r.status === "confirmed",
  ).length;
  const pending = reservations.filter((r) => r.reservationDate === dateISO && r.status === "pending").length;
  const denominator = confirmed + pending;
  const confirmationRate = denominator === 0 ? 0 : Number(((confirmed / denominator) * 100).toFixed(2));

  const areaOrder: TableArea[] = ["interior", "galeria", "jardin"];
  const occupancyByArea = areaOrder.map((area) => {
    const areaTables = tables.filter((table) => table.area === area);
    const occupied = areaTables.filter((table) =>
      reservations.some(
        (reservation) =>
          reservation.reservationDate === dateISO &&
          reservation.assignedTableId === table.id &&
          (reservation.status === "confirmed" ||
            reservation.status === "seated" ||
            reservation.status === "completed"),
      ),
    ).length;
    return { area, occupied, total: areaTables.length };
  });

  return {
    date: dateISO,
    todaysReservations,
    upcomingReservations,
    occupiedTables,
    cancellations,
    noShows,
    confirmationRate,
    occupancyByArea,
  };
}
