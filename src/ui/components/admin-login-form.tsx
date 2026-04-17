"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type StaffRole = "admin" | "recepcion" | "chef";

export function AdminLoginForm({ returnTo }: { returnTo: string }) {
  const router = useRouter();
  const [role, setRole] = useState<StaffRole>("recepcion");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "No se pudo iniciar sesion");
      }
      router.push(returnTo);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Error inesperado");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="grid gap-2 text-sm">
        Rol
        <select
          value={role}
          onChange={(event) => setRole(event.target.value as StaffRole)}
          className="rounded-xl border border-[var(--line)] px-3 py-2"
        >
          <option value="recepcion">Recepcion</option>
          <option value="chef">Chef</option>
          <option value="admin">Admin</option>
        </select>
      </label>

      <button
        type="submit"
        disabled={loading}
        className="rounded-full bg-[var(--terracotta)] px-5 py-2 text-sm text-white disabled:opacity-60"
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
