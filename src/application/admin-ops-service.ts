import { addHours, isBefore, parseISO } from "date-fns";
import {
  ACTIVE_RESERVATION_STATUSES,
  estimatedDurationByPartySize,
  isValidReservationTransition,
  type AreaType,
  type AuditLog,
  type CustomerProfile,
  type NotificationLog,
  type ReservationRecord,
  type ReservationStatusV2,
  type RestaurantSettings,
  type RestaurantTableV2,
  type WaitlistEntry,
} from "@/domain/admin-ops";
import type { NotificationGateway, AdminOpsRepository } from "@/infrastructure/repositories/types";

export class AdminOpsService {
  constructor(
    private readonly repo: AdminOpsRepository,
    private readonly notifications: NotificationGateway,
  ) {}

  async getSettings(): Promise<RestaurantSettings> {
    return this.repo.getSettings();
  }

  async updateSettings(input: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    return this.repo.updateSettings(input);
  }

  async listReservations(filters?: {
    date?: string;
    dateFrom?: string;
    dateTo?: string;
    status?: ReservationStatusV2;
  }): Promise<ReservationRecord[]> {
    return this.repo.listReservations(filters);
  }

  async getReservationDetail(reservationId: string): Promise<{
    reservation: ReservationRecord | null;
    events: Awaited<ReturnType<AdminOpsRepository["listReservationEvents"]>>;
  }> {
    const [reservation, events] = await Promise.all([
      this.repo.getReservationById(reservationId),
      this.repo.listReservationEvents(reservationId),
    ]);
    return { reservation, events };
  }

  async listTables(): Promise<RestaurantTableV2[]> {
    return this.repo.listTables();
  }

  async listCustomers(): Promise<CustomerProfile[]> {
    return this.repo.listCustomers();
  }

  async listWaitlist(date?: string): Promise<WaitlistEntry[]> {
    return this.repo.listWaitlist(date);
  }

  async listNotificationLogs(limit = 50): Promise<NotificationLog[]> {
    return this.repo.listNotificationLogs(limit);
  }

  async listAuditLogs(limit = 100): Promise<AuditLog[]> {
    return this.repo.listAuditLogs(limit);
  }

  async addCustomerNote(input: {
    customerId: string;
    note: string;
    actorRole: "admin" | "recepcion";
    actorId?: string | null;
  }): Promise<{ id: string; customerId: string; note: string; createdAt: string }> {
    if (!this.repo.addCustomerNote) {
      throw new Error("Repositorio no soporta notas de cliente");
    }
    const result = await this.repo.addCustomerNote({
      customerId: input.customerId,
      note: input.note,
      createdBy: input.actorId ?? null,
    });
    await this.repo.createAuditLog({
      entityType: "customer",
      entityId: input.customerId,
      action: "customer.note_upsert",
      actorRole: input.actorRole,
      actorId: input.actorId ?? null,
      before: null,
      after: { note: input.note },
    });
    return result;
  }

  async createWaitlistEntry(input: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">): Promise<WaitlistEntry> {
    return this.repo.addWaitlistEntry(input);
  }

