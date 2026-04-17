import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  AuditLog,
  CustomerProfile,
  NotificationLog,
  ReservationEvent,
  ReservationRecord,
  ReservationStatusV2,
  RestaurantSettings,
  RestaurantTableV2,
  WaitlistEntry,
} from "@/domain/admin-ops";
import type { AdminOpsRepository } from "@/infrastructure/repositories/types";

function mapSettings(row: Record<string, unknown>): RestaurantSettings {
  return {
    id: String(row.id),
    lunchStartTime: String(row.lunch_start_time),
    lunchEndTime: String(row.lunch_end_time),
    dinnerStartTime: String(row.dinner_start_time),
    dinnerEndTime: String(row.dinner_end_time),
    maxPartySizeOnline: Number(row.max_party_size_online),
    maxBookingDaysInAdvance: Number(row.max_booking_days_in_advance),
    reservationCutoffMinutes: Number(row.reservation_cutoff_minutes),
    reminderHoursBefore: Number(row.reminder_hours_before),
    cancellationWindowHours: Number(row.cancellation_window_hours),
    whatsappNumber: String(row.whatsapp_number),
    reservationAutoConfirmEnabled: Boolean(row.reservation_auto_confirm_enabled),
    autoConfirmMaxPartySize: Number(row.auto_confirm_max_party_size),
    bufferMinutesBetweenReservations: Number(row.buffer_minutes_between_reservations),
    toleranceMinutes: Number(row.late_arrival_tolerance_minutes),
    holidayClosures: Array.isArray(row.holiday_closures) ? (row.holiday_closures as string[]) : [],
    sameDayReminderEnabled: Boolean(row.same_day_reminder_enabled),
    weatherSensitiveGardenEnabled: Boolean(row.weather_sensitive_garden_enabled),
  };
}

function mapReservation(row: Record<string, unknown>): ReservationRecord {
  return {
    id: String(row.id),
    customerId: String(row.customer_id),
    customerName: String(row.customer_name ?? ""),
    customerPhone: String(row.customer_phone ?? ""),
    customerEmail: row.customer_email ? String(row.customer_email) : null,
    date: String(row.reservation_date),
    time: String(row.reservation_time),
    partySize: Number(row.party_size),
    estimatedDurationMinutes: Number(row.estimated_duration_minutes),
    areaPreference: (row.area_preference as ReservationRecord["areaPreference"]) ?? null,
    occasionType: (row.occasion as ReservationRecord["occasionType"]) ?? null,
    source: row.source as ReservationRecord["source"],
    status: row.status as ReservationStatusV2,
    assignedTableId: row.assigned_table_id ? String(row.assigned_table_id) : null,
    assignedTableGroup: Array.isArray(row.assigned_table_group) ? (row.assigned_table_group as string[]) : [],
    specialNotes: row.customer_notes ? String(row.customer_notes) : null,
    internalNotes: row.internal_notes ? String(row.internal_notes) : null,
    confirmationSentAt: row.confirmation_sent_at ? String(row.confirmation_sent_at) : null,
    reminder24hSentAt: row.reminder_24h_sent_at ? String(row.reminder_24h_sent_at) : null,
    reminderSameDaySentAt: row.reminder_same_day_sent_at ? String(row.reminder_same_day_sent_at) : null,
    cancellationReason: row.cancellation_reason ? String(row.cancellation_reason) : null,
    cancellationToken: String(row.public_token),
    createdBy: row.created_by ? String(row.created_by) : null,
    updatedBy: row.updated_by ? String(row.updated_by) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    deletedAt: row.deleted_at ? String(row.deleted_at) : null,
  };
}

