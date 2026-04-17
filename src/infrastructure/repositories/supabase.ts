import { addDays } from "date-fns";
import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  DashboardSummary,
  Reservation,
  ReservationRequest,
  RestaurantTable,
} from "@/domain/entities";
import type { MenuCategory, MenuCategoryInput, MenuItem, MenuItemInput, PublicMenuSection } from "@/domain/menu";
import { buildDashboardSummary } from "@/domain/dashboard";
import type {
  CustomerRepository,
  DashboardRepository,
  MenuRepository,
  ReservationRepository,
  TableRepository,
} from "@/infrastructure/repositories/types";
import { toISODate } from "@/lib/utils";

function mapReservation(row: Record<string, unknown>): Reservation {
  return {
    id: String(row.id),
    customerId: String(row.customer_id),
    customerName: String(row.customer_name),
    customerPhone: String(row.customer_phone),
    customerEmail: row.customer_email ? String(row.customer_email) : null,
    reservationDate: String(row.reservation_date),
    reservationTime: String(row.reservation_time),
    guestsCount: Number(row.guests_count),
    areaPreference: (row.area_preference as Reservation["areaPreference"]) ?? null,
    occasionType: row.occasion_type ? String(row.occasion_type) : null,
    notes: row.notes ? String(row.notes) : null,
    status: row.status as Reservation["status"],
    source: row.source as Reservation["source"],
    assignedTableId: row.assigned_table_id ? String(row.assigned_table_id) : null,
    confirmationSentAt: row.confirmation_sent_at ? String(row.confirmation_sent_at) : null,
    reminderSentAt: row.reminder_sent_at ? String(row.reminder_sent_at) : null,
    createdBy: row.created_by ? String(row.created_by) : null,
    updatedBy: row.updated_by ? String(row.updated_by) : null,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapMenuCategory(row: Record<string, unknown>): MenuCategory {
  return {
    id: String(row.id),
    slug: String(row.slug),
    name: String(row.name),
    description: row.description ? String(row.description) : null,
    displayOrder: Number(row.display_order),
    isActive: Boolean(row.is_active),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapMenuItem(row: Record<string, unknown>): MenuItem {
  return {
    id: String(row.id),
    categoryId: String(row.category_id),
    name: String(row.name),
    description: String(row.description),
    priceLabel: row.price_label ? String(row.price_label) : null,
    imageUrl: row.image_url ? String(row.image_url) : null,
    tags: Array.isArray(row.tags) ? (row.tags as string[]) : [],
    isSignature: Boolean(row.is_signature),
    isAvailable: Boolean(row.is_available),
    displayOrder: Number(row.display_order),
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

function mapTable(row: Record<string, unknown>): RestaurantTable {
  return {
    id: String(row.id),
    tableName: String(row.table_name),
    area: row.area as RestaurantTable["area"],
    capacity: Number(row.capacity),
    status: row.status as RestaurantTable["status"],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
  };
}

export class SupabaseReservationRepository implements ReservationRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listByDate(dateISO: string): Promise<Reservation[]> {
    const { data, error } = await this.supabase
      .from("reservations")
      .select("*")
      .eq("reservation_date", dateISO);
    if (error) throw error;
    return (data ?? []).map((row) => mapReservation(row));
  }

  async listBetweenDates(fromDateISO: string, toDateISO: string): Promise<Reservation[]> {
    const { data, error } = await this.supabase
      .from("reservations")
      .select("*")
      .gte("reservation_date", fromDateISO)
      .lte("reservation_date", toDateISO);
    if (error) throw error;
    return (data ?? []).map((row) => mapReservation(row));
  }

  async listAll(): Promise<Reservation[]> {
    const { data, error } = await this.supabase.from("reservations").select("*");
    if (error) throw error;
    return (data ?? []).map((row) => mapReservation(row));
  }

  async create(
    input: ReservationRequest & {
      customerId: string;
      assignedTableId: string | null;
    },
  ): Promise<Reservation> {
    const now = new Date().toISOString();
    const status = input.assignedTableId ? "confirmed" : "pending";

    const { data, error } = await this.supabase
      .from("reservations")
      .insert({
        customer_id: input.customerId,
        customer_name: input.customerName,
        customer_phone: input.customerPhone,
        customer_email: input.customerEmail,
        reservation_date: input.reservationDate,
        reservation_time: input.reservationTime,
        guests_count: input.guestsCount,
        area_preference: input.areaPreference ?? null,
        occasion_type: input.occasionType ?? null,
        notes: input.notes ?? null,
        status,
        source: input.source ?? "web",
        assigned_table_id: input.assignedTableId,
        confirmation_sent_at: status === "confirmed" ? now : null,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapReservation(data);
  }

  async update(
    reservationId: string,
    payload: Partial<Pick<Reservation, "reservationDate" | "reservationTime" | "status" | "assignedTableId" | "notes">>,
  ): Promise<Reservation> {
    const { data, error } = await this.supabase
      .from("reservations")
      .update({
        reservation_date: payload.reservationDate,
        reservation_time: payload.reservationTime,
        status: payload.status,
        assigned_table_id: payload.assignedTableId,
        notes: payload.notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", reservationId)
      .select("*")
      .single();
    if (error) throw error;
    return mapReservation(data);
  }
}

export class SupabaseCustomerRepository implements CustomerRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async upsertByContact(input: { name: string; phone: string; email: string }): Promise<{ id: string }> {
    const { data: existing, error: fetchError } = await this.supabase
      .from("customers")
      .select("id")
      .or(`phone.eq.${input.phone},email.eq.${input.email}`)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (existing?.id) {
      const { error } = await this.supabase
        .from("customers")
        .update({ name: input.name, phone: input.phone, email: input.email, updated_at: new Date().toISOString() })
        .eq("id", existing.id);
      if (error) throw error;
      return { id: existing.id as string };
    }
    const { data, error } = await this.supabase
      .from("customers")
      .insert({
        name: input.name,
        phone: input.phone,
        email: input.email,
      })
      .select("id")
      .single();
    if (error) throw error;
    return { id: data.id as string };
  }
}

export class SupabaseTableRepository implements TableRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listAll(): Promise<RestaurantTable[]> {
    const { data, error } = await this.supabase.from("tables").select("*");
    if (error) throw error;
    return (data ?? []).map((row) => mapTable(row));
  }
}

export class SupabaseDashboardRepository implements DashboardRepository {
  constructor(
    private readonly reservations: ReservationRepository,
    private readonly tables: TableRepository,
  ) {}

  async getSummary(dateISO: string): Promise<DashboardSummary> {
    const from = dateISO;
    const to = toISODate(addDays(new Date(dateISO), 7));
    const [bookings, tableData] = await Promise.all([
      this.reservations.listBetweenDates(from, to),
      this.tables.listAll(),
    ]);
    return buildDashboardSummary(dateISO, bookings, tableData);
  }
}

export class SupabaseMenuRepository implements MenuRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async listCategories(): Promise<MenuCategory[]> {
    const { data, error } = await this.supabase.from("menu_categories").select("*").order("display_order");
    if (error) throw error;
    return (data ?? []).map((row) => mapMenuCategory(row));
  }

  async createCategory(input: MenuCategoryInput): Promise<MenuCategory> {
    const { data, error } = await this.supabase
      .from("menu_categories")
      .insert({
        slug: input.slug,
        name: input.name,
        description: input.description ?? null,
        display_order: input.displayOrder,
        is_active: input.isActive,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapMenuCategory(data);
  }

  async updateCategory(categoryId: string, input: Partial<MenuCategoryInput>): Promise<MenuCategory> {
    const { data, error } = await this.supabase
      .from("menu_categories")
      .update({
        slug: input.slug,
        name: input.name,
        description: input.description,
        display_order: input.displayOrder,
        is_active: input.isActive,
        updated_at: new Date().toISOString(),
      })
      .eq("id", categoryId)
      .select("*")
      .single();
    if (error) throw error;
    return mapMenuCategory(data);
  }

  async deleteCategory(categoryId: string): Promise<void> {
    const { error } = await this.supabase.from("menu_categories").delete().eq("id", categoryId);
    if (error) throw error;
  }

  async listItems(categoryId?: string): Promise<MenuItem[]> {
    let query = this.supabase.from("menu_items").select("*").order("display_order");
    if (categoryId) query = query.eq("category_id", categoryId);
    const { data, error } = await query;
    if (error) throw error;
    return (data ?? []).map((row) => mapMenuItem(row));
  }

  async createItem(input: MenuItemInput): Promise<MenuItem> {
    const { data, error } = await this.supabase
      .from("menu_items")
      .insert({
        category_id: input.categoryId,
        name: input.name,
        description: input.description,
        price_label: input.priceLabel ?? null,
        image_url: input.imageUrl ?? null,
        tags: input.tags ?? [],
        is_signature: input.isSignature,
        is_available: input.isAvailable,
        display_order: input.displayOrder,
      })
      .select("*")
      .single();
    if (error) throw error;
    return mapMenuItem(data);
  }

  async updateItem(itemId: string, input: Partial<MenuItemInput>): Promise<MenuItem> {
    const { data, error } = await this.supabase
      .from("menu_items")
      .update({
        category_id: input.categoryId,
        name: input.name,
        description: input.description,
        price_label: input.priceLabel,
        image_url: input.imageUrl,
        tags: input.tags,
        is_signature: input.isSignature,
        is_available: input.isAvailable,
        display_order: input.displayOrder,
        updated_at: new Date().toISOString(),
      })
      .eq("id", itemId)
      .select("*")
      .single();
    if (error) throw error;
    return mapMenuItem(data);
  }

  async deleteItem(itemId: string): Promise<void> {
    const { error } = await this.supabase.from("menu_items").delete().eq("id", itemId);
    if (error) throw error;
  }

  async listPublicMenu(): Promise<PublicMenuSection[]> {
    const [categories, items] = await Promise.all([this.listCategories(), this.listItems()]);
    return categories
      .filter((category) => category.isActive)
      .map((category) => ({
        category,
        items: items.filter((item) => item.categoryId === category.id && item.isAvailable),
      }))
      .filter((section) => section.items.length > 0);
  }
}
