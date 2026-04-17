import type { Metadata } from "next";
import Link from "next/link";
import { CalendarClock, CheckCircle2, Landmark, MessageCircle, Sparkles, Wine } from "lucide-react";
import { Button } from "@/ui/components/button";
import { ReservationForm } from "@/ui/components/reservation-form";

export const metadata: Metadata = {
  title: "Reservas | Flor Del Pago",
  description:
    "Reservá tu mesa en Flor Del Pago y viví una experiencia gastronómica premium en Lozano, Jujuy.",
};

const benefits = [
  { icon: MessageCircle, text: "Confirmacion por WhatsApp y email" },
  { icon: Sparkles, text: "Prioridad para mesas especiales" },
  { icon: Wine, text: "Ideal para aniversario o celebracion" },
  { icon: Landmark, text: "Interior, galeria o jardin" },
  { icon: CheckCircle2, text: "Atencion personalizada" },
];

const highDemand = [
  { day: "Viernes noche", level: "Pocas mesas", color: "text-amber-300" },
  { day: "Sabado noche", level: "Casi completo", color: "text-red-300" },
  { day: "Domingo almuerzo", level: "Disponibilidad media", color: "text-emerald-300" },
];

export default function ReservationsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.86)), url('/images/lugar/casona.jpg')",
          }}
        />
        <div className="relative mx-auto flex min-h-[58vh] w-full max-w-7xl flex-col justify-center px-5 py-14 md:min-h-[64vh] md:px-6">
          <p className="w-fit border border-white/45 px-3 py-1 text-[11px] uppercase tracking-[0.14em]">
            Reservas limitadas
          </p>
          <h1 className="uppercase-display mt-5 max-w-4xl font-serif text-4xl leading-[0.95] md:text-7xl">
            Reserva una experiencia en Flor Del Pago
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/82 md:text-lg">
            Cada mesa se prepara con anticipacion. Las reservas son limitadas y suelen agotarse especialmente los fines
            de semana.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/menu">
              <Button variant="ghost">Ver menu</Button>
            </Link>
            <Link href="/experiencia">
              <Button variant="secondary">Ver experiencia</Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.11em] text-white/80">
            <span className="rounded-full border border-white/35 px-3 py-1">Lozano, Jujuy</span>
            <span className="rounded-full border border-white/35 px-3 py-1">Confirmacion por WhatsApp</span>
            <span className="rounded-full border border-white/35 px-3 py-1">Martes a Domingo</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-10 md:px-6 md:py-14">
        <div className="grid gap-3 md:grid-cols-5">
          {benefits.map((benefit) => (
            <article key={benefit.text} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-4">
              <benefit.icon size={16} className="text-[var(--gold)]" />
              <p className="mt-2 text-xs uppercase tracking-[0.08em] text-white/78">{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-6 md:pb-16">
        <div className="grid items-start gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <ReservationForm />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24">
            <article className="rounded-3xl border border-[var(--gold)]/30 bg-[var(--surface)] p-6">
              <h2 className="uppercase-display font-serif text-3xl">Reservas mas solicitadas</h2>
              <ul className="mt-4 space-y-2">
                {highDemand.map((item) => (
                  <li key={item.day} className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-white/85">{item.day}</span>
                    <span className={`${item.color} text-xs uppercase tracking-[0.08em]`}>{item.level}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-3xl border border-white/15 bg-[var(--surface)] p-6">
              <h3 className="uppercase-display font-serif text-2xl">La experiencia incluye</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/78">
                <li>- Cocina italo-colonial de autor</li>
                <li>- Jardin y galerias</li>
                <li>- Atencion personalizada</li>
                <li>- Ambiente tranquilo</li>
                <li>- Opciones para ocasiones especiales</li>
              </ul>
            </article>

            <article className="rounded-3xl border border-white/15 bg-[var(--surface)] p-6">
              <h3 className="uppercase-display font-serif text-2xl">Informacion util</h3>
              <ul className="mt-4 space-y-2 text-sm text-white/78">
                <li>- Reservar con anticipacion</li>
                <li>- Tolerancia de llegada: 15 min</li>
                <li>- Cancelacion: 4h antes</li>
                <li>- Tiempo estimado de mesa: 90-120 min</li>
              </ul>
              <blockquote className="mt-5 border-l border-[var(--gold)] pl-4 text-sm italic text-white/88">
                &quot;Uno de los mejores lugares para celebrar algo especial en Jujuy.&quot;
              </blockquote>
            </article>

            <article className="rounded-3xl border border-white/15 bg-[var(--surface)] p-6">
              <div className="flex items-center gap-2 text-[var(--gold)]">
                <CalendarClock size={16} />
                <p className="text-xs uppercase tracking-[0.12em]">Alta demanda este fin de semana</p>
              </div>
              <div className="mt-4 space-y-3">
                {highDemand.map((item) => (
                  <div key={`bar-${item.day}`}>
                    <p className="text-xs text-white/70">{item.day}</p>
                    <div className="mt-1 h-2 rounded-full bg-black/60">
                      <div
                        className={`h-2 rounded-full ${
                          item.day.includes("Sabado")
                            ? "w-[88%] bg-red-300"
                            : item.day.includes("Viernes")
                              ? "w-[74%] bg-amber-300"
                              : "w-[55%] bg-emerald-300"
                        }`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-black/95 p-3 md:hidden">
        <div className="mx-auto flex max-w-7xl gap-2">
          <a href="#booking-form" className="flex-1">
            <Button className="w-full py-3 text-[11px]">Reservar ahora</Button>
          </a>
          <a
            href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago,%20quiero%20reservar%20una%20mesa."
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <Button variant="ghost" className="w-full py-3 text-[11px]">
              WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </>
  );
}
