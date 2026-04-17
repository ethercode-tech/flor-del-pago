import type { ReservationStatus } from "@/domain/entities";
import type { ReservationStatusV2 } from "@/domain/admin-ops";

export function legacyToV2Status(status: ReservationStatus): ReservationStatusV2 {
  switch (status) {
    case "pending":
      return "pending_review";
    case "confirmed":
      return "confirmed";
    case "seated":
      return "seated";
    case "completed":
      return "completed";
    case "cancelled":
      return "cancelled_by_guest";
    case "no_show":
      return "no_show";
    default:
      return "pending_review";
  }
}

export function v2ToLegacyStatus(status: ReservationStatusV2): ReservationStatus {
  switch (status) {
    case "new_request":
    case "pending_review":
    case "awaiting_customer_response":
      return "pending";
    case "confirmed":
      return "confirmed";
    case "seated":
      return "seated";
    case "completed":
      return "completed";
    case "cancelled_by_guest":
    case "cancelled_by_restaurant":
      return "cancelled";
    case "no_show":
      return "no_show";
    default:
      return "pending";
  }
}