  async createManualReservation(input: {
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerEmail?: string | null;
    date: string;
    time: string;
    partySize: number;
    areaPreference?: AreaType | null;
    occasionType?: ReservationRecord["occasionType"] | null;
    source?: ReservationRecord["source"];
    specialNotes?: string | null;
    internalNotes?: string | null;
    actorRole: "admin" | "recepcion";
    actorId?: string | null;
  }): Promise<ReservationRecord> {
    const settings = await this.repo.getSettings();
    this.assertWithinBusinessRules(settings, input.date, input.time, input.partySize);
    const duration = estimatedDurationByPartySize(input.partySize);
    const requiresManual = !duration || input.partySize > settings.autoConfirmMaxPartySize;

    const status: ReservationStatusV2 =
      requiresManual || !settings.reservationAutoConfirmEnabled ? "pending_review" : "confirmed";

    const reservation = await this.repo.createReservation({
      customerId: input.customerId,
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      customerEmail: input.customerEmail ?? null,
      date: input.date,
      time: input.time,
      partySize: input.partySize,
      estimatedDurationMinutes: duration ?? 135,
      areaPreference: input.areaPreference ?? null,
      occasionType: input.occasionType ?? null,
      source: input.source ?? "manual",
      status,
      assignedTableId: null,
      assignedTableGroup: [],
      specialNotes: input.specialNotes ?? null,
      internalNotes: input.internalNotes ?? null,
      confirmationSentAt: null,
      reminder24hSentAt: null,
      reminderSameDaySentAt: null,
      cancellationReason: null,
      cancellationToken: crypto.randomUUID(),
      createdBy: input.actorId ?? null,
      updatedBy: input.actorId ?? null,
    });

    await this.repo.createAuditLog({
      entityType: "reservation",
      entityId: reservation.id,
      action: "reservation.manual_create",
      actorRole: input.actorRole,
      actorId: input.actorId ?? null,
      before: null,
      after: reservation as unknown as Record<string, unknown>,
    });
    await this.sendAndLogNotification({
      reservation,
      templateKey: "reservation_received",
      message: `Recibimos tu solicitud para ${reservation.date} ${reservation.time}.`,
    });

    return reservation;
  }

  async transitionReservation(input: {
    reservationId: string;
    nextStatus: ReservationStatusV2;
    actorRole: "admin" | "recepcion";
    actorId?: string | null;
    reason?: string;
  }): Promise<ReservationRecord> {
    const reservation = await this.repo.getReservationById(input.reservationId);
    if (!reservation) {
      throw new Error("Reserva no encontrada");
    }
    if (!isValidReservationTransition(reservation.status, input.nextStatus)) {
      throw new Error(`Transicion invalida: ${reservation.status} -> ${input.nextStatus}`);
    }
    if (
      (input.nextStatus === "cancelled_by_guest" || input.nextStatus === "cancelled_by_restaurant") &&
      !input.reason
    ) {
      throw new Error("Cancelacion requiere motivo");
    }

    const updated = await this.repo.updateReservation(
      reservation.id,
      {
        status: input.nextStatus,
        cancellationReason:
          input.nextStatus === "cancelled_by_guest" || input.nextStatus === "cancelled_by_restaurant"
            ? input.reason ?? null
            : reservation.cancellationReason,
        updatedBy: input.actorId ?? reservation.updatedBy,
      },
      {
        eventType: `reservation.status.${input.nextStatus}`,
        actorRole: input.actorRole,
        actorId: input.actorId ?? null,
      },
    );

    if (input.nextStatus === "confirmed") {
      await this.sendAndLogNotification({
        reservation: updated,
        templateKey: "reservation_confirmed",
        message: `Tu reserva para ${updated.date} ${updated.time} fue confirmada.`,
      });
    } else if (input.nextStatus === "awaiting_customer_response") {
      await this.sendAndLogNotification({
        reservation: updated,
        templateKey: "reservation_rescheduled",
        message: `Tenemos una propuesta alternativa para tu reserva. Respondenos para confirmar.`,
      });
    } else if (
      input.nextStatus === "cancelled_by_guest" ||
      input.nextStatus === "cancelled_by_restaurant"
    ) {
      await this.sendAndLogNotification({
        reservation: updated,
        templateKey: "cancellation_received",
        message: `Tu reserva fue cancelada. Motivo: ${input.reason ?? "sin detalle"}.`,
      });
    }

    return updated;
  }

  async assignTable(input: {
    reservationId: string;
    tableIds: string[];
    actorRole: "admin" | "recepcion";
    actorId?: string | null;
  }): Promise<ReservationRecord> {
    const reservation = await this.repo.getReservationById(input.reservationId);
    if (!reservation) throw new Error("Reserva no encontrada");
    if (!input.tableIds.length) throw new Error("Debe asignar al menos una mesa");
    const updated = await this.repo.updateReservation(
      reservation.id,
      {
        assignedTableId: input.tableIds[0],
        assignedTableGroup: input.tableIds,
        status: reservation.status === "new_request" ? "pending_review" : reservation.status,
        updatedBy: input.actorId ?? reservation.updatedBy,
      },
      {
        eventType: "reservation.table_assigned",
        actorRole: input.actorRole,
        actorId: input.actorId ?? null,
      },
    );
    return updated;
  }

