"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/ui/components/button";
import chef from '../../../public/chef.jpg'

const timeline = [
  {
    badge: "NEW YORK",
    title: "Formacion internacional",
    text: "Daniel trabajo en cocinas de alta exigencia en New York, incluyendo Sette MoMA, donde perfecciono tecnicas italianas clasicas y cocina de nivel internacional.",
    year: "2012-2016",
    city: "New York",
  },
  {
    badge: "BUENOS AIRES",
    title: "Consolidacion gastronomica",
    text: "Luego desarrollo proyectos reconocidos como Sette Bacco y La Pecora Nera, consolidando una identidad culinaria sofisticada y personal.",
    year: "2017-2021",
    city: "Buenos Aires",
  },
  {
    badge: "LOZANO",
    title: "Regreso a las raices",
    text: "Con Flor Del Pago, Daniel regreso a Jujuy para unir su experiencia internacional con los sabores, productos y memorias de su infancia.",
    year: "2022-Hoy",
    city: "Lozano",
  },
];

const philosophyChips = [
  "Cocina italiana",
  "Productos del NOA",
  "Pastas artesanales",
  "Fuego lento",
  "Ingredientes locales",
  "Recetas familiares",
  "Alta cocina",
];

const signatureDishes = [
  {
    name: "Ravioles de limon con camarones",
    desc: "Pasta fresca de autor con acidez citrica y textura marina.",
    image:
      "/platos/ravioli.jpg",
  },
  {
    name: "Pulpo sobre humita",
    desc: "Fusion entre tecnica mediterranea y tradicion del norte argentino.",
    image:
      "/platos/pulpoHumita.jpg",
  },
  {
    name: "Risotto de habas y queso de cabra",
    desc: "Cremosidad italiana con productos de estacion de Jujuy.",
    image:
      "/platos/ravioli.jpg",
  },
];

const recognitions = [
  {
    key: "acf",
    image: "/images/academias/academie-culinaire-de-france.jpg",
    imageAlt: "Insignia de la Academie Culinaire de France",
    title: "Academie Culinaire de France",
    description:
      "Institucion fundada en 1883 y considerada una de las asociaciones de chefs mas antiguas del mundo.",
  },
  {
    key: "aic",
    image: "/images/academias/accademia-italiana-della-cucina.png",
    imageAlt: "Insignia de la Accademia Italiana della Cucina",
    title: "Accademia Italiana della Cucina",
    description:
      "Reconocimiento ligado a la preservacion y difusion de la cultura gastronomica italiana.",
  },
];

function TimelineItem({
  badge,
  title,
  text,
  year,
  city,
  index,
}: {
  badge: string;
  title: string;
  text: string;
  year: string;
  city: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-10"
    >
      <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border border-[var(--gold)] bg-black" />
      <p className="text-[11px] tracking-[0.16em] text-[var(--gold)]">{badge}</p>
      <h3 className="mt-2 font-serif text-3xl">{title}</h3>
      <p className="mt-2 text-sm text-white/78">{text}</p>
      <p className="mt-2 text-xs uppercase tracking-[0.1em] text-white/55">
        {year} - {city}
      </p>
    </motion.article>
  );
}

