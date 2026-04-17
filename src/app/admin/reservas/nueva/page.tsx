"use client";

import { FormEvent, useState } from "react";
import { AdminNav } from "@/ui/components/admin-nav";

export default function NewReservationAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage(null);
    const formData = new FormData(event.currentTarget);
    const payload = {
      customerName: String(formData.get("customerName") ?? ""),
      customerPhone: String(formData.get("customerPhone") ?? ""),
      customerEmail: String(formData.get("customerEmail") ?? ""),
      date: String(formData.get("date") ?? ""),
      time: String(formData.get("time") ?? ""),
      partySize: Number(formData.get("partySize") ?? 2),
      areaPreference: String(formData.get("areaPreference") ?? "interior"),
      source: "manual",
    };
    const response = await fetch("/api/admin/reservations/create-manual", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `Reserva creada: ${data.reservation.id}` : data.error ?? "Error");
    if (response.ok) {
      event.currentTarget.reset();
    }
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="font-serif text-4xl">Nueva reserva</h1>
      <AdminNav />
      <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] p-6 md:grid-cols-2">
        <input name="customerName" placeholder="Nombre" className="rounded-lg border border-[var(--line)] px-3 py-2" required />
        <input name="customerPhone" placeholder="Telefono" className="rounded-lg border border-[var(--line)] px-3 py-2" required />
        <input name="customerEmail" type="email" placeholder="Email" className="rounded-lg border border-[var(--line)] px-3 py-2" />
        <input name="partySize" type="number" min={1} max={20} defaultValue={2} className="rounded-lg border border-[var(--line)] px-3 py-2" required />
        <input name="date" type="date" className="rounded-lg border border-[var(--line)] px-3 py-2" required />
        <input name="time" type="time" className="rounded-lg border border-[var(--line)] px-3 py-2" required />
        <select name="areaPreference" className="rounded-lg border border-[var(--line)] px-3 py-2">
          <option value="interior">Interior</option>
          <option value="galeria">Galeria</option>
          <option value="jardin">Jardin</option>
        </select>
        <button disabled={loading} className="rounded-full bg-[var(--terracotta)] px-4 py-2 text-sm text-white disabled:opacity-60">
          {loading ? "Guardando..." : "Crear reserva"}
        </button>
      </form>
      {message ? <p className="mt-4 text-sm">{message}</p> : null}
    </section>
  );
}
