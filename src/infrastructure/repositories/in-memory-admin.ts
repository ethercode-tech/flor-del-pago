import {
  ACTIVE_RESERVATION_STATUSES,
  estimatedDurationByPartySize,
  type AuditLog,
  type CustomerProfile,
  type NotificationLog,
  type ReservationEvent,
  type ReservationRecord,
  type RestaurantSettings,
  type RestaurantTableV2,
  type WaitlistEntry,
} from "@/domain/admin-ops";
import type { AdminOpsRepository } from "@/infrastructure/repositories/types";
import { toISODate } from "@/lib/utils";

const now = () => new Date().toISOString();
let seq = 1000;
function nextId(prefix: string): string {
  seq += 1;
  return `${prefix}_${seq}`;
}

const settings: RestaurantSettings = {
  id: "rs_1",
  lunchStartTime: "12:30",
  lunchEndTime: "15:30",
  dinnerStartTime: "20:00",
  dinnerEndTime: "23:30",
  maxPartySizeOnline: 10,
  maxBookingDaysInAdvance: 45,
  reservationCutoffMinutes: 120,
  reminderHoursBefore: 24,
  cancellationWindowHours: 6,
  whatsappNumber: "+543885134101",
  reservationAutoConfirmEnabled: true,
  autoConfirmMaxPartySize: 6,
  bufferMinutesBetweenReservations: 15,
  toleranceMinutes: 20,
  holidayClosures: [],
  sameDayReminderEnabled: true,
  weatherSensitiveGardenEnabled: true,
};

const tables: RestaurantTableV2[] = [
  {
    id: "tb_1",
    code: "I-01",
    area: "interior",
    capacityMin: 1,
    capacityMax: 2,
    status: "libre",
    isActive: true,
    isPremium: true,
    isRomantic: true,
    isAccessible: true,
    nearWindow: true,
    locationOrder: 1,
    outdoorExposureLevel: "low",
    activeServicePeriods: ["lunch", "dinner"],
    combinableWithTableIds: ["tb_2"],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "tb_2",
    code: "I-02",
    area: "interior",
    capacityMin: 2,
    capacityMax: 4,
    status: "libre",
    isActive: true,
    isPremium: false,
    isRomantic: false,
    isAccessible: true,
    nearWindow: false,
    locationOrder: 2,
    outdoorExposureLevel: "low",
    activeServicePeriods: ["lunch", "dinner"],
    combinableWithTableIds: ["tb_1"],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "tb_3",
    code: "G-01",
    area: "galeria",
    capacityMin: 2,
    capacityMax: 4,
    status: "libre",
    isActive: true,
    isPremium: true,
    isRomantic: true,
    isAccessible: false,
    nearWindow: false,
    locationOrder: 1,
    outdoorExposureLevel: "medium",
    activeServicePeriods: ["lunch", "dinner"],
    combinableWithTableIds: [],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "tb_4",
    code: "J-01",
    area: "jardin",
    capacityMin: 2,
    capacityMax: 6,
    status: "libre",
    isActive: true,
    isPremium: true,
    isRomantic: true,
    isAccessible: false,
    nearWindow: false,
    locationOrder: 1,
    outdoorExposureLevel: "high",
    activeServicePeriods: ["lunch", "dinner"],
    combinableWithTableIds: ["tb_5"],
    createdAt: now(),
    updatedAt: now(),
  },
  {
    id: "tb_5",
    code: "J-02",
    area: "jardin",
    capacityMin: 2,
    capacityMax: 6,
    status: "libre",
    isActive: true,
    isPremium: false,
    isRomantic: false,
    isAccessible: false,
    nearWindow: false,
    locationOrder: 2,
    outdoorExposureLevel: "high",
    activeServicePeriods: ["lunch", "dinner"],
    combinableWithTableIds: ["tb_4"],
    createdAt: now(),
    updatedAt: now(),
  },
];

const customers: CustomerProfile[] = [
  {
    id: "cu_1",
    fullName: "Maria Gomez",
    phone: "+543885000001",
    email: "maria@example.com",
    birthday: null,
    notes: "Prefiere interior tranquilo",
    allergies: null,
    vip: true,
    visits: 5,
    noShows: 0,
    reliabilityScore: 95,
    preferredArea: "interior",
    preferredOccasion: "aniversario",
    lastVisitAt: toISODate(new Date()),
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  },
];

