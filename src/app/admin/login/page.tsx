import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/ui/components/admin-login-form";

export const metadata: Metadata = {
  title: "Ingreso Admin | Flor Del Pago",
  description: "Acceso para equipo de administracion y operacion de Flor Del Pago.",
};

type AdminLoginPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function toSingleValue(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const cookieStore = await cookies();
  const currentRole = cookieStore.get("fdp_role")?.value;
  const params = (await searchParams) ?? {};
  const returnTo = toSingleValue(params.returnTo);

  if (currentRole && ["admin", "recepcion", "chef"].includes(currentRole)) {
    redirect(returnTo || "/admin");
  }

  return (
    <section className="mx-auto flex min-h-[70vh] w-full max-w-4xl items-center px-6 py-12">
      <div className="w-full rounded-3xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-8 shadow-[0_16px_40px_rgba(0,0,0,.08)] md:p-10">
        <h1 className="font-serif text-4xl">Ingreso de equipo</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Selecciona tu rol de operacion para abrir el panel administrativo.
        </p>
        <AdminLoginForm returnTo={returnTo || "/admin"} />
      </div>
    </section>
  );
}