  async cancelWithToken(input: { publicToken: string; reason: string }): Promise<ReservationRecord> {
    const all = await this.repo.listReservations();
    const reservation = all.find((item) => item.cancellationToken === input.publicToken);
    if (!reservation) throw new Error("Token invalido");
    return this.transitionReservation({
      reservationId: reservation.id,
      nextStatus: "cancelled_by_guest",
      actorRole: "recepcion",
      reason: input.reason,
    });
  }

  async rescheduleWithToken(input: {
    publicToken: string;
    date: string;
    time: string;
    partySize?: number;
  }): Promise<ReservationRecord> {
    const all = await this.repo.listReservations();
    const reservation = all.find((item) => item.cancellationToken === input.publicToken);
    if (!reservation) throw new Error("Token invalido");
    const settings = await this.repo.getSettings();
    this.assertWithinBusinessRules(settings, input.date, input.time, input.partySize ?? reservation.partySize);
    const updated = await this.repo.updateReservation(
      reservation.id,
      {
        date: input.date,
        time: input.time,
        partySize: input.partySize ?? reservation.partySize,
        estimatedDurationMinutes:
          estimatedDurationByPartySize(input.partySize ?? reservation.partySize) ??
          reservation.estimatedDurationMinutes,
        status: "awaiting_customer_response",
      },
      {
        eventType: "reservation.rescheduled",
        actorRole: "guest",
      },
    );
    await this.sendAndLogNotification({
      reservation: updated,
      templateKey: "reservation_rescheduled",
      message: `Recibimos tu solicitud de cambio para ${updated.date} ${updated.time}.`,
    });
    return updated;
  }

  async checkAvailability(input: {
    date: string;
    time: string;
    partySize: number;
    areaPreference?: AreaType;
  }): Promise<{ available: boolean; suggestedTables: string[]; reason?: string }> {
    const settings = await this.repo.getSettings();
    this.assertWithinBusinessRules(settings, input.date, input.time, input.partySize);
    const result = await this.repo.findSuggestedTables?.({
      date: input.date,
      time: input.time,
      partySize: input.partySize,
      areaPreference: input.areaPreference,
    });
    if (!result) return { available: false, suggestedTables: [], reason: "Sin datos de disponibilidad" };
    return {
      available: result.tableIds.length > 0,
      suggestedTables: result.tableIds,
      reason: result.reason,
    };
  }

  async summaryByDate(date: string): Promise<{
    total: number;
    confirmed: number;
    pending: number;
    seated: number;
    completed: number;
    cancelled: number;
    noShow: number;
    alerts: number;
  }> {
    const list = await this.repo.listReservations({ date });
    const total = list.length;
    const confirmed = list.filter((r) => r.status === "confirmed").length;
    const pending = list.filter((r) => r.status === "new_request" || r.status === "pending_review").length;
    const seated = list.filter((r) => r.status === "seated").length;
    const completed = list.filter((r) => r.status === "completed").length;
    const cancelled = list.filter((r) => r.status === "cancelled_by_guest" || r.status === "cancelled_by_restaurant").length;
    const noShow = list.filter((r) => r.status === "no_show").length;
    const alerts = list.filter((r) => !r.assignedTableId && ACTIVE_RESERVATION_STATUSES.includes(r.status)).length;
    return { total, confirmed, pending, seated, completed, cancelled, noShow, alerts };
  }

