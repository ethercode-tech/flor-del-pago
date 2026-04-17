import { Resend } from "resend";
import {
  ConsoleNotificationGateway,
  InMemoryCustomerRepository,
  InMemoryDashboardRepository,
  InMemoryMenuRepository,
  InMemoryReservationRepository,
  InMemoryTableRepository,
} from "@/infrastructure/repositories/in-memory";
import { InMemoryAdminOpsRepository as InMemoryAdminOpsRepositoryV2 } from "@/infrastructure/repositories/in-memory-admin";
import {
  SupabaseCustomerRepository,
  SupabaseDashboardRepository,
  SupabaseMenuRepository,
  SupabaseReservationRepository,
  SupabaseTableRepository,
} from "@/infrastructure/repositories/supabase";
import { SupabaseAdminOpsRepository } from "@/infrastructure/repositories/supabase-admin";
import type {
  AdminOpsRepository,
  CustomerRepository,
  DashboardRepository,
  MenuRepository,
  NotificationGateway,
  ReservationRepository,
  TableRepository,
} from "@/infrastructure/repositories/types";
import { createSupabaseServerClient } from "@/infrastructure/supabase/server";

class ResendNotificationGateway extends ConsoleNotificationGateway {
  constructor(private readonly resend: Resend, private readonly from: string) {
    super();
  }

  override async sendEmail(input: { to: string; subject: string; html: string }): Promise<void> {
    await this.resend.emails.send({
      from: this.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
    });
  }
}

export interface DataAccess {
  reservations: ReservationRepository;
  customers: CustomerRepository;
  tables: TableRepository;
  dashboard: DashboardRepository;
  notifications: NotificationGateway;
  menu: MenuRepository;
  adminOps: AdminOpsRepository;
}

let singletonInMemory: DataAccess | null = null;

function buildInMemoryDataAccess(): DataAccess {
  if (singletonInMemory) return singletonInMemory;
  const reservations = new InMemoryReservationRepository();
  const tables = new InMemoryTableRepository();
  singletonInMemory = {
    reservations,
    customers: new InMemoryCustomerRepository(),
    tables,
    dashboard: new InMemoryDashboardRepository(reservations, tables),
    notifications: new ConsoleNotificationGateway(),
    menu: new InMemoryMenuRepository(),
    adminOps: new InMemoryAdminOpsRepositoryV2(),
  };
  return singletonInMemory;
}

export async function getDataAccess(): Promise<DataAccess> {
  const supabaseConfigured =
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  if (!supabaseConfigured) {
    return buildInMemoryDataAccess();
  }

  const supabase = await createSupabaseServerClient();
  const reservations = new SupabaseReservationRepository(supabase);
  const tables = new SupabaseTableRepository(supabase);

  const resendApiKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL ?? "reservas@flordelpago.com";
  const notifications =
    resendApiKey && resendFrom
      ? new ResendNotificationGateway(new Resend(resendApiKey), resendFrom)
      : new ConsoleNotificationGateway();

  return {
    reservations,
    customers: new SupabaseCustomerRepository(supabase),
    tables,
    dashboard: new SupabaseDashboardRepository(reservations, tables),
    notifications,
    menu: new SupabaseMenuRepository(supabase),
    adminOps: new SupabaseAdminOpsRepository(supabase),
  };
}
