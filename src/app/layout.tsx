import type { Metadata } from "next";
import { Pinyon_Script, Jost, Cormorant } from "next/font/google";
import "./globals.css";
import { FECHA_PUNTEADA, FECHA_LARGA } from "./_data/fecha";

// Caligrafía copperplate para los nombres (idéntica a la referencia del cliente)
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
});

// Serif elegante para textos de datos/cuerpo (nombres, hora, frases, botones)
const serif = Cormorant({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

// Sans fino solo para eyebrows/labels en mayúsculas espaciadas
const sans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://boda-yasareth-y-luis.vercel.app"),
  title: `Yasareth & Antonio — ${FECHA_PUNTEADA}`,
  description:
    `Con la bendición de Dios y de nuestras familias, Yasareth y Antonio los invitan a celebrar su boda. ${FECHA_LARGA}, Guadalupe Ixcotla, Tlaxcala.`,
  openGraph: {
    title: "Yasareth & Antonio — Nuestra Boda",
    description: `${FECHA_LARGA} · Guadalupe Ixcotla, Tlaxcala`,
    type: "website",
    locale: "es_MX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${script.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
