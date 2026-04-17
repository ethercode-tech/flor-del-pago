import { toISODate } from "@/lib/utils";
import { featureFlags } from "@/lib/feature-flags";
import { getDataAccess } from "@/infrastructure/repositories/factory";
import { DashboardService } from "@/application/dashboard-service";
import { AdminOpsService } from "@/application/admin-ops-service";

export async function getAdminSummary() {
  const data = await getDataAccess();
  if (featureFlags.adminOpsV2) {
    const service = new AdminOpsService(data.adminOps, data.notifications);
    return service.summaryByDate(toISODate(new Date()));
  }
  const service = new DashboardService(data.dashboard);
  return service.getSummary(toISODate(new Date()));
}

export async function getReservations() {
  const data = await getDataAccess();
  if (featureFlags.adminOpsV2) {
    const service = new AdminOpsService(data.adminOps, data.notifications);
    return service.listReservations();
  }
  return data.reservations.listAll();
}

export async function getTables() {
  const data = await getDataAccess();
  if (featureFlags.adminOpsV2) {
    const service = new AdminOpsService(data.adminOps, data.notifications);
    return service.listTables();
  }
  return data.tables.listAll();
}

export async function getAdminOpsService() {
  const data = await getDataAccess();
  return new AdminOpsService(data.adminOps, data.notifications);
}
