"use client";

import { type FormEvent, useMemo, useState } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/ui/components/button";

type ReservationState = {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  reservationDate: string;
  reservationTime: string;
  guestsCount: number;
  areaPreference: "interior" | "galeria" | "jardin";
  occasionType: string;
  notes: string;
};

const OCCASION_OPTIONS = [
  "Cumpleanos",
  "Aniversario",
  "Cena romantica",
  "Reunion familiar",
  "Evento privado",
] as const;

const TIME_SLOTS = ["12:30", "13:00", "13:30", "20:00", "20:30", "21:00", "21:30", "22:00"];

const INITIAL_STATE: ReservationState = {
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  reservationDate: format(new Date(), "yyyy-MM-dd"),
  reservationTime: "21:00",
  guestsCount: 2,
  areaPreference: "interior",
  occasionType: "",
  notes: "",
};

export function ReservationForm() {
  const [formState, setFormState] = useState<ReservationState>(INITIAL_STATE);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [reservationResult, setReservationResult] = useState<{ id: string; status: string } | null>(null);

  const canSubmit = useMemo(() => {
    return (
      formState.customerName.trim().length > 2 &&
      formState.customerPhone.trim().length >= 8 &&
      formState.customerEmail.includes("@")
    );
  }, [formState]);

  async function submitReservation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      const data = (await response.json()) as { reservation?: { id: string; status: string }; error?: string };
      if (!response.ok || !data.reservation) {
        throw new Error(data.error ?? "No se pudo crear la reserva");
      }
      setStatus("success");
      setReservationResult(data.reservation);
      setMessage("Tu solicitud fue recibida.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Error inesperado");
    }
  }

  if (status === "success" && reservationResult) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[1.6rem] border border-[var(--gold)]/45 bg-[linear-gradient(130deg,#1b1b1b,#101010)]"
      >
        <div className="grid gap-0 md:grid-cols-[1.2fr_1fr]">
          <div
            className="min-h-[220px] bg-cover bg-center"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.28)), url('/images/lugar/interior.jpg')",
            }}
          />
          <div className="space-y-4 p-6 md:p-7">
            <h3 className="font-serif text-4xl leading-[0.95]">Tu solicitud fue recibida</h3>
            <p className="text-sm text-white/80">
              Estamos preparando tu experiencia en Flor Del Pago. En breve recibiras una confirmacion por WhatsApp y
              email.
            </p>
            <div className="rounded-xl border border-white/20 bg-black/35 p-4 text-sm">
              <p>ID: {reservationResult.id}</p>
              <p>Estado inicial: {reservationResult.status}</p>
              <p>
                {formState.reservationDate} - {formState.reservationTime} - {formState.guestsCount} personas
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  setStatus("idle");
                  setReservationResult(null);
                  setFormState(INITIAL_STATE);
                }}
              >
                Crear otra reserva
              </Button>
              <a
                href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago,%20quiero%20consultar%20sobre%20mi%20reserva."
                target="_blank"
                rel="noreferrer"
              >
                <Button variant="ghost">Contactar por WhatsApp</Button>
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <form
      id="booking-form"
      onSubmit={submitReservation}
      className="space-y-6 rounded-[1.8rem] border border-[var(--gold)]/30 bg-black/60 p-6 backdrop-blur-sm md:p-8"
    >
      <div className="space-y-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--gold)]">Informacion personal</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75">
              Nombre
              <input
                required
                value={formState.customerName}
                onChange={(event) => setFormState((s) => ({ ...s, customerName: event.target.value }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
                placeholder="Nombre completo"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75">
              Telefono
              <input
                required
                value={formState.customerPhone}
                onChange={(event) => setFormState((s) => ({ ...s, customerPhone: event.target.value }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
                placeholder="+54 388..."
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75 md:col-span-2">
              Email
              <input
                required
                type="email"
                value={formState.customerEmail}
                onChange={(event) => setFormState((s) => ({ ...s, customerEmail: event.target.value }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
                placeholder="tu@email.com"
              />
            </label>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--gold)]">Reserva</p>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75">
              Fecha
              <input
                required
                type="date"
                value={formState.reservationDate}
                onChange={(event) => setFormState((s) => ({ ...s, reservationDate: event.target.value }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
              />
            </label>
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75">
              Personas
              <input
                required
                type="number"
                min={1}
                max={16}
                value={formState.guestsCount}
                onChange={(event) => setFormState((s) => ({ ...s, guestsCount: Number(event.target.value) }))}
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
              />
            </label>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-[0.09em] text-white/75">Horario</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {TIME_SLOTS.map((slot) => {
                  const active = formState.reservationTime === slot;
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormState((s) => ({ ...s, reservationTime: slot }))}
                      className={`rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.08em] transition-colors ${
                        active
                          ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)]"
                          : "border-white/25 text-white/75 hover:border-white/45"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
            <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75 md:col-span-2">
              Area preferida
              <select
                value={formState.areaPreference}
                onChange={(event) =>
                  setFormState((s) => ({ ...s, areaPreference: event.target.value as ReservationState["areaPreference"] }))
                }
                className="rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
              >
                <option value="interior">Interior</option>
                <option value="galeria">Galeria</option>
                <option value="jardin">Jardin</option>
              </select>
            </label>
          </div>
        </div>

        <div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-[var(--gold)]">Ocasion especial</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {OCCASION_OPTIONS.map((option) => {
              const active = formState.occasionType === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setFormState((s) => ({
                      ...s,
                      occasionType: s.occasionType === option ? "" : option,
                    }))
                  }
                  className={`rounded-full border px-3 py-2 text-xs uppercase tracking-[0.08em] transition-colors ${
                    active
                      ? "border-[var(--gold)] bg-[var(--gold)]/20 text-[var(--gold)]"
                      : "border-white/25 text-white/75 hover:border-white/45"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="grid gap-2 text-xs uppercase tracking-[0.09em] text-white/75">
            Comentarios
            <textarea
              value={formState.notes}
              onChange={(event) => setFormState((s) => ({ ...s, notes: event.target.value }))}
              className="min-h-24 rounded-xl border border-white/20 bg-black px-3 py-3 text-sm text-white transition-colors focus:border-[var(--gold)] focus:outline-none"
              placeholder="Alergias, mesa especial o requerimientos"
            />
          </label>
        </div>
      </div>

      <div className="border-t border-white/15 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button type="submit" disabled={status === "loading" || !canSubmit}>
            {status === "loading" ? "Enviando..." : "Enviar solicitud de reserva"}
          </Button>
          {status === "error" && <span className="text-sm text-red-400">{message}</span>}
          {status === "idle" && <span className="text-xs text-white/60">Confirmacion por WhatsApp y email.</span>}
        </div>
      </div>
    </form>
  );
}
