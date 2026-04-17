import type { RestaurantSettings } from "@/domain/admin-ops";
import type { AdminOpsRepository } from "@/infrastructure/repositories/types";

const fallbackSettings: RestaurantSettings = {
  id: "fallback",
  lunchStartTime: "12:30",
  lunchEndTime: "15:30",
  dinnerStartTime: "20:00",
  dinnerEndTime: "23:30",
  maxPartySizeOnline: 10,
  maxBookingDaysInAdvance: 45,
  reservationCutoffMinutes: 120,
  reminderHoursBefore: 24,
  cancellationWindowHours: 6,
  whatsappNumber: "+543885134101",
  reservationAutoConfirmEnabled: true,
  autoConfirmMaxPartySize: 6,
  bufferMinutesBetweenReservations: 15,
  toleranceMinutes: 20,
  holidayClosures: [],
  sameDayReminderEnabled: true,
  weatherSensitiveGardenEnabled: true,
};

export async function loadRestaurantSettings(repo?: AdminOpsRepository): Promise<RestaurantSettings> {
  if (!repo) return fallbackSettings;
  try {
    return await repo.getSettings();
  } catch {
    return fallbackSettings;
  }
}