  async sendReminders(dateISO: string, sameDay = false): Promise<number> {
    const targetDate = parseISO(dateISO);
    const compareDate = sameDay ? dateISO : addHours(targetDate, 24).toISOString().slice(0, 10);
    const list = await this.repo.listReservations({ date: compareDate, status: "confirmed" });
    for (const reservation of list) {
      await this.sendAndLogNotification({
        reservation,
        templateKey: sameDay ? "reminder_same_day" : "reminder_24h",
        message: `Recordatorio Flor Del Pago: te esperamos ${reservation.date} a las ${reservation.time}.`,
      });
      await this.repo.updateReservation(
        reservation.id,
        {
          reminder24hSentAt: sameDay ? reservation.reminder24hSentAt : new Date().toISOString(),
          reminderSameDaySentAt: sameDay ? new Date().toISOString() : reservation.reminderSameDaySentAt,
        },
        { eventType: `reservation.reminder.${sameDay ? "same_day" : "24h"}`, actorRole: "system" },
      );
    }
    return list.length;
  }

  async sendManualNotification(input: {
    reservationId: string;
    templateKey: NotificationLog["templateKey"];
    channel?: NotificationLog["channel"];
    customMessage: string;
  }): Promise<void> {
    const reservation = await this.repo.getReservationById(input.reservationId);
    if (!reservation) throw new Error("Reserva no encontrada");
    if (input.channel === "email" || (!input.channel && reservation.customerEmail)) {
      if (reservation.customerEmail) {
        await this.notifications.sendEmail({
          to: reservation.customerEmail,
          subject: "Flor Del Pago",
          html: `<p>${input.customMessage}</p>`,
        });
      }
    }
    if (input.channel === "whatsapp" || !input.channel) {
      await this.notifications.sendWhatsApp({
        to: reservation.customerPhone,
        message: input.customMessage,
      });
    }
    await this.repo.createNotificationLog({
      reservationId: reservation.id,
      customerId: reservation.customerId,
      channel: input.channel ?? "whatsapp",
      templateKey: input.templateKey,
      status: "sent",
      deliveryAttempts: 1,
      lastAttemptAt: new Date().toISOString(),
      failureReason: null,
      externalMessageId: null,
      payload: { message: input.customMessage },
    });
  }

  private assertWithinBusinessRules(
    settings: RestaurantSettings,
    date: string,
    time: string,
    partySize: number,
  ): void {
    if (partySize < 1 || partySize > settings.maxPartySizeOnline) {
      throw new Error("Cantidad de personas fuera del limite permitido");
    }
    const now = new Date();
    const requested = new Date(`${date}T${time}:00`);
    if (isBefore(requested, now)) {
      throw new Error("La reserva debe ser en fecha futura");
    }
    const diffMinutes = (requested.getTime() - now.getTime()) / 60000;
    if (diffMinutes < settings.reservationCutoffMinutes) {
      throw new Error("La reserva esta fuera de la ventana minima de anticipacion");
    }
  }

  private async sendAndLogNotification(input: {
    reservation: ReservationRecord;
    templateKey: NotificationLog["templateKey"];
    message: string;
  }): Promise<void> {
    let status: NotificationLog["status"] = "sent";
    let failureReason: string | null = null;
    try {
      if (input.reservation.customerPhone) {
        await this.notifications.sendWhatsApp({
          to: input.reservation.customerPhone,
          message: input.message,
        });
      }
      if (input.reservation.customerEmail) {
        await this.notifications.sendEmail({
          to: input.reservation.customerEmail,
          subject: "Flor Del Pago",
          html: `<p>${input.message}</p>`,
        });
      }
    } catch (error) {
      status = "failed";
      failureReason = error instanceof Error ? error.message : "notification error";
    }

    await this.repo.createNotificationLog({
      reservationId: input.reservation.id,
      customerId: input.reservation.customerId,
      channel: input.reservation.customerPhone ? "whatsapp" : "email",
      templateKey: input.templateKey,
      status,
      deliveryAttempts: 1,
      lastAttemptAt: new Date().toISOString(),
      failureReason,
      externalMessageId: null,
      payload: { message: input.message },
    });
  }
}

