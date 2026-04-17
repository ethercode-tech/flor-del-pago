import type { Metadata } from "next";
import { ChefPremiumSection } from "@/ui/components/chef-premium-section";

export const metadata: Metadata = {
  title: "Chef Daniel Hansen | Flor Del Pago",
  description:
    "Conocé la historia, trayectoria y visión gastronómica de Daniel Hansen, chef de Flor Del Pago.",
};

export default function DanielHansenPage() {
  return <ChefPremiumSection />;
}
