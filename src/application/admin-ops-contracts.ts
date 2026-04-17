import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const v2CreateReservationSchema = z.object({
  customerId: z.string().min(1).optional(),
  customerName: z.string().trim().min(2).max(120),
  customerPhone: z.string().trim().min(8).max(24),
  customerEmail: z.string().email().optional().nullable(),
  date: z.string().regex(dateRegex),
  time: z.string().regex(timeRegex),
  partySize: z.coerce.number().int().min(1).max(20),
  areaPreference: z.enum(["interior", "galeria", "jardin"]).optional(),
  occasionType: z
    .enum(["cumpleanos", "aniversario", "romantica", "familiar", "empresarial", "otro"])
    .optional(),
  source: z.enum(["web", "manual", "whatsapp", "instagram"]).optional(),
  specialNotes: z.string().max(600).optional(),
  internalNotes: z.string().max(600).optional(),
});

export const v2CheckAvailabilitySchema = z.object({
  date: z.string().regex(dateRegex),
  time: z.string().regex(timeRegex),
  partySize: z.coerce.number().int().min(1).max(20),
  areaPreference: z.enum(["interior", "galeria", "jardin"]).optional(),
});

export const v2CancelWithTokenSchema = z.object({
  publicToken: z.string().uuid(),
  reason: z.string().min(3).max(250),
});

export const v2RescheduleWithTokenSchema = z.object({
  publicToken: z.string().uuid(),
  date: z.string().regex(dateRegex),
  time: z.string().regex(timeRegex),
  partySize: z.coerce.number().int().min(1).max(20).optional(),
});

export const v2WaitlistSchema = z.object({
  customerId: z.string().min(1),
  requestedDate: z.string().regex(dateRegex),
  requestedPeriod: z.enum(["lunch", "dinner"]),
  partySize: z.coerce.number().int().min(1).max(20),
  areaPreference: z.enum(["interior", "galeria", "jardin"]).optional(),
  notes: z.string().max(500).optional(),
  priority: z.coerce.number().int().min(0).max(100).default(0),
  status: z.enum(["waiting", "contacted", "accepted", "expired", "cancelled"]).default("waiting"),
});

export const v2ReservationTransitionSchema = z.object({
  reservationId: z.string().min(1),
  nextStatus: z.enum([
    "new_request",
    "pending_review",
    "awaiting_customer_response",
    "confirmed",
    "seated",
    "completed",
    "cancelled_by_guest",
    "cancelled_by_restaurant",
    "no_show",
  ]),
  reason: z.string().max(250).optional(),
});

export const v2AssignTableSchema = z.object({
  reservationId: z.string().min(1),
  tableIds: z.array(z.string().min(1)).min(1).max(4),
});

export const v2SettingsPatchSchema = z.object({
  lunchStartTime: z.string().regex(timeRegex).optional(),
  lunchEndTime: z.string().regex(timeRegex).optional(),
  dinnerStartTime: z.string().regex(timeRegex).optional(),
  dinnerEndTime: z.string().regex(timeRegex).optional(),
  maxPartySizeOnline: z.coerce.number().int().min(1).max(40).optional(),
  maxBookingDaysInAdvance: z.coerce.number().int().min(1).max(365).optional(),
  reservationCutoffMinutes: z.coerce.number().int().min(0).max(1440).optional(),
  reminderHoursBefore: z.coerce.number().int().min(1).max(96).optional(),
  cancellationWindowHours: z.coerce.number().int().min(0).max(168).optional(),
  whatsappNumber: z.string().min(8).max(30).optional(),
  reservationAutoConfirmEnabled: z.boolean().optional(),
  autoConfirmMaxPartySize: z.coerce.number().int().min(1).max(20).optional(),
  bufferMinutesBetweenReservations: z.coerce.number().int().min(0).max(120).optional(),
  toleranceMinutes: z.coerce.number().int().min(0).max(120).optional(),
  holidayClosures: z.array(z.string().regex(dateRegex)).optional(),
  sameDayReminderEnabled: z.boolean().optional(),
  weatherSensitiveGardenEnabled: z.boolean().optional(),
});

export const v2ReminderSchema = z.object({
  date: z.string().regex(dateRegex).optional(),
  sameDay: z.boolean().optional(),
});

export const v2AuditQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(500).optional(),
});

