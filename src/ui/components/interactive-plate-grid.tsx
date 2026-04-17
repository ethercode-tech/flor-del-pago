"use client";

import { motion } from "framer-motion";

type Plate = {
  name: string;
  tag: string;
  image: string;
};

export function InteractivePlateGrid({ plates }: { plates: Plate[] }) {
  return (
    <div className="mt-7 grid gap-5 md:grid-cols-3">
      {plates.map((plate, index) => (
        <motion.article
          key={plate.name}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          whileHover={{ y: -6, borderColor: "rgba(255, 192, 0, 0.7)" }}
          whileTap={{ scale: 0.99 }}
          className="group overflow-hidden border border-white/15 bg-[var(--surface)] transition-colors duration-300"
        >
          <motion.div
            className="h-56 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.72), rgba(0,0,0,0.12)), url('${plate.image}')`,
            }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
          <div className="p-5">
            <span className="text-xs uppercase tracking-[0.12em] text-[var(--gold)]">{plate.tag}</span>
            <h3 className="mt-2 font-serif text-3xl leading-tight transition-colors group-hover:text-[var(--gold)]">
              {plate.name}
            </h3>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
