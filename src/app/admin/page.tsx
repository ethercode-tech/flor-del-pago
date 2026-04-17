import { subDays } from "date-fns";
import { AlertTriangle, CalendarDays, CheckCircle2, Clock3, Sofa, UserX, Users, UsersRound } from "lucide-react";
import { getAdminOpsService, getAdminSummary, getReservations, getTables } from "@/app/admin/_lib";
import { toISODate } from "@/lib/utils";
import { KPIStatCard } from "@/ui/components/admin/kpi-stat-card";
import { ReservationTimeline } from "@/ui/components/admin/reservation-timeline";
import { FloorMap } from "@/ui/components/admin/floor-map";
import { QuickActionGrid } from "@/ui/components/admin/quick-action-grid";
import { CustomerInsightsPanel } from "@/ui/components/admin/customer-insights-panel";
import { ReportsOverview } from "@/ui/components/admin/reports-overview";
import { WaitlistPanel } from "@/ui/components/admin/waitlist-panel";
import { RecentActivityFeed } from "@/ui/components/admin/recent-activity-feed";

function pct(current: number, prev: number) {
  if (prev <= 0) return current > 0 ? 100 : 0;
  return Math.round(((current - prev) / prev) * 100);
}

export default async function AdminDashboardPage() {
  const service = await getAdminOpsService();
  const [summaryRaw, reservationsRaw, tablesRaw, customers, waitlist] = await Promise.all([
    getAdminSummary(),
    getReservations(),
    getTables(),
    service.listCustomers().catch(() => []),
    service.listWaitlist().catch(() => []),
  ]);

  const summary = summaryRaw as Record<string, unknown>;
  const reservations = (reservationsRaw as unknown as Array<Record<string, unknown>>) ?? [];
  const tables = (tablesRaw as unknown as Array<Record<string, unknown>>) ?? [];

  const yesterday = await service.summaryByDate(toISODate(subDays(new Date(), 1))).catch(() => ({
    total: 0,
    confirmed: 0,
    pending: 0,
    seated: 0,
    completed: 0,
    cancelled: 0,
    noShow: 0,
    alerts: 0,
  }));

  const kpis = [
    {
      label: "Reservas hoy",
      value: Number(summary.todaysReservations ?? summary.total ?? 0),
      trend: pct(Number(summary.todaysReservations ?? summary.total ?? 0), Number(yesterday.total)),
      hint: "Turnos activos del día",
      icon: CalendarDays,
    },
    {
      label: "Pendientes",
      value: Number(summary.pending ?? summary.upcomingReservations ?? 0),
      trend: pct(Number(summary.pending ?? 0), Number(yesterday.pending)),
      hint: "Requieren confirmación",
      icon: Clock3,
    },
    {
      label: "Confirmadas",
      value: Number(summary.confirmed ?? 0),
      trend: pct(Number(summary.confirmed ?? 0), Number(yesterday.confirmed)),
      hint: "Listas para servicio",
      icon: CheckCircle2,
    },
    {
      label: "Seated",
      value: Number(summary.seated ?? summary.occupiedTables ?? 0),
      trend: pct(Number(summary.seated ?? 0), Number(yesterday.seated)),
      hint: "Mesas en curso",
      icon: Sofa,
    },
    {
      label: "Canceladas",
      value: Number(summary.cancelled ?? summary.cancellations ?? 0),
      trend: pct(Number(summary.cancelled ?? 0), Number(yesterday.cancelled)),
      hint: "Baja del día",
      icon: UsersRound,
    },
    {
      label: "No show",
      value: Number(summary.noShow ?? summary.noShows ?? 0),
      trend: pct(Number(summary.noShow ?? 0), Number(yesterday.noShow)),
      hint: "Incidencias sin asistencia",
      icon: UserX,
    },
    {
      label: "Alertas",
      value: Number(summary.alerts ?? 0),
      trend: pct(Number(summary.alerts ?? 0), Number(yesterday.alerts)),
      hint: "Mesas sin asignar",
      icon: AlertTriangle,
    },
    {
      label: "Waitlist",
      value: waitlist.length,
      trend: 0,
      hint: "Clientes en espera",
      icon: Users,
    },
  ];

  const timelineItems = reservations
    .map((item) => ({
      id: String(item.id ?? ""),
      time: String(item.time ?? item.reservationTime ?? "-"),
      customerName: String(item.customerName ?? item.customer_name ?? "Sin nombre"),
      partySize: Number(item.partySize ?? item.guestsCount ?? 0),
      status: String(item.status ?? "pending"),
      table: String(item.assignedTableId ?? "-"),
      notes: String(item.specialNotes ?? item.notes ?? ""),
    }))
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 14);

  const tableItems = tables
    .map((item) => ({
      id: String(item.id ?? ""),
      code: String(item.code ?? item.tableName ?? item.id ?? ""),
      area: String(item.area ?? "interior"),
      status: String(item.status ?? "libre"),
    }))
    .slice(0, 12);

  const customerInsights = [
    { label: "Clientes frecuentes", value: customers.filter((c) => Number(c.visits ?? 0) >= 3).length, note: "Vuelven este mes" },
    { label: "Aniversarios próximos", value: reservations.filter((r) => String(r.occasionType ?? "").includes("aniversario")).length, note: "Reservas con ocasión especial" },
    { label: "VIPs", value: customers.filter((c) => Boolean(c.vip)).length, note: "Atención prioritaria" },
    { label: "Con preferencias", value: customers.filter((c) => Boolean(c.notes) || Boolean(c.allergies)).length, note: "Alergias / notas activas" },
  ];

  const reports = [
    { label: "Ocupación semanal", value: "78%", progress: 78 },
    { label: "Horas pico", value: "20:00 - 21:30", progress: 86 },
    { label: "Ticket promedio", value: "$42.300", progress: 64 },
    { label: "Cancelaciones", value: `${Number(summary.cancelled ?? 0)}`, progress: Math.min(100, Number(summary.cancelled ?? 0) * 12) },
    { label: "Mesas más usadas", value: "Galería", progress: 72 },
    { label: "Reservas por día", value: `${Number(summary.todaysReservations ?? summary.total ?? 0)}`, progress: 68 },
  ];

  const waitlistItems = waitlist.slice(0, 5).map((item) => ({
    id: item.id,
    name: item.customerId,
    pax: item.partySize,
    period: item.requestedPeriod,
    priority: item.priority,
  }));

  const recent = timelineItems.slice(0, 5).map((item) => ({
    id: item.id,
    title: `${item.customerName} · ${item.partySize} pax`,
    detail: `${item.status.replaceAll("_", " ")} · Mesa ${item.table}`,
    time: item.time,
  }));

  return (
    <section className="px-4 py-6 md:px-6 lg:px-8">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((card) => (
          <KPIStatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ReservationTimeline items={timelineItems} />
        <FloorMap tables={tableItems} />
      </div>

      <div className="mt-5">
        <QuickActionGrid />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1fr_1fr]">
        <CustomerInsightsPanel insights={customerInsights} />
        <WaitlistPanel items={waitlistItems} />
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
        <ReportsOverview metrics={reports} />
        <RecentActivityFeed items={recent} />
      </div>
    </section>
  );
}
