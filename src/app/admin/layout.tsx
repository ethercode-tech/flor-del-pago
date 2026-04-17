import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { getAdminSummary, getReservations } from "@/app/admin/_lib";
import { AdminChrome } from "@/ui/components/admin/admin-chrome";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminLayoutContent>{children}</AdminLayoutContent>;
}

async function AdminLayoutContent({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const role = (cookieStore.get("fdp_role")?.value ?? "recepcion") as "admin" | "recepcion" | "chef";
  const [summaryRaw, reservationsRaw] = await Promise.all([getAdminSummary(), getReservations()]);
  const summary = summaryRaw as Record<string, unknown>;
  const reservations = (reservationsRaw as unknown as Array<Record<string, unknown>>) ?? [];

  const pending = Number(summary.pending ?? summary.upcomingReservations ?? 0);
  const alerts = Number(summary.alerts ?? 0);
  const waitingTables = reservations.filter((item) => {
    const status = String(item.status ?? "");
    const table = item.assignedTableId;
    const active = ["confirmed", "pending_review", "new_request", "seated", "pending"].includes(status);
    return active && (!table || String(table).trim().length === 0);
  }).length;
  const currentDateLabel = new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(new Date());

  return (
    <div className="admin-shell">
      <AdminChrome
        role={role}
        alerts={alerts}
        pending={pending}
        waitingTables={waitingTables}
        currentDateLabel={currentDateLabel}
      >
        {children}
      </AdminChrome>
    </div>
  );
}
