import { describe, expect, it } from "vitest";
import { buildDashboardSummary } from "@/domain/dashboard";
import type { Reservation, RestaurantTable } from "@/domain/entities";

describe("dashboard KPIs", () => {
  it("calculates key metrics", () => {
    const tables: RestaurantTable[] = [
      { id: "t1", tableName: "1", area: "interior", capacity: 2, status: "libre", createdAt: "", updatedAt: "" },
      { id: "t2", tableName: "2", area: "jardin", capacity: 4, status: "libre", createdAt: "", updatedAt: "" },
    ];
    const reservations: Reservation[] = [
      {
        id: "r1",
        customerId: "c1",
        customerName: "A",
        customerPhone: "",
        customerEmail: null,
        reservationDate: "2026-04-20",
        reservationTime: "21:00",
        guestsCount: 2,
        areaPreference: "interior",
        occasionType: null,
        notes: null,
        status: "confirmed",
        source: "web",
        assignedTableId: "t1",
        confirmationSentAt: null,
        reminderSentAt: null,
        createdBy: null,
        updatedBy: null,
        createdAt: "",
        updatedAt: "",
      },
      {
        id: "r2",
        customerId: "c1",
        customerName: "B",
        customerPhone: "",
        customerEmail: null,
        reservationDate: "2026-04-20",
        reservationTime: "22:00",
        guestsCount: 2,
        areaPreference: "jardin",
        occasionType: null,
        notes: null,
        status: "pending",
        source: "web",
        assignedTableId: null,
        confirmationSentAt: null,
        reminderSentAt: null,
        createdBy: null,
        updatedBy: null,
        createdAt: "",
        updatedAt: "",
      },
    ];
    const summary = buildDashboardSummary("2026-04-20", reservations, tables);
    expect(summary.todaysReservations).toBe(2);
    expect(summary.occupiedTables).toBe(1);
    expect(summary.confirmationRate).toBe(50);
  });
});
