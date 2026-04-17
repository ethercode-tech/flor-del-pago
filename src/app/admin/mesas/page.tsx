import { getTables } from "@/app/admin/_lib";
import { AdminNav } from "@/ui/components/admin-nav";

export default async function AdminTablesPage() {
  const tables = (await getTables()) as unknown as Array<Record<string, unknown>>;
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12">
      <h1 className="font-serif text-4xl">Plano de mesas</h1>
      <AdminNav />
      <div className="grid gap-4 md:grid-cols-3">
        {tables.map((table) => (
          <article key={String(table.id)} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--terracotta)]">{String(table.area ?? "-")}</p>
            <h2 className="mt-1 font-serif text-2xl">{String(table.code ?? table.tableName ?? "Mesa")}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Capacidad: {String(table.capacityMax ?? table.capacity ?? "-")}
            </p>
            <p className="text-sm text-[var(--muted)]">Estado: {String(table.status ?? "-")}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