export class SupabaseAdminOpsRepository implements AdminOpsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getSettings(): Promise<RestaurantSettings> {
    const { data, error } = await this.supabase
      .from("ops_restaurant_settings")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single();
    if (error) throw error;
    return mapSettings(data);
  }

  async updateSettings(input: Partial<RestaurantSettings>): Promise<RestaurantSettings> {
    const { data: existing } = await this.supabase
      .from("ops_restaurant_settings")
      .select("id")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!existing?.id) throw new Error("No hay configuracion para actualizar");
    const { data, error } = await this.supabase
      .from("ops_restaurant_settings")
      .update({
        lunch_start_time: input.lunchStartTime,
        lunch_end_time: input.lunchEndTime,
        dinner_start_time: input.dinnerStartTime,
        dinner_end_time: input.dinnerEndTime,
        max_party_size_online: input.maxPartySizeOnline,
        max_booking_days_in_advance: input.maxBookingDaysInAdvance,
        reservation_cutoff_minutes: input.reservationCutoffMinutes,
        reminder_hours_before: input.reminderHoursBefore,
        cancellation_window_hours: input.cancellationWindowHours,
        whatsapp_number: input.whatsappNumber,
        reservation_auto_confirm_enabled: input.reservationAutoConfirmEnabled,
        auto_confirm_max_party_size: input.autoConfirmMaxPartySize,
        buffer_minutes_between_reservations: input.bufferMinutesBetweenReservations,
        late_arrival_tolerance_minutes: input.toleranceMinutes,
        holiday_closures: input.holidayClosures,
        same_day_reminder_enabled: input.sameDayReminderEnabled,
        weather_sensitive_garden_enabled: input.weatherSensitiveGardenEnabled,
      })
      .eq("id", existing.id)
      .select("*")
      .single();
    if (error) throw error;
    return mapSettings(data);
  }

  async listTables(): Promise<RestaurantTableV2[]> {
    const { data, error } = await this.supabase.from("ops_restaurant_tables").select("*").is("deleted_at", null);
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      code: String(row.code),
      area: row.area_code as RestaurantTableV2["area"],
      capacityMin: Number(row.capacity_min),
      capacityMax: Number(row.capacity_max),
      status: row.status as RestaurantTableV2["status"],
      isActive: Boolean(row.is_active),
      isPremium: Boolean(row.is_premium),
      isRomantic: Boolean(row.is_romantic),
      isAccessible: Boolean(row.is_accessible),
      nearWindow: Boolean(row.near_window_flag),
      locationOrder: Number(row.display_order ?? 0),
      outdoorExposureLevel: (row.outdoor_exposure_level as "low" | "medium" | "high") ?? "medium",
      activeServicePeriods: Array.isArray(row.active_service_periods)
        ? (row.active_service_periods as ("lunch" | "dinner")[])
        : ["lunch", "dinner"],
      combinableWithTableIds: [],
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
  }

  async listCustomers(): Promise<CustomerProfile[]> {
    const { data, error } = await this.supabase.from("ops_customers").select("*").is("deleted_at", null);
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      fullName: String(row.full_name),
      phone: String(row.phone),
      email: row.email ? String(row.email) : null,
      birthday: row.birthday ? String(row.birthday) : null,
      notes: row.notes ? String(row.notes) : null,
      allergies: row.allergies ? String(row.allergies) : null,
      vip: Boolean(row.vip_flag),
      visits: Number(row.visit_count ?? 0),
      noShows: Number(row.no_show_count ?? 0),
      reliabilityScore: Number(row.reliability_score ?? 100),
      preferredArea: (row.preferred_area as CustomerProfile["preferredArea"]) ?? null,
      preferredOccasion: (row.preferred_occasion as CustomerProfile["preferredOccasion"]) ?? null,
      lastVisitAt: row.last_visit_at ? String(row.last_visit_at) : null,
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
      deletedAt: row.deleted_at ? String(row.deleted_at) : null,
    }));
  }

  async listReservations(filters?: {
    dateFrom?: string;
    dateTo?: string;
    date?: string;
    status?: ReservationStatusV2;
  }): Promise<ReservationRecord[]> {
    let query = this.supabase
      .from("ops_reservations")
      .select("*")
      .is("deleted_at", null)
      .order("reservation_date")
      .order("reservation_time");
    if (filters?.date) query = query.eq("reservation_date", filters.date);
    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.dateFrom) query = query.gte("reservation_date", filters.dateFrom);
    if (filters?.dateTo) query = query.lte("reservation_date", filters.dateTo);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => mapReservation(row));
  }

  async getReservationById(reservationId: string): Promise<ReservationRecord | null> {
    const { data, error } = await this.supabase
      .from("ops_reservations")
      .select("*")
      .eq("id", reservationId)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw error;
    return data ? mapReservation(data) : null;
  }

  async createReservation(input: Omit<ReservationRecord, "id" | "createdAt" | "updatedAt" | "deletedAt">): Promise<ReservationRecord> {
    const { data, error } = await this.supabase
      .from("ops_reservations")
      .insert({
        customer_id: input.customerId,
        customer_name: input.customerName,
        customer_phone: input.customerPhone,
        customer_email: input.customerEmail,
        reservation_date: input.date,
        reservation_time: input.time,
        party_size: input.partySize,
        estimated_duration_minutes: input.estimatedDurationMinutes,
        area_preference: input.areaPreference,
        occasion: input.occasionType ?? "none",
        source: input.source,
        status: input.status,
        assigned_table_id: input.assignedTableId,
        assigned_table_group: input.assignedTableGroup,
        customer_notes: input.specialNotes,
        internal_notes: input.internalNotes,
        public_token: input.cancellationToken,
        created_by: input.createdBy,
        updated_by: input.updatedBy,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapReservation(data);
  }

  async updateReservation(
    reservationId: string,
    input: Partial<ReservationRecord>,
    meta: { eventType: string; actorRole: "admin" | "recepcion" | "chef" | "system" | "guest"; actorId?: string | null },
  ): Promise<ReservationRecord> {
    const { data, error } = await this.supabase
      .from("ops_reservations")
      .update({
        reservation_date: input.date,
        reservation_time: input.time,
        party_size: input.partySize,
        estimated_duration_minutes: input.estimatedDurationMinutes,
        area_preference: input.areaPreference,
        occasion: input.occasionType,
        source: input.source,
        status: input.status,
        assigned_table_id: input.assignedTableId,
        assigned_table_group: input.assignedTableGroup,
        customer_notes: input.specialNotes,
        internal_notes: input.internalNotes,
        cancellation_reason: input.cancellationReason,
        confirmation_sent_at: input.confirmationSentAt,
        reminder_24h_sent_at: input.reminder24hSentAt,
        reminder_same_day_sent_at: input.reminderSameDaySentAt,
        updated_by: input.updatedBy,
      })
      .eq("id", reservationId)
      .select("*")
      .single();
    if (error) throw error;
    await this.createReservationEvent({
      reservationId,
      eventType: meta.eventType,
      oldValue: null,
      newValue: input as unknown as Record<string, unknown>,
      actorRole: meta.actorRole,
      actorId: meta.actorId ?? null,
    });
    return mapReservation(data);
  }

  async createReservationEvent(input: Omit<ReservationEvent, "id" | "createdAt">): Promise<ReservationEvent> {
    const { data, error } = await this.supabase
      .from("ops_reservation_events")
      .insert({
        reservation_id: input.reservationId,
        event_type: input.eventType,
        old_value: input.oldValue,
        new_value: input.newValue,
        actor_role: input.actorRole,
        actor_user_id: input.actorId,
      })
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      reservationId: String(data.reservation_id),
      eventType: String(data.event_type),
      oldValue: (data.old_value as Record<string, unknown>) ?? null,
      newValue: (data.new_value as Record<string, unknown>) ?? null,
      actorRole: data.actor_role as ReservationEvent["actorRole"],
      actorId: data.actor_user_id ? String(data.actor_user_id) : null,
      createdAt: String(data.created_at),
    };
  }

  async listReservationEvents(reservationId: string): Promise<ReservationEvent[]> {
    const { data, error } = await this.supabase
      .from("ops_reservation_events")
      .select("*")
      .eq("reservation_id", reservationId)
      .order("created_at", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      reservationId: String(row.reservation_id),
      eventType: String(row.event_type),
      oldValue: (row.old_value as Record<string, unknown>) ?? null,
      newValue: (row.new_value as Record<string, unknown>) ?? null,
      actorRole: row.actor_role as ReservationEvent["actorRole"],
      actorId: row.actor_user_id ? String(row.actor_user_id) : null,
      createdAt: String(row.created_at),
    }));
  }

  async addWaitlistEntry(input: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">): Promise<WaitlistEntry> {
    const { data, error } = await this.supabase
      .from("ops_waitlist_entries")
      .insert({
        customer_id: input.customerId,
        service_date: input.requestedDate,
        service_period: input.requestedPeriod,
        party_size: input.partySize,
        area_preference: input.areaPreference,
        priority_score: input.priority,
        status: input.status,
        notes: input.notes,
      })
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      customerId: String(data.customer_id),
      requestedDate: String(data.service_date),
      requestedPeriod: data.service_period as WaitlistEntry["requestedPeriod"],
      partySize: Number(data.party_size),
      areaPreference: (data.area_preference as WaitlistEntry["areaPreference"]) ?? null,
      notes: data.notes ? String(data.notes) : null,
      priority: Number(data.priority_score),
      status: data.status as WaitlistEntry["status"],
      createdAt: String(data.created_at),
      updatedAt: String(data.updated_at),
    };
  }

  async listWaitlist(date?: string): Promise<WaitlistEntry[]> {
    let query = this.supabase.from("ops_waitlist_entries").select("*").order("priority_score");
    if (date) query = query.eq("service_date", date);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      customerId: String(row.customer_id),
      requestedDate: String(row.service_date),
      requestedPeriod: row.service_period as WaitlistEntry["requestedPeriod"],
      partySize: Number(row.party_size),
      areaPreference: (row.area_preference as WaitlistEntry["areaPreference"]) ?? null,
      notes: row.notes ? String(row.notes) : null,
      priority: Number(row.priority_score),
      status: row.status as WaitlistEntry["status"],
      createdAt: String(row.created_at),
      updatedAt: String(row.updated_at),
    }));
  }

  async updateWaitlistEntry(waitlistId: string, input: Partial<WaitlistEntry>): Promise<WaitlistEntry> {
    const { data, error } = await this.supabase
      .from("ops_waitlist_entries")
      .update({
        status: input.status,
        priority_score: input.priority,
        notes: input.notes,
      })
      .eq("id", waitlistId)
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      customerId: String(data.customer_id),
      requestedDate: String(data.service_date),
      requestedPeriod: data.service_period as WaitlistEntry["requestedPeriod"],
      partySize: Number(data.party_size),
      areaPreference: (data.area_preference as WaitlistEntry["areaPreference"]) ?? null,
      notes: data.notes ? String(data.notes) : null,
      priority: Number(data.priority_score),
      status: data.status as WaitlistEntry["status"],
      createdAt: String(data.created_at),
      updatedAt: String(data.updated_at),
    };
  }

  async createNotificationLog(input: Omit<NotificationLog, "id" | "createdAt">): Promise<NotificationLog> {
    const { data, error } = await this.supabase
      .from("ops_notification_logs")
      .insert({
        reservation_id: input.reservationId,
        customer_id: input.customerId,
        channel: input.channel,
        template_key: input.templateKey,
        delivery_status: input.status,
        delivery_attempts: input.deliveryAttempts,
        last_attempt_at: input.lastAttemptAt,
        failure_reason: input.failureReason,
        external_message_id: input.externalMessageId,
        provider_response: input.payload,
      })
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      reservationId: data.reservation_id ? String(data.reservation_id) : null,
      customerId: data.customer_id ? String(data.customer_id) : null,
      channel: data.channel as NotificationLog["channel"],
      templateKey: data.template_key as NotificationLog["templateKey"],
      status: data.delivery_status as NotificationLog["status"],
      deliveryAttempts: Number(data.delivery_attempts),
      lastAttemptAt: data.last_attempt_at ? String(data.last_attempt_at) : null,
      failureReason: data.failure_reason ? String(data.failure_reason) : null,
      externalMessageId: data.external_message_id ? String(data.external_message_id) : null,
      payload: (data.provider_response as Record<string, unknown>) ?? {},
      createdAt: String(data.created_at),
    };
  }

  async listNotificationLogs(limit = 100): Promise<NotificationLog[]> {
    const { data, error } = await this.supabase
      .from("ops_notification_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      reservationId: row.reservation_id ? String(row.reservation_id) : null,
      customerId: row.customer_id ? String(row.customer_id) : null,
      channel: row.channel as NotificationLog["channel"],
      templateKey: row.template_key as NotificationLog["templateKey"],
      status: row.delivery_status as NotificationLog["status"],
      deliveryAttempts: Number(row.delivery_attempts),
      lastAttemptAt: row.last_attempt_at ? String(row.last_attempt_at) : null,
      failureReason: row.failure_reason ? String(row.failure_reason) : null,
      externalMessageId: row.external_message_id ? String(row.external_message_id) : null,
      payload: (row.provider_response as Record<string, unknown>) ?? {},
      createdAt: String(row.created_at),
    }));
  }

  async createAuditLog(input: Omit<AuditLog, "id" | "createdAt">): Promise<AuditLog> {
    const { data, error } = await this.supabase
      .from("ops_audit_logs")
      .insert({
        actor_user_id: input.actorId,
        actor_role: input.actorRole,
        action_type: input.action,
        entity_type: input.entityType,
        entity_id: input.entityId,
        before_data: input.before,
        after_data: input.after,
      })
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      entityType: String(data.entity_type),
      entityId: String(data.entity_id),
      action: String(data.action_type),
      actorRole: data.actor_role as AuditLog["actorRole"],
      actorId: data.actor_user_id ? String(data.actor_user_id) : null,
      before: (data.before_data as Record<string, unknown>) ?? null,
      after: (data.after_data as Record<string, unknown>) ?? null,
      createdAt: String(data.created_at),
    };
  }

  async listAuditLogs(limit = 200): Promise<AuditLog[]> {
    const { data, error } = await this.supabase
      .from("ops_audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return (data ?? []).map((row) => ({
      id: String(row.id),
      entityType: String(row.entity_type),
      entityId: String(row.entity_id),
      action: String(row.action_type),
      actorRole: row.actor_role as AuditLog["actorRole"],
      actorId: row.actor_user_id ? String(row.actor_user_id) : null,
      before: (row.before_data as Record<string, unknown>) ?? null,
      after: (row.after_data as Record<string, unknown>) ?? null,
      createdAt: String(row.created_at),
    }));
  }

  async addCustomerNote(input: {
    customerId: string;
    note: string;
    createdBy?: string | null;
  }): Promise<{ id: string; customerId: string; note: string; createdAt: string }> {
    const { data, error } = await this.supabase
      .from("ops_customer_notes")
      .insert({
        customer_id: input.customerId,
        note: input.note,
        created_by: input.createdBy ?? null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return {
      id: String(data.id),
      customerId: String(data.customer_id),
      note: String(data.note),
      createdAt: String(data.created_at),
    };
  }
}

