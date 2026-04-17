import { describe, expect, it } from "vitest";
import { validateReservationInput } from "@/domain/reservations";

describe("reservation validation", () => {
  it("accepts valid reservation payload", () => {
    const result = validateReservationInput({
      customerName: "Ana Perez",
      customerPhone: "+54 388 123 1234",
      customerEmail: "ana@test.com",
      reservationDate: "2026-04-20",
      reservationTime: "21:00",
      guestsCount: 2,
      areaPreference: "interior",
    });
    expect(result.customerName).toBe("Ana Perez");
  });

  it("rejects invalid phone number", () => {
    expect(() =>
      validateReservationInput({
        customerName: "Ana Perez",
        customerPhone: "abc",
        customerEmail: "ana@test.com",
        reservationDate: "2026-04-20",
        reservationTime: "21:00",
        guestsCount: 2,
      }),
    ).toThrow();
  });
});