const reservations: ReservationRecord[] = [
  {
    id: "rv_1",
    customerId: "cu_1",
    customerName: "Maria Gomez",
    customerPhone: "+543885000001",
    customerEmail: "maria@example.com",
    date: toISODate(new Date()),
    time: "21:00",
    partySize: 2,
    estimatedDurationMinutes: 90,
    areaPreference: "interior",
    occasionType: "aniversario",
    source: "web",
    status: "confirmed",
    assignedTableId: "tb_1",
    assignedTableGroup: ["tb_1"],
    specialNotes: "Mesa romantica",
    internalNotes: null,
    confirmationSentAt: now(),
    reminder24hSentAt: null,
    reminderSameDaySentAt: null,
    cancellationReason: null,
    cancellationToken: "tok_rv_1",
    createdBy: null,
    updatedBy: null,
    createdAt: now(),
    updatedAt: now(),
    deletedAt: null,
  },
];

const reservationEvents: ReservationEvent[] = [];
const waitlistEntries: WaitlistEntry[] = [];
const notificationLogs: NotificationLog[] = [];
const auditLogs: AuditLog[] = [];
const customerNotes: Array<{ id: string; customerId: string; note: string; createdAt: string; createdBy: string | null }> = [];

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

function parseDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

export class InMemoryAdminOpsRepository implements AdminOpsRepository {
  async getSettings(): Promise<RestaurantSettings> {
    return { ...settings };
  }

  async updateSettings(input: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    Object.assign(settings, input);
    return { ...settings };
  }

  async listTables(): Promise<RestaurantTableV2[]> {
    return tables.map((table) => ({ ...table }));
  }

  async listCustomers(): Promise<CustomerProfile[]> {
    return customers.filter((customer) => !customer.deletedAt).map((customer) => ({ ...customer }));
  }

