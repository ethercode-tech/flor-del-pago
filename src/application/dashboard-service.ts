import type { DashboardSummary } from "@/domain/entities";
import type { DashboardRepository } from "@/infrastructure/repositories/types";

export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async getSummary(dateISO: string): Promise<DashboardSummary> {
    return this.dashboardRepository.getSummary(dateISO);
  }
}
