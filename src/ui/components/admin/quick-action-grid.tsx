import Link from "next/link";
import {
  BellRing,
  CalendarPlus2,
  Clock3,
  FileOutput,
  Printer,
  TableProperties,
  UserPlus2,
  UsersRound,
} from "lucide-react";

const actions = [
  { href: "/admin/reservas/nueva", label: "Nueva reserva", icon: CalendarPlus2 },
  { href: "/admin/mesas", label: "Asignar mesa", icon: TableProperties },
  { href: "/admin/clientes", label: "Agregar cliente", icon: UserPlus2 },
  { href: "/admin/configuracion/reglas", label: "Bloqueo horario", icon: Clock3 },
  { href: "/admin/waitlist", label: "Confirmar waitlist", icon: UsersRound },
  { href: "/admin/servicio-hoy", label: "Imprimir servicio", icon: Printer },
  { href: "/admin/notificaciones", label: "Enviar recordatorios", icon: BellRing },
  { href: "/admin/reportes", label: "Exportar reporte", icon: FileOutput },
];

export function QuickActionGrid() {
  return (
    <section className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
      <h3 className="font-serif text-3xl">Acciones rápidas</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group rounded-xl border border-[var(--line)] bg-[var(--surface-2)]/70 p-4 transition hover:-translate-y-0.5 hover:border-[var(--gold)]/60"
          >
            <action.icon size={18} className="text-[var(--gold)] transition group-hover:scale-110" />
            <p className="mt-2 text-sm text-[var(--sand)]">{action.label}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
