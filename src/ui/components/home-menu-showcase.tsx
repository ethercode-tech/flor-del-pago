"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/ui/components/button";
import { AnimatedReveal } from "@/ui/components/animated-reveal";
import {
  categorySummary,
  homeFeaturedDishes,
  homeMenuChips,
} from "@/content/menu-catalog";

export function HomeMenuShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageParallax = useTransform(scrollYProgress, [0, 1], [16, -20]);

  return (
    <section ref={ref} className="relative mx-auto w-full max-w-7xl px-5 py-10 md:px-6 md:py-14">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_5%,rgba(168,132,79,0.14),transparent_42%),radial-gradient(circle_at_85%_90%,rgba(77,82,68,0.15),transparent_45%)]" />

      <AnimatedReveal>
        <div className="grid gap-6 rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(130deg,rgba(27,25,23,.95),rgba(43,40,36,.88))] p-6 md:grid-cols-[1fr_1.05fr] md:p-8">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Seccion menu</p>
            <h2 className="font-serif text-4xl leading-[0.95] md:text-5xl">Una cocina nacida entre Italia y Jujuy</h2>
            <p className="text-sm text-[var(--muted)] md:text-base">
              La propuesta de Daniel Hansen combina recetas italianas, productos del norte argentino y una
              mirada contemporanea sobre los sabores de Jujuy.
            </p>
            <div className="flex flex-wrap gap-2">
              {homeMenuChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-[var(--line)] bg-black/20 px-3 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            className="relative min-h-[260px] overflow-hidden rounded-[1.2rem] border border-[var(--line)]"
            style={{ y: imageParallax }}
          >
            <Image
              src="/platos/meriendaExperiencia.jpg"
              alt="Chef y cocina editorial Flor Del Pago"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 48vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
          </motion.div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal>
        <div className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-3">
            <h3 className="font-serif text-3xl md:text-4xl">Destacados del menu</h3>
            <Link href="/menu" className="text-xs uppercase tracking-[0.14em] text-[var(--gold)] hover:text-[var(--gold-hover)]">
              Carta completa
            </Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {homeFeaturedDishes.map((dish, index) => (
              <motion.article
                key={dish.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.01 }}
                className="group min-w-[86%] snap-center overflow-hidden rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface-2)] md:min-w-0"
              >
                <div className="relative h-52 overflow-hidden">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} className="h-full">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 86vw, 24vw"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent" />
                  <motion.span
                    whileHover={{ scale: 1.03 }}
                    className="absolute left-3 top-3 rounded-full border border-[var(--line)] bg-black/45 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]"
                  >
                    {dish.badge}
                  </motion.span>
                </div>
                <div className="space-y-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-2xl leading-tight">{dish.name}</h4>
                    <span className="shrink-0 text-xs text-[var(--gold)]">{dish.price}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)]">{dish.description}</p>
                  <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--sand)]/80">{dish.ingredients}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal>
        <div className="mt-8">
          <h3 className="font-serif text-3xl md:text-4xl">Categorias</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {categorySummary.map((category) => (
              <article
                key={category.title}
                className="rounded-[1rem] border border-[var(--line)] bg-[var(--surface)]/90 p-4 transition hover:border-[var(--gold)]/50"
              >
                <p className="font-serif text-2xl">{category.title}</p>
                <p className="mt-2 text-sm text-[var(--muted)]">{category.text}</p>
              </article>
            ))}
          </div>
        </div>
      </AnimatedReveal>

      <AnimatedReveal>
        <div className="mt-8 rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(120deg,rgba(43,40,36,.92),rgba(27,25,23,.95))] p-6 md:p-8">
          <h3 className="font-serif text-3xl md:text-4xl">Descubri la carta completa de Flor Del Pago</h3>
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
            Explora todos los platos, vinos, postres y especialidades de estacion.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/menu">
              <Button variant="ghost">Ver carta completa</Button>
            </Link>
            <Link href="/reservas">
              <Button>Reservar mesa</Button>
            </Link>
          </div>
        </div>
      </AnimatedReveal>
    </section>
  );
}
