import { AdminOpsService } from "@/application/admin-ops-service";
import { DashboardService } from "@/application/dashboard-service";
import { NotificationsService } from "@/application/notifications-service";
import { ReservationsService } from "@/application/reservations-service";
import { loadRestaurantSettings } from "@/application/settings-loader";
import { getDataAccess } from "@/infrastructure/repositories/factory";

export async function getServices() {
  const data = await getDataAccess();
  const settings = await loadRestaurantSettings(data.adminOps);
  return {
    reservationsService: new ReservationsService(
      data.reservations,
      data.customers,
      data.tables,
      data.notifications,
    ),
    dashboardService: new DashboardService(data.dashboard),
    notificationsService: new NotificationsService(data.notifications),
    adminOpsService: new AdminOpsService(data.adminOps, data.notifications),
    restaurantSettings: settings,
  };
}
