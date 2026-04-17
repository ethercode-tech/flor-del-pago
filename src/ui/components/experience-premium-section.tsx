"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, ChefHat, House, Sparkles, Trees, Wine } from "lucide-react";
import { Button } from "@/ui/components/button";
import { MobileReserveBar } from "@/ui/components/mobile-reserve-bar";

const chips = ["Aire libre", "Jardin colonial", "Espacios verdes", "Galerias techadas", "Ideal para familias"];

const experienceCards = [
  {
    title: "Almuerzo en el jardin",
    text: "Mesas al aire libre para una pausa tranquila en Lozano.",
    image:
      "/images/lugar/experiencia1.jpg",
  },
  {
    title: "Cena romantica",
    text: "Ambiente intimo, vino y tiempo para celebrar.",
    image:
      "/platos/meriendaExperiencia.jpg",
  },
  {
    title: "Reuniones familiares",
    text: "Espacio amplio y servicio cuidado para grupos.",
    image:
      "/images/lugar/casona.jpg",
  },
  {
    title: "Turismo gastronomico",
    text: "Una parada de destino para quienes visitan Jujuy.",
    image:
      "/images/lugar/interior.jpg",
  },
  {
    title: "Eventos privados",
    text: "Cenas especiales, aniversarios y encuentros.",
    image:
      "/platos/salon.jpg",
  },
  {
    title: "Te y maridajes",
    text: "Experiencias futuras con formato boutique.",
    image:
      "/images/lugar/interior.jpg",
  },
];

const differentiators = [
  { icon: ChefHat, title: "Cocina italo-colonial unica" },
  { icon: Sparkles, title: "Chef con recorrido internacional" },
  { icon: House, title: "Jardin y casona colonial" },
  { icon: Wine, title: "Atencion personalizada" },
  { icon: Trees, title: "Calma lejos del ruido urbano" },
  { icon: Leaf, title: "Ideal para reservar con anticipacion" },
];

const testimonials = [
  {
    name: "Carolina M.",
    city: "Salta",
    quote: "Uno de los mejores lugares donde comimos en Jujuy.",
    rating: "5/5",
  },
  {
    name: "Ramon P.",
    city: "Cordoba",
    quote: "La atencion, el jardin y la comida hacen que quieras volver.",
    rating: "5/5",
  },
  {
    name: "Lucia G.",
    city: "Buenos Aires",
    quote: "Vale completamente la pena salir de la ciudad para venir.",
    rating: "5/5",
  },
];

