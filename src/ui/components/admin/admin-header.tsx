"use client";

import { Menu, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { NotificationBell } from "@/ui/components/admin/notification-bell";
import { ServiceStatusBadge } from "@/ui/components/admin/service-status-badge";

const labels: Record<string, string> = {
  admin: "Dashboard",
  reservas: "Reservas",
  "nueva": "Nueva reserva",
  "servicio-hoy": "Servicio de hoy",
  mesas: "Mesas",
  configuracion: "Configuración",
  clientes: "Clientes",
  waitlist: "Waitlist",
  notificaciones: "Notificaciones",
  reportes: "Reportes",
  auditoria: "Auditoría",
  login: "Ingreso",
};

function breadcrumb(pathname: string) {
  const segments = pathname.split("/").filter(Boolean).slice(1);
  const mapped = segments.map((item) => labels[item] ?? item);
  return mapped.length ? `Admin / ${mapped.join(" / ")}` : "Admin / Dashboard";
}

function title(pathname: string) {
  const segments = pathname.split("/").filter(Boolean).slice(1);
  if (!segments.length) return "Dashboard operativo";
  return labels[segments[segments.length - 1]] ?? "Panel operativo";
}

export function AdminHeader({
  alerts,
  pending,
  waitingTables,
  currentDateLabel,
  onMenuClick,
}: {
  alerts: number;
  pending: number;
  waitingTables: number;
  currentDateLabel: string;
  onMenuClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[rgba(17,16,14,.86)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 px-4 py-4 md:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              type="button"
              onClick={onMenuClick}
              className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-2)] text-[var(--sand)] lg:hidden"
              aria-label="Abrir navegación"
            >
              <Menu size={16} />
            </button>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--muted)]">{breadcrumb(pathname)}</p>
            <h1 className="font-serif text-3xl leading-none text-[var(--ink)]">{title(pathname)}</h1>
          </div>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm capitalize text-[var(--sand)]/85 md:block">{currentDateLabel}</p>
            <ServiceStatusBadge pending={pending} waitingTables={waitingTables} />
            <NotificationBell count={alerts} />
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface-2)] text-sm font-semibold text-[var(--sand)]">
              FD
            </span>
          </div>
        </div>

        <label className="flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm text-[var(--sand)]/85">
          <Search size={15} className="text-[var(--muted)]" />
          <input
            type="search"
            placeholder="Buscar reservas, clientes, mesas..."
            className="w-full bg-transparent text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
        </label>
      </div>
    </header>
  );
}
