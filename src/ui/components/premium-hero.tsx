"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/ui/components/button";
import casona from "../../../public/la-finca.jpg";

export function PremiumHero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  return (
    <section
      ref={ref}
      className="relative min-h-[88vh] overflow-hidden md:min-h-[92vh]"
    >
      <motion.div
        className="absolute inset-0 scale-[1.02]"
        style={{
          y: imageY,
          scale: imageScale,
        }}
      >
        <Image
          src={casona}
          alt="Casona de Flor Del Pago"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-[center_34%]"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(98deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.7)_34%,rgba(0,0,0,0.48)_58%,rgba(0,0,0,0.52)_100%)] md:bg-[linear-gradient(96deg,rgba(0,0,0,0.84)_0%,rgba(0,0,0,0.62)_45%,rgba(0,0,0,0.42)_72%,rgba(0,0,0,0.5)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/22 via-black/38 to-black/72" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(168,132,79,0.2),transparent_34%)]" />

      <motion.div
        style={{ y: textY }}
        className="relative mx-auto flex min-h-[88vh] w-full max-w-7xl flex-col justify-center px-5 py-16 md:min-h-[92vh] md:px-6 md:py-20"
      >
        <h1 className="uppercase-display max-w-5xl font-serif text-4xl leading-[0.94] md:text-7xl">
          Sabores de Italia y el Norte Argentino en un refugio colonial unico
        </h1>

        <p className="mt-4 max-w-2xl text-base text-white/85 md:mt-6 md:text-lg">
          Flor Del Pago combina tecnica italiana, producto jujeno y una atmosfera nocturna de jardin para una
          experiencia gastronomica de destino.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 md:mt-8 md:gap-3">
          <Link href="/reservas">
            <Button className="w-full sm:w-auto">Reservar Mesa</Button>
          </Link>
          <Link href="/menu">
            <Button variant="ghost" className="w-full sm:w-auto">
              Ver Menu
            </Button>
          </Link>
          <Link href="/daniel-hansen">
            <Button variant="secondary" className="w-full sm:w-auto">
              Conocer al Chef
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
