import { describe, expect, it } from "vitest";
import { suggestTableForReservation } from "@/domain/reservations";
import type { Reservation, RestaurantTable } from "@/domain/entities";

const tables: RestaurantTable[] = [
  { id: "a", tableName: "A", area: "interior", capacity: 2, status: "libre", createdAt: "", updatedAt: "" },
  { id: "b", tableName: "B", area: "interior", capacity: 4, status: "libre", createdAt: "", updatedAt: "" },
];

describe("availability engine", () => {
  it("returns smallest matching table when available", () => {
    const result = suggestTableForReservation(tables, [], "2026-04-20", "21:00", 2, "interior");
    expect(result.hasAvailability).toBe(true);
    expect(result.suggestedTableId).toBe("a");
  });

  it("returns unavailable when all tables are occupied", () => {
    const reservations: Reservation[] = [
      {
        id: "1",
        customerId: "c1",
        customerName: "x",
        customerPhone: "y",
        customerEmail: null,
        reservationDate: "2026-04-20",
        reservationTime: "21:00",
        guestsCount: 2,
        areaPreference: "interior",
        occasionType: null,
        notes: null,
        status: "confirmed",
        source: "web",
        assignedTableId: "a",
        confirmationSentAt: null,
        reminderSentAt: null,
        createdBy: null,
        updatedBy: null,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "2",
        customerId: "c2",
        customerName: "x",
        customerPhone: "y",
        customerEmail: null,
        reservationDate: "2026-04-20",
        reservationTime: "21:00",
        guestsCount: 4,
        areaPreference: "interior",
        occasionType: null,
        notes: null,
        status: "confirmed",
        source: "web",
        assignedTableId: "b",
        confirmationSentAt: null,
        reminderSentAt: null,
        createdBy: null,
        updatedBy: null,
        createdAt: "",
        updatedAt: "",
      },
    ];
    const result = suggestTableForReservation(tables, reservations, "2026-04-20", "21:00", 2, "interior");
    expect(result.hasAvailability).toBe(false);
    expect(result.suggestedTableId).toBeNull();
  });
});