  async listReservations(filters?: {
    dateFrom?: string;
    dateTo?: string;
    date?: string;
    status?: ReservationRecord["status"];
  }): Promise<ReservationRecord[]> {
    return reservations
      .filter((reservation) => !reservation.deletedAt)
      .filter((reservation) => {
        if (filters?.date && reservation.date !== filters.date) return false;
        if (filters?.status && reservation.status !== filters.status) return false;
        if (filters?.dateFrom && reservation.date < filters.dateFrom) return false;
        if (filters?.dateTo && reservation.date > filters.dateTo) return false;
        return true;
      })
      .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))
      .map((reservation) => ({ ...reservation }));
  }

  async getReservationById(reservationId: string): Promise<ReservationRecord | null> {
    const reservation = reservations.find((item) => item.id === reservationId && !item.deletedAt);
    return reservation ? { ...reservation } : null;
  }

  async createReservation(input: Omit<ReservationRecord, "id" | "createdAt" | "updatedAt" | "deletedAt">): Promise<ReservationRecord> {
    const reservation: ReservationRecord = {
      ...input,
      id: nextId("rv"),
      createdAt: now(),
      updatedAt: now(),
      deletedAt: null,
    };
    reservations.push(reservation);
    return { ...reservation };
  }

  async updateReservation(
    reservationId: string,
    input: Partial<ReservationRecord>,
    meta: { eventType: string; actorRole: "admin" | "recepcion" | "chef" | "system" | "guest"; actorId?: string | null },
  ): Promise<ReservationRecord> {
    const index = reservations.findIndex((item) => item.id === reservationId && !item.deletedAt);
    if (index < 0) throw new Error("Reserva no encontrada");

    const previous = { ...reservations[index] };
    reservations[index] = {
      ...reservations[index],
      ...input,
      updatedAt: now(),
    };

    await this.createReservationEvent({
      reservationId,
      eventType: meta.eventType,
      oldValue: previous as unknown as Record<string, unknown>,
      newValue: reservations[index] as unknown as Record<string, unknown>,
      actorRole: meta.actorRole,
      actorId: meta.actorId ?? null,
    });
    await this.createAuditLog({
      entityType: "reservation",
      entityId: reservationId,
      action: meta.eventType,
      actorRole: meta.actorRole,
      actorId: meta.actorId ?? null,
      before: previous as unknown as Record<string, unknown>,
      after: reservations[index] as unknown as Record<string, unknown>,
    });

    return { ...reservations[index] };
  }

  async createReservationEvent(input: Omit<ReservationEvent, "id" | "createdAt">): Promise<ReservationEvent> {
    const event: ReservationEvent = {
      ...input,
      id: nextId("ev"),
      createdAt: now(),
    };
    reservationEvents.push(event);
    return { ...event };
  }

  async listReservationEvents(reservationId: string): Promise<ReservationEvent[]> {
    return reservationEvents
      .filter((item) => item.reservationId === reservationId)
      .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
      .map((item) => ({ ...item }));
  }

  async addWaitlistEntry(input: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">): Promise<WaitlistEntry> {
    const item: WaitlistEntry = {
      ...input,
      id: nextId("wl"),
      createdAt: now(),
      updatedAt: now(),
    };
    waitlistEntries.push(item);
    return { ...item };
  }

  async listWaitlist(date?: string): Promise<WaitlistEntry[]> {
    return waitlistEntries
      .filter((item) => (date ? item.requestedDate === date : true))
      .sort((a, b) => a.priority - b.priority)
      .map((item) => ({ ...item }));
  }

  async updateWaitlistEntry(waitlistId: string, input: Partial<WaitlistEntry>): Promise<WaitlistEntry> {
    const index = waitlistEntries.findIndex((item) => item.id === waitlistId);
    if (index < 0) throw new Error("Waitlist no encontrada");
    waitlistEntries[index] = {
      ...waitlistEntries[index],
      ...input,
      updatedAt: now(),
    };
    return { ...waitlistEntries[index] };
  }

  async createNotificationLog(input: Omit<NotificationLog, "id" | "createdAt">): Promise<NotificationLog> {
    const log: NotificationLog = {
      ...input,
      id: nextId("nt"),
      createdAt: now(),
    };
    notificationLogs.push(log);
    return { ...log };
  }

  async listNotificationLogs(limit = 100): Promise<NotificationLog[]> {
    return notificationLogs.slice(-limit).reverse().map((item) => ({ ...item }));
  }

  async createAuditLog(input: Omit<AuditLog, "id" | "createdAt">): Promise<AuditLog> {
    const log: AuditLog = {
      ...input,
      id: nextId("au"),
      createdAt: now(),
    };
    auditLogs.push(log);
    return { ...log };
  }

  async listAuditLogs(limit = 200): Promise<AuditLog[]> {
    return auditLogs.slice(-limit).reverse().map((item) => ({ ...item }));
  }

  async addCustomerNote(input: {
    customerId: string;
    note: string;
    createdBy?: string | null;
  }): Promise<{ id: string; customerId: string; note: string; createdAt: string }> {
    const row = {
      id: nextId("cn"),
      customerId: input.customerId,
      note: input.note,
      createdAt: now(),
      createdBy: input.createdBy ?? null,
    };
    customerNotes.push(row);
    return { id: row.id, customerId: row.customerId, note: row.note, createdAt: row.createdAt };
  }

  // utility for admin service use
  async findSuggestedTables(input: {
    date: string;
    time: string;
    partySize: number;
    areaPreference?: "interior" | "galeria" | "jardin" | null;
  }): Promise<{ tableIds: string[]; reason?: string }> {
    const duration = estimatedDurationByPartySize(input.partySize);
    if (!duration) {
      return { tableIds: [], reason: "Grupo grande: requiere validacion manual" };
    }

    const requestedStart = parseDateTime(input.date, input.time);
    const requestedEnd = new Date(
      requestedStart.getTime() + (duration + settings.bufferMinutesBetweenReservations) * 60_000,
    );

    const activeTables = tables
      .filter((table) => table.isActive && table.status !== "fuera_de_servicio")
      .filter((table) => (input.areaPreference ? table.area === input.areaPreference : true))
      .sort((a, b) => a.capacityMax - b.capacityMax);

    const occupied = new Set<string>();
    for (const booking of reservations) {
      if (!ACTIVE_RESERVATION_STATUSES.includes(booking.status)) continue;
      if (!booking.assignedTableId) continue;
      const bookingStart = parseDateTime(booking.date, booking.time);
      const bookingEnd = new Date(
        bookingStart.getTime() +
          (booking.estimatedDurationMinutes + settings.bufferMinutesBetweenReservations) * 60_000,
      );
      if (overlaps(requestedStart, requestedEnd, bookingStart, bookingEnd)) {
        booking.assignedTableGroup.forEach((tableId) => occupied.add(tableId));
      }
    }

    const singleFit = activeTables.find(
      (table) =>
        !occupied.has(table.id) &&
        table.capacityMin <= input.partySize &&
        table.capacityMax >= input.partySize,
    );
    if (singleFit) {
      return { tableIds: [singleFit.id] };
    }

    for (const table of activeTables) {
      if (occupied.has(table.id)) continue;
      for (const combinableId of table.combinableWithTableIds) {
        const pair = activeTables.find((candidate) => candidate.id === combinableId);
        if (!pair || occupied.has(pair.id)) continue;
        if (pair.area !== table.area) continue;
        const min = table.capacityMin + pair.capacityMin;
        const max = table.capacityMax + pair.capacityMax;
        if (input.partySize >= min && input.partySize <= max) {
          return { tableIds: [table.id, pair.id] };
        }
      }
    }

    return { tableIds: [], reason: "Sin capacidad disponible para la franja solicitada" };
  }
}