export function ExperiencePremiumSection() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <>
      <section className="relative min-h-[70vh] overflow-hidden md:min-h-[78vh]">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="/images/lugar/casona.jpg"
            alt="Jardin y mesas en Flor Del Pago"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/55 to-black/80" />
        <div className="relative mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col justify-center px-5 py-14 md:min-h-[78vh] md:px-6">
          <p className="w-fit border border-white/45 px-3 py-1 text-[11px] uppercase tracking-[0.14em]">Lozano, Jujuy</p>
          <h1 className="uppercase-display mt-5 max-w-4xl font-serif text-4xl leading-[0.95] md:text-7xl">
            Mas que una comida, una pausa en Lozano
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-white/85 md:text-lg">
            Flor Del Pago combina cocina de autor, naturaleza, jardines y una atmosfera tranquila para vivir una
            experiencia distinta en Jujuy.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/reservas">
              <Button>Reservar mesa</Button>
            </Link>
            <Link href="/menu">
              <Button variant="ghost">Ver menu</Button>
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.11em] text-white/80">
            <span className="rounded-full border border-white/35 px-3 py-1">Reservas limitadas</span>
            <span className="rounded-full border border-white/35 px-3 py-1">Martes a Domingo</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-6 md:py-16">
        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-3 sm:grid-cols-2"
          >
            <div className="relative min-h-[200px] overflow-hidden rounded-3xl border border-white/15 sm:col-span-2">
              <Image
                src="/platos/ravioli.jpg"
                alt="Panoramica del jardin"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 60vw"
              />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src="/images/lugar/interior.jpg"
                alt="Mesas al aire libre"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-3xl border border-white/15">
              <Image
                src="/images/lugar/casona.jpg"
                alt="Galeria colonial"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 30vw"
              />
            </div>
          </motion.div>

          <motion.article
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="rounded-[2rem] border border-white/15 bg-[var(--surface)] p-6 md:p-8"
          >
            <h2 className="uppercase-display font-serif text-4xl leading-[0.95]">Jardines, galerias y una casona colonial</h2>
            <p className="mt-4 text-white/80">
              Flor Del Pago esta rodeado de vegetacion, galerias abiertas y espacios tranquilos que invitan a bajar el
              ritmo. La experiencia empieza mucho antes del primer plato.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.08em] text-white/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.article>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/15">
        <Image
          src="/images/lugar/interior.jpg"
          alt="Salon de Flor Del Pago"
          width={1900}
          height={640}
          className="h-[380px] w-full object-cover md:h-[460px]"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col justify-center px-5 md:px-6">
          <h2 className="uppercase-display max-w-3xl font-serif text-4xl leading-[0.95] md:text-6xl">
            Atencion personalizada y servicio cuidado
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-white/82 md:text-base">
            El servicio es uno de los aspectos mas valorados por quienes visitan Flor Del Pago. El equipo acompana
            cada mesa con cercania, profesionalismo y atencion al detalle.
          </p>
          <div className="mt-5 grid gap-2 text-xs uppercase tracking-[0.08em] text-white/78 md:grid-cols-2">
            <span>- Presencia del chef en sala</span>
            <span>- Recomendaciones personalizadas</span>
            <span>- Atencion para ocasiones especiales</span>
            <span>- Servicio pausado y calido</span>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-6 md:py-16">
        <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">Experiencias diferentes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {experienceCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -4, borderColor: "rgba(255,192,0,0.45)" }}
              className="group relative min-h-[280px] overflow-hidden rounded-[1.7rem] border border-white/15"
            >
              <Image src={card.image} alt={card.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-serif text-3xl">{card.title}</h3>
                <p className="mt-2 text-sm text-white/80">{card.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-6 md:px-6 md:py-10">
        <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">
          Por que Flor Del Pago no se parece a otros restaurantes
        </h2>
        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {differentiators.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-5">
              <item.icon size={18} className="text-[var(--gold)]" />
              <p className="mt-2 text-sm uppercase tracking-[0.08em] text-white/88">{item.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-6 md:py-14">
        <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">Testimonios</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {testimonials.map((t) => (
            <article key={t.name} className="rounded-2xl border border-white/15 bg-[var(--surface)] p-5">
              <p className="text-sm text-[var(--gold)]">{t.rating}</p>
              <blockquote className="mt-2 text-white/86">{t.quote}</blockquote>
              <p className="mt-4 text-xs uppercase tracking-[0.09em] text-white/65">
                {t.name} - {t.city}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden">
        <Image
          src="/images/lugar/interior.jpg"
          alt="Mesa servida al atardecer"
          width={2000}
          height={700}
          className="h-[420px] w-full object-cover md:h-[540px]"
        />
        <div className="absolute inset-0 bg-black/68" />
        <div className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center">
          <blockquote className="max-w-3xl font-serif text-3xl leading-snug md:text-5xl">
            &quot;Hay lugares para comer. Y hay lugares a los que uno quiere volver.&quot;
          </blockquote>
          <p className="mt-4 text-sm text-white/80">Flor Del Pago es cocina, calma, paisaje y experiencia.</p>
          <Link href="/reservas" className="mt-6">
            <Button>Reservar Mesa</Button>
          </Link>
        </div>
      </section>

      <MobileReserveBar />
    </>
  );
}
