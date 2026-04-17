"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/ui/components/button";

export function MobileReserveBar() {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.45 }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/20 bg-black/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div className="mx-auto flex max-w-7xl gap-2">
        <Link href="/reservas" className="flex-1">
          <Button className="w-full py-3 text-[11px]">Reservar</Button>
        </Link>
        <a
          className="flex-1"
          href="https://wa.me/543885134101?text=Hola%20Flor%20Del%20Pago,%20quiero%20reservar%20una%20mesa."
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="ghost" className="w-full py-3 text-[11px]">
            WhatsApp
          </Button>
        </a>
      </div>
    </motion.div>
  );
}
