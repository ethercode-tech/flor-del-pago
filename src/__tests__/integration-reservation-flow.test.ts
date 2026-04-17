import { describe, expect, it, vi } from "vitest";
import { ReservationsService } from "@/application/reservations-service";
import {
  InMemoryCustomerRepository,
  InMemoryReservationRepository,
  InMemoryTableRepository,
} from "@/infrastructure/repositories/in-memory";
import type { NotificationGateway } from "@/infrastructure/repositories/types";

describe("reservation integration flow", () => {
  it("creates reservation and triggers notifications", async () => {
    const gateway: NotificationGateway = {
      sendWhatsApp: vi.fn(async () => Promise.resolve()),
      sendEmail: vi.fn(async () => Promise.resolve()),
    };

    const service = new ReservationsService(
      new InMemoryReservationRepository(),
      new InMemoryCustomerRepository(),
      new InMemoryTableRepository(),
      gateway,
    );

    const result = await service.createReservation({
      customerName: "Laura",
      customerPhone: "+54 388 987 0000",
      customerEmail: "laura@test.com",
      reservationDate: "2026-04-22",
      reservationTime: "20:30",
      guestsCount: 2,
      areaPreference: "interior",
      source: "web",
    });

    expect(result.id).toBeTruthy();
    expect(gateway.sendWhatsApp).toHaveBeenCalledTimes(1);
    expect(gateway.sendEmail).toHaveBeenCalledTimes(1);
  });
});
