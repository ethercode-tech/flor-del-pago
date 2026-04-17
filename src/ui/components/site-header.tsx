"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AtSign, MapPin, Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/ui/components/button";

const links = [
  { href: "/menu", label: "Menú" },
  { href: "/experiencia", label: "Experiencia" },
  { href: "/daniel-hansen", label: "Daniel Hansen" },
  { href: "/reservas", label: "Reservas" },
  { href: "/contacto", label: "Contacto" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 border-b transition-all duration-300 ${
          scrolled
            ? "border-[var(--line)]/80 bg-[rgba(17,17,15,.92)] shadow-[0_14px_30px_rgba(0,0,0,.28)] backdrop-blur-xl"
            : "border-[var(--line)]/45 bg-[rgba(17,17,15,.72)] backdrop-blur-md"
        }`}
      >
        <div
          className={`mx-auto grid w-full max-w-7xl grid-cols-[1fr_auto] items-center gap-3 px-5 text-[var(--ink)] transition-all duration-300 md:grid-cols-[auto_1fr_auto] md:px-7 ${
            scrolled ? "py-2.5" : "py-3.5"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-black/15 text-[var(--sand)] transition hover:border-[var(--gold)] md:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={18} />
            </button>
            <Link href="/" className="font-serif text-lg uppercase tracking-[0.12em] md:text-xl">
              Flor Del Pago
            </Link>
          </div>

          <nav className="hidden items-center justify-center gap-7 text-xs uppercase tracking-[0.16em] text-[var(--sand)]/88 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 transition hover:text-[var(--ink)]"
              >
                {link.label}
                <span className="absolute -bottom-[2px] left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 md:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-black/20 px-2 py-1.5 md:flex">
              <a
                href="https://instagram.com/flordelpago.jujuy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--sand)]/90 transition hover:bg-[var(--olive)]/30 hover:text-[var(--ink)]"
                aria-label="Instagram"
              >
                <AtSign size={14} />
              </a>
              <a
                href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago%2C%20quiero%20reservar%20una%20mesa."
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--sand)]/90 transition hover:bg-[var(--olive)]/30 hover:text-[var(--ink)]"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
              <a
                href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--sand)]/90 transition hover:bg-[var(--olive)]/30 hover:text-[var(--ink)]"
                aria-label="Ubicacion"
              >
                <MapPin size={14} />
              </a>
              <span className="ml-1 border-l border-[var(--line)] pl-2 text-[10px] uppercase tracking-[0.14em] text-[var(--muted)]">
                Lozano
              </span>
            </div>

            <Link href="/reservas">
              <Button
                variant="default"
                className="h-9 rounded-full bg-[var(--gold)] px-3 text-[10px] uppercase tracking-[0.14em] text-[var(--bg)] hover:bg-[var(--gold-hover)] md:h-10 md:px-5 md:text-[11px]"
              >
                Reservar
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-50 bg-[rgba(12,12,11,.82)] backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          mobileOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMobileOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-[86%] max-w-sm border-l border-[var(--line)] bg-[linear-gradient(170deg,rgba(32,28,25,.98),rgba(23,21,19,.98))] p-6 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="font-serif text-lg uppercase tracking-[0.12em]">Flor Del Pago</p>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--sand)]"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menu"
            >
              <X size={16} />
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-[var(--line)]/70 pb-3 font-serif text-3xl text-[var(--ink)]"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 flex items-center gap-3">
            <a
              href="https://instagram.com/flordelpago.jujuy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-black/20 text-[var(--sand)]"
              aria-label="Instagram"
            >
              <AtSign size={16} />
            </a>
            <a
              href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago%2C%20quiero%20reservar%20una%20mesa."
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-black/20 text-[var(--sand)]"
              aria-label="WhatsApp"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href="https://maps.google.com/?q=Jose+Quintana+7,+Lozano,+Jujuy"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-black/20 text-[var(--sand)]"
              aria-label="Ubicacion"
            >
              <MapPin size={16} />
            </a>
          </div>

          <Link href="/reservas" className="mt-8 block" onClick={() => setMobileOpen(false)}>
            <Button
              variant="default"
              className="h-11 w-full rounded-full bg-[var(--gold)] text-[11px] uppercase tracking-[0.14em] text-[var(--bg)] hover:bg-[var(--gold-hover)]"
            >
              Reservar mesa
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

