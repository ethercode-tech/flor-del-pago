export type StaffRole = "admin" | "recepcion" | "chef";

export type ReservationStatusV2 =
  | "new_request"
  | "pending_review"
  | "awaiting_customer_response"
  | "confirmed"
  | "seated"
  | "completed"
  | "cancelled_by_guest"
  | "cancelled_by_restaurant"
  | "no_show";

export type AreaType = "interior" | "galeria" | "jardin";
export type ServicePeriod = "lunch" | "dinner";
export type TableStatus = "libre" | "reservada" | "ocupada" | "bloqueada" | "fuera_de_servicio";
export type ReservationSource = "web" | "manual" | "whatsapp" | "instagram";
export type OccasionType =
  | "cumpleanos"
  | "aniversario"
  | "romantica"
  | "familiar"
  | "empresarial"
  | "otro";
export type WaitlistStatus = "waiting" | "contacted" | "accepted" | "expired" | "cancelled";
export type NotificationChannel = "email" | "whatsapp";
export type NotificationStatus = "queued" | "sent" | "failed";

export interface RestaurantSettings {
  id: string;
  lunchStartTime: string;
  lunchEndTime: string;
  dinnerStartTime: string;
  dinnerEndTime: string;
  maxPartySizeOnline: number;
  maxBookingDaysInAdvance: number;
  reservationCutoffMinutes: number;
  reminderHoursBefore: number;
  cancellationWindowHours: number;
  whatsappNumber: string;
  reservationAutoConfirmEnabled: boolean;
  autoConfirmMaxPartySize: number;
  bufferMinutesBetweenReservations: number;
  toleranceMinutes: number;
  holidayClosures: string[];
  sameDayReminderEnabled: boolean;
  weatherSensitiveGardenEnabled: boolean;
}

export interface RestaurantTableV2 {
  id: string;
  code: string;
  area: AreaType;
  capacityMin: number;
  capacityMax: number;
  status: TableStatus;
  isActive: boolean;
  isPremium: boolean;
  isRomantic: boolean;
  isAccessible: boolean;
  nearWindow: boolean;
  locationOrder: number;
  outdoorExposureLevel: "low" | "medium" | "high";
  activeServicePeriods: ServicePeriod[];
  combinableWithTableIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomerProfile {
  id: string;
  fullName: string;
  phone: string;
  email: string | null;
  birthday: string | null;
  notes: string | null;
  allergies: string | null;
  vip: boolean;
  visits: number;
  noShows: number;
  reliabilityScore: number;
  preferredArea: AreaType | null;
  preferredOccasion: OccasionType | null;
  lastVisitAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface ReservationRecord {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  date: string;
  time: string;
  partySize: number;
  estimatedDurationMinutes: number;
  areaPreference: AreaType | null;
  occasionType: OccasionType | null;
  source: ReservationSource;
  status: ReservationStatusV2;
  assignedTableId: string | null;
  assignedTableGroup: string[];
  specialNotes: string | null;
  internalNotes: string | null;
  confirmationSentAt: string | null;
  reminder24hSentAt: string | null;
  reminderSameDaySentAt: string | null;
  cancellationReason: string | null;
  cancellationToken: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface WaitlistEntry {
  id: string;
  customerId: string;
  requestedDate: string;
  requestedPeriod: ServicePeriod;
  partySize: number;
  areaPreference: AreaType | null;
  notes: string | null;
  priority: number;
  status: WaitlistStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationEvent {
  id: string;
  reservationId: string;
  eventType: string;
  oldValue: Record<string, unknown> | null;
  newValue: Record<string, unknown> | null;
  actorRole: StaffRole | "system" | "guest";
  actorId: string | null;
  createdAt: string;
}

export interface NotificationLog {
  id: string;
  reservationId: string | null;
  customerId: string | null;
  channel: NotificationChannel;
  templateKey:
    | "reservation_received"
    | "reservation_confirmed"
    | "reservation_rejected"
    | "reservation_rescheduled"
    | "reminder_24h"
    | "reminder_same_day"
    | "waitlist_opening"
    | "cancellation_received"
    | "no_show_followup";
  status: NotificationStatus;
  deliveryAttempts: number;
  lastAttemptAt: string | null;
  failureReason: string | null;
  externalMessageId: string | null;
  payload: Record<string, unknown>;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  actorRole: StaffRole | "system" | "guest";
  actorId: string | null;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
  createdAt: string;
}

export const ACTIVE_RESERVATION_STATUSES: ReservationStatusV2[] = [
  "new_request",
  "pending_review",
  "awaiting_customer_response",
  "confirmed",
  "seated",
];

const TRANSITIONS: Record<ReservationStatusV2, ReservationStatusV2[]> = {
  new_request: ["pending_review", "confirmed", "awaiting_customer_response", "cancelled_by_restaurant"],
  pending_review: ["awaiting_customer_response", "confirmed", "cancelled_by_restaurant"],
  awaiting_customer_response: ["confirmed", "cancelled_by_guest", "cancelled_by_restaurant", "pending_review"],
  confirmed: ["seated", "cancelled_by_guest", "cancelled_by_restaurant", "no_show", "awaiting_customer_response"],
  seated: ["completed", "cancelled_by_restaurant"],
  completed: [],
  cancelled_by_guest: [],
  cancelled_by_restaurant: [],
  no_show: [],
};

export function isValidReservationTransition(
  from: ReservationStatusV2,
  to: ReservationStatusV2,
): boolean {
  return TRANSITIONS[from].includes(to);
}

export function estimatedDurationByPartySize(partySize: number): number | null {
  if (partySize <= 2) return 90;
  if (partySize <= 4) return 105;
  if (partySize <= 6) return 120;
  if (partySize <= 10) return 135;
  return null;
}

export function servicePeriodByTime(time: string): ServicePeriod {
  const [hour] = time.split(":").map((part) => Number(part));
  return hour >= 17 ? "dinner" : "lunch";
}
