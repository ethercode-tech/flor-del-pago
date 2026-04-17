import { z } from "zod";
import { reservationRequestSchema } from "@/domain/reservations";

export const reservationResponseSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "confirmed", "seated", "completed", "cancelled", "no_show"]),
});

export const availabilityQuerySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  guests: z.coerce.number().int().min(1).max(16),
  area: z.enum(["interior", "galeria", "jardin"]).optional(),
});

export const adminReservationPatchSchema = z.object({
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  reservationTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/).optional(),
  status: z.enum(["pending", "confirmed", "seated", "completed", "cancelled", "no_show"]).optional(),
  assignedTableId: z.string().nullable().optional(),
  notes: z.string().max(600).optional(),
});

export type ReservationRequestContract = z.infer<typeof reservationRequestSchema>;
export type ReservationResponseContract = z.infer<typeof reservationResponseSchema>;
