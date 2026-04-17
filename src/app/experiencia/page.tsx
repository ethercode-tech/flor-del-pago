import type { Metadata } from "next";
import { ExperiencePremiumSection } from "@/ui/components/experience-premium-section";

export const metadata: Metadata = {
  title: "Experiencia | Flor Del Pago",
  description:
    "Jardines, cocina de autor, cenas especiales y una experiencia gastronómica única en Lozano.",
};

export default function ExperiencePage() {
  return <ExperiencePremiumSection />;
}
