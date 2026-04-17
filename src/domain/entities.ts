export type UserRole = "admin" | "recepcion" | "chef";

export type ReservationStatus =
  | "pending"
  | "confirmed"
  | "seated"
  | "completed"
  | "cancelled"
  | "no_show";

export type TableArea = "interior" | "galeria" | "jardin";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string | null;
  birthday: string | null;
  notes: string | null;
  vip: boolean;
  visitCount: number;
  totalSpent: number;
  createdAt: string;
  updatedAt: string;
}

export interface RestaurantTable {
  id: string;
  tableName: string;
  area: TableArea;
  capacity: number;
  status: "libre" | "reservada" | "ocupada";
  createdAt: string;
  updatedAt: string;
}

export interface Reservation {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  reservationDate: string;
  reservationTime: string;
  guestsCount: number;
  areaPreference: TableArea | null;
  occasionType: string | null;
  notes: string | null;
  status: ReservationStatus;
  source: "web" | "manual" | "whatsapp";
  assignedTableId: string | null;
  confirmationSentAt: string | null;
  reminderSentAt: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReservationRequest {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reservationDate: string;
  reservationTime: string;
  guestsCount: number;
  areaPreference?: TableArea;
  occasionType?: string;
  notes?: string;
  source?: "web" | "manual" | "whatsapp";
}

export interface AvailabilitySlot {
  area: TableArea;
  hasAvailability: boolean;
  suggestedTableId: string | null;
  reason?: string;
}

export interface DashboardSummary {
  date: string;
  todaysReservations: number;
  upcomingReservations: number;
  occupiedTables: number;
  cancellations: number;
  noShows: number;
  confirmationRate: number;
  occupancyByArea: Array<{ area: TableArea; occupied: number; total: number }>;
}
