import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/ui/components/app-shell";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://flordelpago.com");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Flor Del Pago | Cocina Ítalo-Colonial en Lozano",
    template: "%s | Flor Del Pago",
  },
  description:
    "Flor Del Pago combina cocina italiana, sabores del norte argentino y una experiencia gastronómica única en Lozano, Jujuy.",
  keywords: [
    "Flor Del Pago",
    "restaurant Lozano",
    "restaurant Jujuy",
    "cocina italiana Jujuy",
    "chef Daniel Hansen",
    "restaurante premium Jujuy",
    "reservas restaurante Lozano",
    "cocina ítalo colonial",
    "restaurante para eventos Jujuy",
    "restaurante Purmamarca camino",
  ],
  authors: [{ name: "Flor Del Pago" }],
  creator: "Flor Del Pago",
  publisher: "Flor Del Pago",
  openGraph: {
    title: "Flor Del Pago | Cocina Ítalo-Colonial en Lozano",
    description: "Sabores de Italia y el norte argentino en un refugio colonial único.",
    url: SITE_URL,
    siteName: "Flor Del Pago",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/og/flor-del-pago-casona-v2.jpg",
        width: 1200,
        height: 630,
        alt: "Flor Del Pago, cocina ítalo-colonial en Lozano",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flor Del Pago | Cocina Ítalo-Colonial en Lozano",
    description: "Sabores de Italia y el norte argentino en un refugio colonial único.",
    images: ["/og/flor-del-pago-casona-v2.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning />
      <body className="min-h-full" suppressHydrationWarning>
        <AppShell>{children}</AppShell>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Flor Del Pago",
              image: `${SITE_URL}/og/flor-del-pago-casona-v2.jpg`,
              url: SITE_URL,
              telephone: "+54 388 513-4101",
              address: {
                "@type": "PostalAddress",
                streetAddress: "José Quintana 7",
                addressLocality: "Lozano",
                addressRegion: "Jujuy",
                addressCountry: "AR",
              },
              servesCuisine: ["Italian", "Argentinian"],
              priceRange: "$$$",
              acceptsReservations: "True",
            }),
          }}
        />
      </body>
    </html>
  );
}
