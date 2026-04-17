"use client";

import { motion } from "framer-motion";

type ExperienceItem = {
  title: string;
  text: string;
};

export function InteractiveExperienceGrid({ items }: { items: ExperienceItem[] }) {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      {items.map((item, index) => (
        <motion.article
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, delay: index * 0.06 }}
          whileHover={{ y: -4, backgroundColor: "#242424" }}
          whileTap={{ scale: 0.99 }}
          className="border border-white/15 bg-[var(--surface-2)] p-6 transition-colors duration-300"
        >
          <h3 className="uppercase-display font-serif text-3xl">{item.title}</h3>
          <p className="mt-3 text-[var(--muted)]">{item.text}</p>
        </motion.article>
      ))}
    </div>
  );
}