export function ChefPremiumSection() {
  const recognitionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: recognitionRef,
    offset: ["start end", "end start"],
  });
  const insigniaY = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-12 md:px-6 md:py-16">
      <div className="grid items-start gap-7 md:grid-cols-[1.05fr_1fr]">
        <div className="md:sticky md:top-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative min-h-[420px] overflow-hidden rounded-[2rem] border border-white/15 md:min-h-[700px]"
          >
            <Image
              src={chef}
              alt="Daniel Hansen en cocina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 48vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
            <p className="absolute bottom-6 left-6 text-xs uppercase tracking-[0.18em] text-white/80">
              Chef Portrait
            </p>
          </motion.div>
        </div>

        <div className="space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Chef de Flor Del Pago</p>
            <h1 className="uppercase-display mt-3 font-serif text-5xl leading-[0.95] md:text-7xl">
              Daniel Hansen
            </h1>
            <p className="mt-3 text-lg text-white/80">
              Chef, creador de Flor Del Pago y referente de la cocina italo-colonial en Jujuy.
            </p>
            <p className="mt-4 text-sm text-white/70 md:text-base">
              Luego de formarse y trabajar en New York y Buenos Aires, Daniel Hansen volvio a Lozano para transformar
              la casa de su infancia en una experiencia gastronomica unica.
            </p>
            <blockquote className="mt-6 border-l border-[var(--gold)] pl-5 font-serif text-2xl leading-snug text-white/92">
              &quot;Mi cocina busca unir la elegancia italiana con los sabores y productos que marcaron mi infancia en
              Jujuy.&quot;
            </blockquote>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reservas">
                <Button>Reservar una experiencia</Button>
              </Link>
              <Link href="/menu">
                <Button variant="ghost">Ver menu destacado</Button>
              </Link>
            </div>
          </div>

          <div className="relative border border-white/15 bg-[var(--surface)] p-6 md:p-8">
            <div className="absolute left-6 top-8 bottom-8 w-px bg-gradient-to-b from-[var(--gold)]/90 to-white/15" />
            <div className="space-y-9">
              {timeline.map((item, index) => (
                <TimelineItem key={item.badge} {...item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        ref={recognitionRef}
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55 }}
        className="relative mt-14 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(27,25,23,.96),rgba(43,40,36,.92))] p-7 md:p-10"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_38%,rgba(168,132,79,0.16),transparent_42%),linear-gradient(120deg,transparent_0%,rgba(77,82,68,0.08)_60%,transparent_100%)]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background:repeating-linear-gradient(0deg,transparent,transparent_16px,rgba(255,255,255,.5)_17px)]" />

        <div className="relative grid gap-8 md:grid-cols-[1fr_auto_1.1fr] md:items-start">
          <div>
            <p className="w-fit rounded-full border border-[var(--line)] bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--gold)]">
              Reconocimientos
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-[0.95] md:text-5xl">
              Tradicion y reconocimiento gastronomico
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/78 md:text-base">
              La cocina de Flor Del Pago se apoya en una fuerte herencia italiana, interpretada por Daniel Hansen
              desde Jujuy con una mirada personal, contemporanea y profundamente ligada al territorio.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              Daniel Hansen forma parte de una tradicion culinaria ligada a la cocina italiana clasica y
              contemporanea. Su recorrido y la identidad de Flor Del Pago encuentran inspiracion en instituciones
              historicas y en una mirada personal sobre los sabores del norte argentino.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/68 md:text-base">
              Esta combinacion entre herencia, tecnica y producto local es una de las bases de la propuesta
              gastronomica del restaurante.
            </p>
            <blockquote className="mt-5 border-l border-[var(--gold)]/70 pl-4 font-serif text-2xl italic leading-snug text-white/85">
              &quot;No se trata solo de reproducir recetas italianas, sino de reinterpretarlas desde Jujuy.&quot;
            </blockquote>
          </div>

          <div className="hidden w-px self-stretch bg-gradient-to-b from-transparent via-[var(--gold)]/55 to-transparent md:block" />

          <motion.div className="grid gap-5 sm:grid-cols-2 md:grid-cols-2" style={{ y: insigniaY }}>
            {recognitions.map((item, index) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-[1.2rem] border border-[var(--line)] bg-black/25 p-5 text-center shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
              >
                <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[var(--gold)]/45 bg-[radial-gradient(circle_at_35%_30%,rgba(176,139,87,.2),rgba(0,0,0,.2))] shadow-[0_0_24px_rgba(176,139,87,0.18)]">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </div>
                <p className="mt-4 font-serif text-xl leading-tight text-[var(--ink)]">{item.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/72">{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <div className="mt-16 overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(120deg,#202020,#364130)] p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">
              Una cocina que une dos mundos
            </h2>
            <p className="mt-4 max-w-2xl text-white/80">
              La propuesta de Daniel Hansen combina tecnicas italianas refinadas con ingredientes del norte argentino
              como habas, maiz, queso de cabra, locoto, quinoa y hierbas de altura.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {philosophyChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs uppercase tracking-[0.1em] text-white/90"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/20">
            <Image
              src="/images/lugar/interior.jpg"
              alt="Ingredientes y tecnica de cocina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 35vw"
            />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="uppercase-display font-serif text-4xl leading-[0.95] md:text-5xl">Chef Signature Dishes</h2>
        <div className="mt-6 grid gap-4">
          {signatureDishes.map((dish, index) => (
            <motion.article
              key={dish.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              whileHover={{ y: -2, borderColor: "rgba(255,192,0,0.45)" }}
              className="group grid overflow-hidden rounded-[1.3rem] border border-white/15 bg-[var(--surface)] transition-colors md:grid-cols-[340px_1fr]"
            >
              <div className="relative min-h-[230px]">
                <Image src={dish.image} alt={dish.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 340px" />
                <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/10" />
              </div>
              <div className="p-6">
                <span className="rounded-full border border-[var(--gold)]/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[var(--gold)]">
                  Chef Signature
                </span>
                <h3 className="mt-3 font-serif text-3xl">{dish.name}</h3>
                <p className="mt-2 text-sm text-white/75">{dish.desc}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="relative mt-16 overflow-hidden rounded-[2rem] border border-white/15">
        <Image
          src="/chef.jpg"
          alt="Daniel Hansen trabajando en cocina"
          width={1900}
          height={760}
          className="h-[430px] w-full object-cover md:h-[520px]"
        />
        <div className="absolute inset-0 bg-black/62" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
          <blockquote className="max-w-3xl font-serif text-3xl leading-snug md:text-5xl">
            &quot;No se trata solo de cocinar. Se trata de crear un lugar al que las personas quieran volver.&quot;
          </blockquote>
          <p className="mt-4 text-sm uppercase tracking-[0.14em] text-white/75">Daniel Hansen, Chef de Flor Del Pago</p>
          <Link href="/reservas" className="mt-7">
            <Button>Reservar Mesa</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
