"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/reservas/nueva", label: "Nueva reserva" },
  { href: "/admin/servicio-hoy", label: "Servicio hoy" },
  { href: "/admin/mesas", label: "Mesas" },
  { href: "/admin/mesas/configuracion", label: "Config mesas" },
  { href: "/admin/clientes", label: "Clientes" },
  { href: "/admin/waitlist", label: "Waitlist" },
  { href: "/admin/notificaciones", label: "Notificaciones" },
  { href: "/admin/reportes", label: "Reportes" },
  { href: "/admin/configuracion", label: "Configuracion" },
  { href: "/admin/auditoria", label: "Auditoria" },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="mb-8 flex flex-wrap items-center gap-3">
      <nav className="flex flex-wrap gap-3">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              pathname === item.href || pathname.startsWith(`${item.href}/`)
                ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--sand)]"
                : "border-[var(--line)] bg-[var(--surface-2)] text-[var(--sand)] hover:border-[var(--terracotta)] hover:text-white"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <form action="/api/admin/auth/logout" method="post" className="ml-auto">
        <button
          type="submit"
          className="rounded-full border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2 text-sm text-[var(--sand)] transition hover:border-[var(--terracotta)] hover:text-white"
        >
          Cerrar sesion
        </button>
      </form>
    </div>
  );
}
