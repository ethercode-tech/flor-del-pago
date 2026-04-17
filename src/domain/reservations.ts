import { z } from "zod";
import type {
  AvailabilitySlot,
  Reservation,
  ReservationRequest,
  RestaurantTable,
} from "@/domain/entities";

const PHONE_REGEX = /^[+\d\s()-]{8,20}$/;
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const reservationRequestSchema = z.object({
  customerName: z.string().trim().min(3).max(120),
  customerPhone: z
    .string()
    .trim()
    .regex(PHONE_REGEX, "El telefono no es valido"),
  customerEmail: z.string().email().max(200),
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reservationTime: z
    .string()
    .regex(TIME_REGEX, "Formato de hora invalido (HH:mm)"),
  guestsCount: z.int().min(1).max(16),
  areaPreference: z.enum(["interior", "galeria", "jardin"]).optional(),
  occasionType: z.string().trim().max(120).optional(),
  notes: z.string().trim().max(600).optional(),
  source: z.enum(["web", "manual", "whatsapp"]).optional(),
});

export function validateReservationInput(input: unknown): ReservationRequest {
  return reservationRequestSchema.parse(input);
}

export function slotKey(reservationDate: string, reservationTime: string): string {
  return `${reservationDate}T${reservationTime}`;
}

export function suggestTableForReservation(
  tables: RestaurantTable[],
  existingReservations: Reservation[],
  reservationDate: string,
  reservationTime: string,
  guestsCount: number,
  preferredArea?: RestaurantTable["area"],
): AvailabilitySlot {
  const requestedKey = slotKey(reservationDate, reservationTime);
  const occupiedIds = new Set(
    existingReservations
      .filter((reservation) => {
        if (!reservation.assignedTableId) return false;
        if (reservation.status === "cancelled" || reservation.status === "no_show") {
          return false;
        }
        return slotKey(reservation.reservationDate, reservation.reservationTime) === requestedKey;
      })
      .map((reservation) => reservation.assignedTableId as string),
  );

  const eligibleByCapacity = tables.filter(
    (table) => table.capacity >= guestsCount && !occupiedIds.has(table.id),
  );

  const eligibleArea = preferredArea
    ? eligibleByCapacity.filter((table) => table.area === preferredArea)
    : eligibleByCapacity;
  const ordered = [...eligibleArea].sort((a, b) => a.capacity - b.capacity);
  const selected = ordered[0];

  if (!selected) {
    return {
      area: preferredArea ?? "interior",
      hasAvailability: false,
      suggestedTableId: null,
      reason: "No hay capacidad disponible para ese horario",
    };
  }

  return {
    area: selected.area,
    hasAvailability: true,
    suggestedTableId: selected.id,
  };
}
