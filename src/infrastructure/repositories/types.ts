import type { DashboardSummary, Reservation, ReservationRequest, RestaurantTable } from "@/domain/entities";
import type { MenuCategory, MenuCategoryInput, MenuItem, MenuItemInput, PublicMenuSection } from "@/domain/menu";
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

export interface ReservationRepository {
  listByDate(dateISO: string): Promise<Reservation[]>;
  listBetweenDates(fromDateISO: string, toDateISO: string): Promise<Reservation[]>;
  listAll(): Promise<Reservation[]>;
  create(input: ReservationRequest & { customerId: string; assignedTableId: string | null }): Promise<Reservation>;
  update(
    reservationId: string,
    payload: Partial<Pick<Reservation, "reservationDate" | "reservationTime" | "status" | "assignedTableId" | "notes">>,
  ): Promise<Reservation>;
}

export interface CustomerRepository {
  upsertByContact(input: { name: string; phone: string; email: string }): Promise<{ id: string }>;
}

export interface TableRepository {
  listAll(): Promise<RestaurantTable[]>;
}

export interface DashboardRepository {
  getSummary(dateISO: string): Promise<DashboardSummary>;
}

export interface NotificationGateway {
  sendWhatsApp(input: { to: string; message: string }): Promise<void>;
  sendEmail(input: { to: string; subject: string; html: string }): Promise<void>;
}

export interface MenuRepository {
  listCategories(): Promise<MenuCategory[]>;
  createCategory(input: MenuCategoryInput): Promise<MenuCategory>;
  updateCategory(categoryId: string, input: Partial<MenuCategoryInput>): Promise<MenuCategory>;
  deleteCategory(categoryId: string): Promise<void>;
  listItems(categoryId?: string): Promise<MenuItem[]>;
  createItem(input: MenuItemInput): Promise<MenuItem>;
  updateItem(itemId: string, input: Partial<MenuItemInput>): Promise<MenuItem>;
  deleteItem(itemId: string): Promise<void>;
  listPublicMenu(): Promise<PublicMenuSection[]>;
}

export interface AdminOpsRepository {
  getSettings(): Promise<RestaurantSettings>;
  updateSettings(input: Partial<RestaurantSettings>): Promise<RestaurantSettings>;
  listTables(): Promise<RestaurantTableV2[]>;
  listCustomers(): Promise<CustomerProfile[]>;
  listReservations(filters?: {
    dateFrom?: string;
    dateTo?: string;
    date?: string;
    status?: ReservationStatusV2;
  }): Promise<ReservationRecord[]>;
  getReservationById(reservationId: string): Promise<ReservationRecord | null>;
  createReservation(input: Omit<ReservationRecord, "id" | "createdAt" | "updatedAt" | "deletedAt">): Promise<ReservationRecord>;
  updateReservation(
    reservationId: string,
    input: Partial<ReservationRecord>,
    meta: { eventType: string; actorRole: "admin" | "recepcion" | "chef" | "system" | "guest"; actorId?: string | null },
  ): Promise<ReservationRecord>;
  createReservationEvent(input: Omit<ReservationEvent, "id" | "createdAt">): Promise<ReservationEvent>;
  listReservationEvents(reservationId: string): Promise<ReservationEvent[]>;
  addWaitlistEntry(input: Omit<WaitlistEntry, "id" | "createdAt" | "updatedAt">): Promise<WaitlistEntry>;
  listWaitlist(date?: string): Promise<WaitlistEntry[]>;
  updateWaitlistEntry(waitlistId: string, input: Partial<WaitlistEntry>): Promise<WaitlistEntry>;
  createNotificationLog(input: Omit<NotificationLog, "id" | "createdAt">): Promise<NotificationLog>;
  listNotificationLogs(limit?: number): Promise<NotificationLog[]>;
  createAuditLog(input: Omit<AuditLog, "id" | "createdAt">): Promise<AuditLog>;
  listAuditLogs(limit?: number): Promise<AuditLog[]>;
  addCustomerNote?(input: {
    customerId: string;
    note: string;
    createdBy?: string | null;
  }): Promise<{ id: string; customerId: string; note: string; createdAt: string }>;
  findSuggestedTables?(input: {
    date: string;
    time: string;
    partySize: number;
    areaPreference?: "interior" | "galeria" | "jardin" | null;
  }): Promise<{ tableIds: string[]; reason?: string }>;
}
