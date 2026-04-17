import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MobileReserveBar } from "@/ui/components/mobile-reserve-bar";

export const metadata: Metadata = {
  title: "Contacto y ubicación | Flor Del Pago",
  description:
    "Encontrá Flor Del Pago en Lozano, Jujuy. Horarios, mapa, reservas y cómo llegar.",
  openGraph: {
    title: "Contacto y ubicación | Flor Del Pago",
    description:
      "Encontrá Flor Del Pago en Lozano, Jujuy. Horarios, mapa, reservas y cómo llegar.",
    images: [
      {
        url: "/og/flor-del-pago-casona-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Flor Del Pago, cocina ítalo-colonial en Lozano",
      },
    ],
  },
};

export default function ContactPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Flor Del Pago",
    image:
      "https://flordelpago.com/images/lugar/casona.jpg",
    servesCuisine: ["Italian", "Argentine", "NOA Fusion"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jose Quintana 7",
      addressLocality: "Lozano",
      addressRegion: "Jujuy",
      postalCode: "Y4616",
      addressCountry: "AR",
    },
    telephone: "+54 388 513-4101",
    url: "https://flordelpago.com",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "12:30",
        closes: "15:30",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "20:00",
        closes: "23:00",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="relative isolate min-h-[78vh] overflow-hidden">
        <Image
          src="/images/lugar/casona.jpg"
          alt="Entrada de Flor Del Pago"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-[var(--bg)]/92" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_22%,rgba(168,132,79,0.24),transparent_42%)]" />

        <div className="relative mx-auto flex min-h-[78vh] w-full max-w-7xl flex-col justify-end px-6 pb-16 pt-24 md:pb-24">
          <p className="w-fit rounded-full border border-[var(--line)] bg-black/30 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[var(--sand)]/90">
            Contacto
          </p>
          <h1 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.92] text-[var(--ink)] md:text-7xl">
            Encontranos en Lozano
          </h1>
          <p className="mt-4 max-w-3xl text-sm text-[var(--sand)]/90 md:text-lg">
            Flor Del Pago esta a pocos minutos de San Salvador de Jujuy, en un entorno sereno de jardines,
            casona colonial y cocina de destino.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/reservas"
              className="rounded-full bg-[var(--gold)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition hover:bg-[var(--gold-hover)]"
            >
              Reservar mesa
            </Link>
            <a
              href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-[var(--line)] bg-black/20 px-5 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--gold)]"
            >
              Abrir ubicacion
            </a>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-xs uppercase tracking-[0.12em] text-[var(--sand)]/85">
            {["Lozano, Jujuy", "Martes a Domingo", "Reservas recomendadas"].map((badge) => (
              <span key={badge} className="rounded-full border border-[var(--line)] bg-black/25 px-3 py-1">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-14 md:py-18">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
          <article className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(130deg,rgba(43,40,36,.9),rgba(27,25,23,.96))] p-7 md:p-9">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--gold)]">Ubicacion y reservas</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl">Una salida especial, sin complicaciones</h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
              Flor Del Pago se encuentra en Jose Quintana 7, Lozano, a 10-15 minutos de San Salvador de Jujuy por
              Ruta 9. El acceso es directo y el estacionamiento es amplio.
            </p>

            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-2">
              <div>
                <dt className="text-xs uppercase tracking-[0.13em] text-[var(--gold)]">Direccion</dt>
                <dd className="mt-1 text-[var(--sand)]/90">Jose Quintana 7, Y4616 Lozano</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.13em] text-[var(--gold)]">WhatsApp</dt>
                <dd className="mt-1 text-[var(--sand)]/90">+54 388 513-4101</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.13em] text-[var(--gold)]">Instagram</dt>
                <dd className="mt-1 text-[var(--sand)]/90">@flordelpago.jujuy</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.13em] text-[var(--gold)]">Horario</dt>
                <dd className="mt-1 text-[var(--sand)]/90">Martes a Domingo</dd>
              </div>
            </dl>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago%2C%20quiero%20reservar%20una%20mesa."
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-[var(--olive)] px-4 py-2 text-sm text-[var(--sand)] transition hover:bg-[var(--olive-light)]"
              >
                Reservar por WhatsApp
              </a>
              <a
                href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--sand)] transition hover:border-[var(--gold)]"
              >
                Como llegar
              </a>
            </div>
          </article>

          <article className="overflow-hidden rounded-[1.8rem] border border-[var(--line)] bg-[var(--surface)] shadow-[0_18px_40px_rgba(0,0,0,0.25)]">
            <div className="border-b border-[var(--line)] bg-black/20 px-6 py-4">
              <h3 className="font-serif text-2xl">Mapa y contexto</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">A minutos de la ciudad, ideal para almuerzo o cena de destino.</p>
            </div>
            <iframe
              title="Mapa Flor Del Pago"
              src="https://www.google.com/maps?q=Jose+Quintana+7,+Lozano,+Jujuy&output=embed"
              className="h-[430px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex flex-wrap gap-3 border-t border-[var(--line)] p-5">
              <a
                href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-[var(--sand)] transition hover:border-[var(--gold)]"
              >
                Abrir en Google Maps
              </a>
              <Link
                href="/reservas"
                className="rounded-full bg-[var(--gold)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition hover:bg-[var(--gold-hover)]"
              >
                Reservar ahora
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <h2 className="font-serif text-4xl md:text-5xl">Como llegar</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {[
            {
              title: "Desde San Salvador de Jujuy",
              text: "A solo unos minutos por Ruta 9 con acceso rapido y directo.",
              image:
                "/images/lugar/experiencia1.jpg",
            },
            {
              title: "Camino a la Quebrada",
              text: "Parada gastronomica ideal rumbo a Purmamarca o Tilcara.",
              image:
                "/images/lugar/casona.jpg",
            },
            {
              title: "Estacionamiento y confort",
              text: "Espacio amplio para estacionar y llegada comoda para familias.",
              image:
                "/images/lugar/experiencia1.jpg",
            },
          ].map((item) => (
            <article key={item.title} className="group relative min-h-[260px] overflow-hidden rounded-[1.2rem] border border-[var(--line)]">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-serif text-3xl leading-[0.95] text-[var(--ink)]">{item.title}</h3>
                <p className="mt-2 text-sm text-[var(--sand)]/88">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--gold)]">Almuerzo</p>
            <h3 className="mt-2 font-serif text-3xl">Martes a Domingo</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">12:30 a 15:30</p>
          </article>
          <article className="rounded-[1.2rem] border border-[var(--line)] bg-[var(--surface)] p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--gold)]">Cena</p>
            <h3 className="mt-2 font-serif text-3xl">Martes a Sabado</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">20:00 a 23:00</p>
          </article>
          <article className="rounded-[1.2rem] border border-[var(--gold)]/45 bg-[linear-gradient(120deg,rgba(168,132,79,.16),rgba(27,25,23,.92))] p-6">
            <p className="text-xs uppercase tracking-[0.15em] text-[var(--gold)]">Alta demanda</p>
            <h3 className="mt-2 font-serif text-3xl">Fines de semana</h3>
            <p className="mt-2 text-sm text-[var(--sand)]/88">Las mesas suelen agotarse. Reserva con varios dias de anticipacion.</p>
          </article>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 pb-14">
        <div className="rounded-[1.8rem] border border-[var(--line)] bg-[linear-gradient(135deg,rgba(77,82,68,.2),rgba(27,25,23,.96))] p-7 md:p-9">
          <h2 className="font-serif text-4xl md:text-5xl">Preguntas frecuentes</h2>
          <p className="mt-3 max-w-2xl text-sm text-[var(--muted)] md:text-base">
            Informacion util para que planifiques tu visita sin fricciones.
          </p>

          <div className="mt-6 space-y-3">
            {[
              {
                question: "Es necesario reservar?",
                answer: "Si, especialmente viernes y sabados por la noche.",
              },
              {
                question: "Hay mesas al aire libre?",
                answer: "Si, contamos con jardin y galeria, segun disponibilidad.",
              },
              {
                question: "Que pasa si llueve?",
                answer: "Reasignamos prioridad a interiores y galeria techada.",
              },
              {
                question: "Aceptan tarjetas?",
                answer: "Si, aceptamos tarjetas de credito y debito.",
              },
              {
                question: "Hay estacionamiento?",
                answer: "Si, estacionamiento amplio para autos y camionetas.",
              },
              {
                question: "Tienen opciones vegetarianas?",
                answer: "Si, ofrecemos opciones vegetarianas de temporada.",
              },
            ].map((item) => (
              <details key={item.question} className="group rounded-xl border border-[var(--line)] bg-black/20 p-4 transition hover:border-[var(--gold)]/50">
                <summary className="cursor-pointer list-none text-base font-medium text-[var(--ink)]">
                  <span className="mr-2 text-[var(--gold)]">○</span>
                  {item.question}
                  <span className="float-right text-[var(--muted)] transition group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 pl-5 text-sm text-[var(--muted)]">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <div className="relative h-[430px] w-full">
          <Image
            src="/images/lugar/interior.jpg"
            alt="Cena en Flor Del Pago"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/62 to-black/48" />
          <div className="absolute inset-0 mx-auto flex w-full max-w-7xl flex-col justify-center px-6">
            <h2 className="max-w-4xl font-serif text-4xl text-[var(--ink)] md:text-6xl">
              Tu proxima salida especial esta mas cerca de lo que imaginas
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-[var(--sand)]/90 md:text-lg">
              Reserva con anticipacion y vivi una de las experiencias gastronomicas mas especiales de Jujuy.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/reservas"
                className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-[var(--bg)] transition hover:bg-[var(--gold-hover)]"
              >
                Reservar mesa
              </Link>
              <a
                href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--line)] bg-black/20 px-6 py-3 text-sm text-[var(--sand)] transition hover:border-[var(--gold)]"
              >
                Abrir ubicacion
              </a>
            </div>
          </div>
        </div>
      </section>

      <MobileReserveBar />
    </>
  );
}
