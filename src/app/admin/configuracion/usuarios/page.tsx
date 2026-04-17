import { AdminNav } from "@/ui/components/admin-nav";

export default function ConfigUsuariosPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12">
      <h1 className="font-serif text-4xl">Configuracion: Usuarios</h1>
      <AdminNav />
      <article className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6 text-sm">
        <p>Alta/baja de usuarios y asignacion de roles (admin, recepcion, chef).</p>
      </article>
    </section>
  );
}
