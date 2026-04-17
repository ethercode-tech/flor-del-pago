import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/ui/components/button";
import { AnimatedReveal } from "@/ui/components/animated-reveal";
import { MobileReserveBar } from "@/ui/components/mobile-reserve-bar";
import {
  menuCategoriesCatalog,
  menuIngredientChips,
  seasonalRecommendations,
  signatureDishesCatalog,
} from "@/content/menu-catalog";

export const metadata: Metadata = {
  title: "Menú | Flor Del Pago",
  description:
    "Descubrí la carta de Flor Del Pago con pastas artesanales, risottos, pescados, postres y cocina ítalo-colonial.",
};

export default function MenuPage() {
  const menuSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Flor Del Pago",
    hasMenu: {
      "@type": "Menu",
      name: "Menu Flor Del Pago",
      hasMenuSection: menuCategoriesCatalog.map((category) => ({
        "@type": "MenuSection",
        name: category.title,
        hasMenuItem: category.dishes.map((dish) => ({
          "@type": "MenuItem",
          name: dish.name,
          description: dish.description,
        })),
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(menuSchema) }} />

      <section className="relative isolate min-h-[82vh] overflow-hidden">
        <Image
          src="/chef.jpg"
          alt="Menu editorial Flor Del Pago"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-[var(--bg)]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(168,132,79,0.22),transparent_45%)]" />
        <div className="relative mx-auto flex min-h-[82vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-24 md:pb-24">
          <AnimatedReveal>
            <p className="w-fit rounded-full border border-[var(--line)] bg-black/25 px-4 py-1 text-[11px] uppercase tracking-[0.16em] text-[var(--sand)]">
              Menu de autor
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.92] text-[var(--ink)] md:text-7xl">
              Menu Flor Del Pago
            </h1>
            <p className="mt-5 max-w-3xl text-base text-[var(--sand)]/88 md:text-xl">
              A journey through Italian tradition, northern Argentine ingredients, and Daniel Hansen&apos;s culinary vision.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-[var(--sand)]/90">
              {[
                "Cocina italo-colonial",
                "Pastas artesanales",
                "Productos del NOA",
                "Reservas limitadas",
              ].map((badge) => (
                <span key={badge} className="rounded-full border border-[var(--line)] bg-black/20 px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reservas">
                <Button>Reservar mesa</Button>
              </Link>
              <Link href="/experiencia">
                <Button variant="ghost">Ver experiencia</Button>
              </Link>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-7xl px-6 py-16 md:py-24">
        <AnimatedReveal>
          <div className="grid items-center gap-8 rounded-[2rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(43,40,36,.92),rgba(27,25,23,.96))] p-7 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Filosofia del menu</p>
              <h2 className="mt-3 font-serif text-4xl text-[var(--ink)] md:text-5xl">Una cocina que une Italia y el Norte Argentino</h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                La carta combina herencia italiana, producto local de estacion y oficio artesanal. Pastas hechas a mano,
                cocciones lentas y materias primas nobles en una lectura contemporanea de la identidad jujena.
              </p>
              <blockquote className="mt-6 border-l border-[var(--gold)] pl-4 font-serif text-2xl italic text-[var(--sand)]">
                &quot;Cada plato nace del cruce entre memoria, tecnica y territorio.&quot;
              </blockquote>
              <div className="mt-6 flex flex-wrap gap-2">
                {menuIngredientChips.map((chip) => (
                  <span key={chip} className="rounded-full border border-[var(--line)] bg-black/20 px-3 py-1 text-xs text-[var(--sand)]/88">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative min-h-[320px] overflow-hidden rounded-[1.6rem] border border-[var(--line)]">
              <Image
                src="/images/lugar/casona.jpg"
                alt="Chef Daniel Hansen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
          </div>
        </AnimatedReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-14 md:pb-20">
        <AnimatedReveal>
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="font-serif text-4xl md:text-5xl">Signature dishes</h2>
            <p className="max-w-md text-right text-sm text-[var(--muted)]">Platos emblema que definen el caracter de Flor Del Pago.</p>
          </div>
        </AnimatedReveal>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {signatureDishesCatalog.map((dish) => (
            <AnimatedReveal key={dish.name}>
              <article className="group overflow-hidden rounded-[1.6rem] border border-[var(--line)] bg-[var(--surface-2)] transition duration-300 hover:-translate-y-1 hover:border-[var(--gold)]/55">
                <div className="relative h-56 overflow-hidden">
                  <Image src={dish.image} alt={dish.name} fill className="object-cover transition duration-500 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-[var(--line)] bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[var(--sand)]">
                    {dish.category}
                  </div>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-2xl leading-tight">{dish.name}</h3>
                    <span className="shrink-0 text-sm text-[var(--gold)]">{dish.price}</span>
                  </div>
                  <p className="text-sm text-[var(--muted)]">{dish.description}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-[var(--sand)]/80">{dish.ingredients}</p>
                  <div className="flex flex-wrap gap-2">
                    {dish.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-[var(--line)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]/88">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimatedReveal>
          ))}
        </div>
      </section>

      <section className="sticky top-16 z-20 border-y border-[var(--line)] bg-[color:rgba(17,17,15,.88)] backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3">
          {menuCategoriesCatalog.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs uppercase tracking-[0.12em] text-[var(--sand)] transition hover:border-[var(--gold)] hover:text-[var(--gold)]"
            >
              {category.title}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-12 px-6 py-16 md:space-y-16">
        {menuCategoriesCatalog.map((category) => (
          <AnimatedReveal key={category.id}>
            <article id={category.id} className="scroll-mt-32 rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface)]/90 p-6 md:p-8">
              <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">{category.title}</p>
                  <p className="mt-3 text-sm text-[var(--muted)]">{category.intro}</p>
                  <ul className="mt-5 divide-y divide-[var(--line)]/70">
                    {category.dishes.map((dish) => (
                      <li key={dish.name} className="grid gap-3 py-3 md:grid-cols-[84px_1fr_auto] md:items-start">
                        <div className="relative h-20 w-full overflow-hidden rounded-lg border border-[var(--line)] md:w-[84px]">
                          <Image
                            src={dish.image ?? category.image}
                            alt={dish.name}
                            fill
                            sizes="84px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-serif text-2xl leading-tight">{dish.name}</p>
                          <p className="text-sm text-[var(--muted)]">{dish.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-[var(--gold)]">{dish.priceLabel ?? "Consultar"}</p>
                          {dish.highlight ? (
                            <span className="mt-1 inline-block rounded-full border border-[var(--line)] px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[var(--sand)]/80">
                              Recomendado
                            </span>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-[320px] overflow-hidden rounded-[1.2rem] border border-[var(--line)]">
                  <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
                </div>
              </div>
            </article>
          </AnimatedReveal>
        ))}
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16">
        <AnimatedReveal>
          <div className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(120deg,rgba(77,82,68,.28),rgba(27,25,23,.95))] p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Recomendaciones de temporada</p>
            <h2 className="mt-3 font-serif text-4xl">Productos en su mejor momento</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {seasonalRecommendations.map((dish) => (
                <article key={dish} className="rounded-2xl border border-[var(--line)] bg-black/25 p-4">
                  <p className="font-serif text-2xl">{dish}</p>
                  <p className="mt-2 text-sm text-[var(--muted)]">Seleccion del chef para esta temporada.</p>
                </article>
              ))}
            </div>
          </div>
        </AnimatedReveal>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-16">
        <AnimatedReveal>
          <div className="grid gap-6 rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface)] p-7 md:grid-cols-[0.95fr_1.05fr] md:p-9">
            <div className="relative min-h-[320px] overflow-hidden rounded-[1.2rem] border border-[var(--line)]">
              <Image
                src="/platos/postre.jpg"
                alt="Postres Flor Del Pago"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Postres</p>
              <h2 className="mt-3 font-serif text-5xl">El final perfecto</h2>
              <ul className="mt-5 space-y-3">
                {menuCategoriesCatalog
                  .find((category) => category.id === "postres")
                  ?.dishes.map((dish) => (
                    <li key={dish.name} className="flex items-start justify-between gap-2 border-b border-[var(--line)]/70 pb-2">
                      <p className="font-serif text-2xl">{dish.name}</p>
                      <p className="text-sm text-[var(--gold)]">{dish.priceLabel ?? "Consultar"}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </AnimatedReveal>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="relative h-[420px] w-full">
          <Image
            src="/images/lugar/interior.jpg"
            alt="Mesa con velas y copas de vino"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/55" />
          <div className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col justify-center px-6">
            <h2 className="max-w-3xl font-serif text-4xl text-[var(--ink)] md:text-6xl">Cada plato se disfruta mejor en Flor Del Pago</h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--sand)]/90 md:text-lg">
              Reserva con anticipacion y vivi una de las experiencias gastronomicas mas especiales de Jujuy.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/reservas">
                <Button>Reservar mesa</Button>
              </Link>
              <Link href="/experiencia">
                <Button variant="ghost">Ver experiencia</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <MobileReserveBar />
    </>
  );
}

