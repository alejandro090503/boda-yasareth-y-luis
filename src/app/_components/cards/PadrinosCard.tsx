"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


// Los cinco grupos de padrinos, tal como los entrego el cliente.
const PAREJAS = [
  { el: "José Guadalupe Acoltzi Ahuatzi", ella: "Araceli Díaz Ahuactzi" },
  { el: "Ian Carlos Badillo Hernández", ella: "Karla Erika Dergal Calderón" },
  { el: "Abel Lemus Ramos", ella: "Magali Lozano Ramírez" },
  { el: "Luis Mario Tlapale Ramírez", ella: "Guadalupe Ahuatzi Reyes" },
  { el: "Martín Gutiérrez Flores", ella: "Guadalupe Ramírez Jiménez" },
];

/**
 * Los padrinos pasan de a uno, como la galeria: flechas a los lados, puntos
 * abajo y un cambio automatico cada 4.5 s. Con cinco parejas, la lista
 * completa hacia una tarjeta larguisima; asi cada pareja tiene su momento.
 *
 * El auto-avance se detiene en cuanto el invitado toca una flecha o un punto,
 * para que no se le mueva el nombre que esta leyendo.
 */
export default function PadrinosCard() {
  const { t } = useLang();
  const grupos = [
    { titulo: t.velacion, ...PAREJAS[0] },
    { titulo: t.anillos, ...PAREJAS[1] },
    { titulo: t.arras, ...PAREJAS[2] },
    { titulo: t.lazo, ...PAREJAS[3] },
    { titulo: t.bibliaRosario, ...PAREJAS[4] },
  ];

  const [idx, setIdx] = useState(0);
  const [manual, setManual] = useState(false);

  const ir = useCallback((d: number) => {
    setManual(true);
    setIdx((i) => (i + d + grupos.length) % grupos.length);
  }, [grupos.length]);

  useEffect(() => {
    if (manual) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % grupos.length);
    }, 4500);
    return () => clearInterval(id);
  }, [manual, grupos.length]);

  const g = grupos[idx];

  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="slideLeft">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.padrinosEyebrow}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={96} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <div className="relative mx-auto" style={{ maxWidth: 320 }}>
          <button
            onClick={() => ir(-1)}
            aria-label={t.padrinoAnterior}
            className="carousel-arrow"
            style={{ left: -16 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            onClick={() => ir(1)}
            aria-label={t.padrinoSiguiente}
            className="carousel-arrow"
            style={{ right: -16 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
          </button>

          {/* Alto fijo: si la tarjeta creciera y encogiera con cada pareja,
              la pagina daria un brinco en cada cambio. */}
          <div style={{ minHeight: 210, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 0.5rem" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{ width: "100%" }}
              >
                <p
                  className="font-script"
                  style={{ color: "var(--olive-primary)", fontSize: "2.5rem", lineHeight: 1.05 }}
                >
                  {g.titulo}
                </p>

                <p
                  className="font-serif font-semibold mt-3"
                  style={{ color: "var(--ink-dark)", fontSize: "1.35rem", lineHeight: 1.45 }}
                >
                  {g.el}
                </p>
                <p
                  className="font-script my-0.5"
                  style={{ color: "var(--gold-antique)", fontSize: "1.7rem", lineHeight: 1 }}
                >
                  &amp;
                </p>
                <p
                  className="font-serif font-semibold"
                  style={{ color: "var(--ink-dark)", fontSize: "1.35rem", lineHeight: 1.45 }}
                >
                  {g.ella}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Stagger>

      <Stagger>
        <div className="flex items-center justify-center gap-1.5 mt-4">
          {grupos.map((gr, i) => (
            <button
              key={gr.titulo}
              onClick={() => { setManual(true); setIdx(i); }}
              aria-label={gr.titulo}
              style={{
                width: i === idx ? 18 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                background: i === idx ? "var(--gold-antique)" : "var(--olive-soft)",
                opacity: i === idx ? 0.95 : 0.4,
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
