"use client";

import { motion } from "framer-motion";
import type { Lang } from "../_data/idioma";

/**
 * Primera pantalla: el invitado elige idioma antes de ver el sobre.
 *
 * Usa la misma estetica que el resto: marmol azul de fondo, tarjeta de papel
 * marfil con el marco doble (filete de champan por fuera, hairline azul por
 * dentro) y el monograma S&A en caligrafia.
 *
 * Cada opcion se escribe en SU idioma ("Espanol" / "English"): un invitado que
 * solo habla ingles debe poder reconocer la suya sin leer la otra.
 */
export default function LangGate({ onPick }: { onPick: (l: Lang) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg-cream)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* el marmol de fondo, igual que en el resto de la invitacion */}
      <div className="absolute inset-0 gate-marmol" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(248,244,236,0.40) 0%, rgba(248,244,236,0.18) 55%, rgba(248,244,236,0.36) 100%)",
        }}
      />

      <motion.div
        className="relative w-full max-w-[340px] text-center"
        style={{
          padding: "3rem 1.75rem 2.5rem",
          backgroundColor: "var(--bg-cream)",
          backgroundImage: "url('/paper-linen.jpg')",
          backgroundBlendMode: "luminosity",
          backgroundSize: "cover",
          borderRadius: 3,
          boxShadow: "0 18px 48px rgba(16,28,44,.28)",
        }}
        initial={{ opacity: 0, y: 26, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      >
        {/* marco doble */}
        <span
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ inset: 7, border: "1.4px solid var(--gold-antique)", borderRadius: 2 }}
        />
        <span
          aria-hidden="true"
          className="absolute pointer-events-none"
          style={{ inset: 12, border: "0.75px solid var(--green-line)", opacity: 0.75, borderRadius: 1 }}
        />

        <p className="font-script foil" style={{ fontSize: "3.1rem", lineHeight: 1 }}>
          S &amp; A
        </p>

        <div className="foil-rule" style={{ width: 84, margin: "1rem auto 1.25rem" }} />

        {/* El titulo va en los dos idiomas para que nadie se quede fuera. */}
        <p
          className="font-serif italic"
          style={{ color: "var(--ink-dark)", fontSize: "1.24rem", lineHeight: 1.5 }}
        >
          Elige tu idioma
        </p>
        <p
          className="font-serif italic"
          style={{ color: "var(--terracotta)", fontSize: "1.1rem", lineHeight: 1.5, marginTop: "0.1rem" }}
        >
          Choose your language
        </p>

        <div className="flex flex-col gap-3 mt-7">
          <button type="button" className="lang-btn" onClick={() => onPick("es")} lang="es">
            Espa&ntilde;ol
          </button>
          <button type="button" className="lang-btn" onClick={() => onPick("en")} lang="en">
            English
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
