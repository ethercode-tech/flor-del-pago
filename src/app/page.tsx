import type { Metadata } from "next";
import Link from "next/link";
import { AnimatedReveal } from "@/ui/components/animated-reveal";
import { Button } from "@/ui/components/button";
import { InteractiveExperienceGrid } from "@/ui/components/interactive-experience-grid";
import { HomeMenuShowcase } from "@/ui/components/home-menu-showcase";
import { MobileReserveBar } from "@/ui/components/mobile-reserve-bar";
import { PremiumHero } from "@/ui/components/premium-hero";
import { ReservationForm } from "@/ui/components/reservation-form";

export const metadata: Metadata = {
  title: "Flor Del Pago | Cocina Ítalo-Colonial en Lozano",
  description:
    "Sabores de Italia y el norte argentino en un refugio colonial único. Reservas limitadas en Lozano, Jujuy.",
};

const EXPERIENCE = [
  {
    title: "Jardines y Galerias",
    text: "Mesa entre verde, piedra y aire de quebrada.",
  },
  {
    title: "Atencion Personalizada",
    text: "Servicio con ritmo de alta cocina y trato cercano.",
  },
  {
    title: "Noches de Autor",
    text: "Cenas intimas, maridajes y experiencia completa en salon.",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Flor Del Pago",
    servesCuisine: ["Italiana", "Colonial", "Noroeste Argentino"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jose Quintana 7",
      addressLocality: "Lozano",
      addressRegion: "Jujuy",
      addressCountry: "AR",
    },
    telephone: "+54 388 513-4101",
  };

  return (
    <>
      <PremiumHero />

      <section className="mx-auto grid w-full max-w-7xl gap-6 px-5 py-12 md:grid-cols-[1.2fr_1fr] md:px-6 md:py-16">
        <AnimatedReveal>
          <div
            className="min-h-[300px] border border-white/20 bg-cover bg-center md:min-h-[420px]"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.66), rgba(0,0,0,0.18)), url('/platos/ravioli.jpg')",
            }}
          />
        </AnimatedReveal>
        <AnimatedReveal>
          <article className="h-full border border-white/15 bg-[var(--surface-2)] p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--gold)]">Historia</p>
            <h2 className="uppercase-display mt-3 font-serif text-3xl leading-[0.95] md:text-4xl">
              Del Mundo a Lozano
            </h2>
            <p className="mt-4 text-sm text-[var(--muted)] md:text-base">
              Daniel Hansen regresa a su casa familiar tras su paso por New York y Buenos Aires. Flor Del Pago nace
              como un proyecto de herencia, oficio y territorio.
            </p>
            <blockquote className="mt-6 border-l border-[var(--gold)] pl-4 text-sm italic text-white/88">
              &quot;Volver a las raices y transformarlas en alta cocina.&quot;
            </blockquote>
          </article>
        </AnimatedReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-10">
        <AnimatedReveal>
          <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">Experiencia Flor Del Pago</h2>
        </AnimatedReveal>
        <InteractiveExperienceGrid items={EXPERIENCE} />
      </section>

      <HomeMenuShowcase />

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-10">
        <AnimatedReveal>
          <div
            className="border border-white/15 bg-cover bg-center p-6 md:p-12"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,0,0,0.55)), url('/images/lugar/vinos.jpg')",
            }}
          >
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--gold)]">Despensa Flor Del Pago</p>
            <h2 className="uppercase-display mt-3 max-w-3xl font-serif text-4xl leading-[0.95] md:text-5xl">
              Lleva Flor Del Pago a tu casa
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/84 md:text-base">
              Aceite de oliva extra virgen, infusiones y gift boxes premium disponibles por WhatsApp en fase 1.
            </p>
            <div className="mt-6">
              <a
                href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago,%20quiero%20consultar%20por%20productos."
                target="_blank"
                rel="noreferrer"
              >
                <Button>Consultar por WhatsApp</Button>
              </a>
            </div>
          </div>
        </AnimatedReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-10">
        <AnimatedReveal>
          <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">Reservar ahora</h2>
        </AnimatedReveal>
        <p className="mt-3 text-sm text-[var(--muted)] md:text-base">
          Confirmacion automatica por WhatsApp y email. Recomendamos reservar con anticipacion.
        </p>
        <div className="mt-6 pb-24 md:pb-0">
          <ReservationForm />
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-12">
        <AnimatedReveal>
          <div className="mb-5 flex items-end justify-between gap-3">
            <h3 className="font-serif text-4xl leading-[0.95] md:text-5xl">Lo que dicen nuestros comensales</h3>
            <span className="text-xs uppercase tracking-[0.12em] text-[var(--gold)]">Resenas reales</span>
          </div>
        </AnimatedReveal>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
          {[
            {
              quote: "Excelente servicio, propuesta unica y una de las mejores pastas de la region.",
              name: "Mariana V.",
              city: "San Salvador de Jujuy",
            },
            {
              quote: "Vale completamente la pena salir de la ciudad para venir.",
              name: "Federico A.",
              city: "Salta",
            },
            {
              quote: "La atencion, el jardin y la cocina hacen que quieras volver.",
              name: "Lucia M.",
              city: "Cordoba",
            },
          ].map((item, index) => (
            <AnimatedReveal key={item.name}>
              <article className="min-w-[88%] snap-center rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] p-5 md:min-w-0">
                <p className="text-[var(--sand)]/90">&quot;{item.quote}&quot;</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-medium text-[var(--ink)]">{item.name}</p>
                    <p className="text-[var(--muted)]">{item.city}</p>
                  </div>
                  <p className="text-[var(--gold)]">{"★★★★★"}</p>
                </div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-[var(--muted)]">Testimonio {index + 1}</p>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-8 md:px-6 md:py-12">
        <AnimatedReveal>
          <article className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(140deg,rgba(77,82,68,.22),rgba(27,25,23,.94))] p-6 md:p-9">
            <h3 className="font-serif text-4xl leading-[0.95] md:text-5xl">Preguntas frecuentes</h3>
            <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
              Todo lo necesario para planificar tu visita sin friccion.
            </p>
            <div className="mt-6 space-y-3">
              {[
                {
                  q: "Es necesario reservar?",
                  a: "Si, especialmente viernes noche, sabado noche y domingo al mediodia.",
                },
                {
                  q: "Hay mesas al aire libre?",
                  a: "Si, contamos con jardin y galeria, sujeto a condiciones climaticas.",
                },
                {
                  q: "Que pasa si llueve?",
                  a: "Reasignamos prioridad a interior y galeria segun disponibilidad.",
                },
                {
                  q: "Aceptan tarjetas?",
                  a: "Si, aceptamos tarjetas de credito y debito.",
                },
                {
                  q: "Hay estacionamiento?",
                  a: "Si, el restaurante dispone de estacionamiento amplio.",
                },
                {
                  q: "Tienen opciones vegetarianas?",
                  a: "Si, contamos con platos vegetarianos segun temporada.",
                },
              ].map((faq) => (
                <details key={faq.q} className="group rounded-xl border border-[var(--line)] bg-black/20 p-4">
                  <summary className="cursor-pointer list-none text-sm font-medium text-[var(--ink)]">
                    {faq.q}
                    <span className="float-right text-[var(--muted)] transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-[var(--muted)]">{faq.a}</p>
                </details>
              ))}
            </div>
            <Link href="/contacto" className="mt-5 inline-block text-xs uppercase tracking-[0.14em] text-[var(--gold)] hover:text-[var(--gold-hover)]">
              Ver mapa y contacto
            </Link>
          </article>
        </AnimatedReveal>
      </section>

      <section className="relative isolate overflow-hidden">
        <div
          className="relative min-h-[62vh] bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.84), rgba(0,0,0,0.58)), url('/images/lugar/interior.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(168,132,79,0.2),transparent_38%)]" />
          <div className="relative mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-5 py-14 md:px-6">
            <AnimatedReveal>
              <h3 className="max-w-4xl font-serif text-4xl leading-[0.95] md:text-6xl">
                Tu proxima salida especial esta mas cerca de lo que imaginas
              </h3>
              <p className="mt-4 max-w-2xl text-sm text-[var(--sand)]/90 md:text-lg">
                Reserva con anticipacion y descubri una de las experiencias gastronomicas mas especiales de Jujuy.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/reservas">
                  <Button>Reservar mesa</Button>
                </Link>
                <Link href="/contacto">
                  <Button variant="ghost">Ver ubicacion</Button>
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]/88 md:text-xs">
                {["Reservas limitadas", "Lozano, Jujuy", "Martes a Domingo", "Confirmacion por WhatsApp"].map((badge) => (
                  <span key={badge} className="rounded-full border border-[var(--line)] bg-black/25 px-3 py-1">
                    {badge}
                  </span>
                ))}
              </div>
            </AnimatedReveal>
          </div>
        </div>
      </section>

      <MobileReserveBar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </>
  );
}
