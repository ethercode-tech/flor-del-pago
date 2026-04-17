import { addDays } from "date-fns";
import { suggestTableForReservation, validateReservationInput } from "@/domain/reservations";
import type { Reservation, ReservationRequest } from "@/domain/entities";
import type {
  CustomerRepository,
  NotificationGateway,
  ReservationRepository,
  TableRepository,
} from "@/infrastructure/repositories/types";
import { NotificationsService } from "@/application/notifications-service";
import { toISODate } from "@/lib/utils";

export class ReservationsService {
  private readonly notifications: NotificationsService;

  constructor(
    private readonly reservations: ReservationRepository,
    private readonly customers: CustomerRepository,
    private readonly tables: TableRepository,
    notificationGateway: NotificationGateway,
  ) {
    this.notifications = new NotificationsService(notificationGateway);
  }

  async checkAvailability(input: {
    date: string;
    guests: number;
    area?: "interior" | "galeria" | "jardin";
  }): Promise<{ available: boolean; suggestedTableId: string | null; reason?: string }> {
    const [existing, tables] = await Promise.all([
      this.reservations.listByDate(input.date),
      this.tables.listAll(),
    ]);

    const suggestion = suggestTableForReservation(
      tables,
      existing.filter((reservation) => reservation.reservationTime === "21:00"),
      input.date,
      "21:00",
      input.guests,
      input.area,
    );

    return {
      available: suggestion.hasAvailability,
      suggestedTableId: suggestion.suggestedTableId,
      reason: suggestion.reason,
    };
  }

  async createReservation(rawInput: unknown): Promise<Reservation> {
    const input = validateReservationInput(rawInput);
    const [customer, tables, reservationsForDate] = await Promise.all([
      this.customers.upsertByContact({
        name: input.customerName,
        phone: input.customerPhone,
        email: input.customerEmail,
      }),
      this.tables.listAll(),
      this.reservations.listByDate(input.reservationDate),
    ]);

    const suggested = suggestTableForReservation(
      tables,
      reservationsForDate,
      input.reservationDate,
      input.reservationTime,
      input.guestsCount,
      input.areaPreference,
    );
    const reservation = await this.reservations.create({
      ...input,
      customerId: customer.id,
      assignedTableId: suggested.suggestedTableId,
      source: input.source ?? "web",
    });

    await this.notifications.sendReservationCreated({
      name: reservation.customerName,
      phone: reservation.customerPhone,
      email: reservation.customerEmail ?? input.customerEmail,
      date: reservation.reservationDate,
      time: reservation.reservationTime,
      guests: reservation.guestsCount,
      status: reservation.status === "confirmed" ? "confirmed" : "pending",
    });
    return reservation;
  }

  async updateReservation(
    reservationId: string,
    payload: Partial<
      Pick<ReservationRequest, "reservationDate" | "reservationTime" | "notes"> & {
        status: Reservation["status"];
        assignedTableId: string | null;
      }
    >,
  ): Promise<Reservation> {
    return this.reservations.update(reservationId, payload);
  }

  async listUpcomingForReminder(): Promise<Reservation[]> {
    const tomorrow = toISODate(addDays(new Date(), 1));
    return this.reservations.listByDate(tomorrow);
  }
}
