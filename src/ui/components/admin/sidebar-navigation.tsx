"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BookUser,
  CalendarClock,
  ClipboardList,
  CookingPot,
  LayoutDashboard,
  ListOrdered,
  PlusCircle,
  Settings,
  Table2,
  UserRound,
} from "lucide-react";

const sections = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/reservas", label: "Reservas", icon: CalendarClock },
  { href: "/admin/reservas/nueva", label: "Nueva reserva", icon: PlusCircle },
  { href: "/admin/servicio-hoy", label: "Servicio de hoy", icon: CookingPot },
  { href: "/admin/mesas", label: "Mesas", icon: Table2 },
  { href: "/admin/mesas/configuracion", label: "Configuración de mesas", icon: Settings },
  { href: "/admin/clientes", label: "Clientes", icon: BookUser },
  { href: "/admin/waitlist", label: "Waitlist", icon: ListOrdered },
  { href: "/admin/notificaciones", label: "Notificaciones", icon: Bell },
  { href: "/admin/reportes", label: "Reportes", icon: ClipboardList },
  { href: "/admin/configuracion", label: "Configuración", icon: Settings },
  { href: "/admin/auditoria", label: "Auditoría", icon: Activity },
];

const roleLabel = {
  admin: "Admin",
  recepcion: "Recepción",
  chef: "Cocina",
};

export function SidebarNavigation({
  role,
  className,
}: {
  role: "admin" | "recepcion" | "chef";
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`h-screen w-[280px] shrink-0 border-r border-[var(--line)]/80 bg-[linear-gradient(180deg,#171614,#12110f)] p-5 ${className ?? ""}`}
    >
      <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)]/60 p-4">
        <p className="font-serif text-2xl tracking-[0.08em] text-[var(--ink)]">Flor Del Pago</p>
        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--muted)]">Panel Operativo</p>
        <span className="mt-3 inline-flex rounded-full border border-[var(--gold)]/40 bg-[var(--gold)]/15 px-2.5 py-1 text-[11px] uppercase tracking-[0.12em] text-[var(--sand)]">
          {roleLabel[role]}
        </span>
      </div>

      <nav className="mt-4 flex-1 space-y-1 overflow-y-auto pr-1">
        {sections.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                active
                  ? "border border-[var(--gold)]/45 bg-[var(--gold)]/14 text-[var(--ink)]"
                  : "border border-transparent text-[var(--sand)]/85 hover:border-[var(--line)] hover:bg-[var(--surface)]/70"
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)]/70 p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--surface-2)] text-[var(--sand)]">
            <UserRound size={15} />
          </span>
          <div>
            <p className="text-sm text-[var(--ink)]">Equipo Flor Del Pago</p>
            <p className="text-xs text-[var(--muted)]">{roleLabel[role]}</p>
          </div>
        </div>
        <form action="/api/admin/auth/logout" method="post" className="mt-3">
          <button
            type="submit"
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--sand)] transition hover:border-[var(--terracotta)]"
          >
            Cerrar sesión
          </button>
        </form>
      </div>
    </aside>
  );
}
