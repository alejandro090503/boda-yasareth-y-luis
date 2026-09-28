"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLang } from "../../_data/idioma";


/**
 * Portada a pantalla completa con la foto que eligio el cliente, al estilo de
 * la invitacion que mando de referencia: foto de fondo, velo degradado y los
 * nombres en caligrafia encima.
 *
 * El paso a la primera tarjeta no es un corte: la foto se disuelve con una
 * mascara hacia abajo, que deja ver el marmol del fondo (es una capa fija del
 * body), y ademas al hacer scroll la portada entera se apaga y sube un poco
 * mientras la invitacion entra por debajo.
 */

/* La mascara va en la capa de la FOTO, no en la seccion: si se aplicara a la
   seccion recortaria tambien el velo y los nombres. */
const MASCARA =
  "linear-gradient(to bottom, #000 0%, #000 56%, rgba(0,0,0,.86) 72%, rgba(0,0,0,.45) 87%, rgba(0,0,0,0) 100%)";

export default function CoverCard() {
  const { t } = useLang();
  const seccion = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end start"],
  });

  // la foto se va con el scroll; el texto se desvanece antes que ella
  const fotoOpacidad = useTransform(scrollYProgress, [0, 0.78], [1, 0]);
  const fotoY = useTransform(scrollYProgress, [0, 1], ["0%", "11%"]);
  const fotoEscala = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const textoOpacidad = useTransform(scrollYProgress, [0, 0.42], [1, 0]);
  const textoY = useTransform(scrollYProgress, [0, 0.6], [0, -38]);

  return (
    <section
      ref={seccion}
      className="relative w-full"
      style={{ height: "100dvh", overflow: "hidden" }}
    >
      <motion.div
        className="absolute inset-0 cover-foto"
        style={{
          maskImage: MASCARA,
          WebkitMaskImage: MASCARA,
          opacity: fotoOpacidad,
          y: fotoY,
          scale: fotoEscala,
        }}
      />

      {/* Velo: arriba casi limpio para que se vea la foto; abajo se apaga junto
          con ella y entrega el marmol del fondo sin ningun borde duro. */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom," +
            "rgba(16,34,64,0.12) 0%," +
            "rgba(16,34,64,0.08) 30%," +
            "rgba(16,34,64,0.46) 55%," +
            "rgba(16,34,64,0.72) 72%," +
            "rgba(16,34,64,0.78) 86%," +
            "rgba(16,34,64,0.30) 95%," +
            "rgba(16,34,64,0) 100%)",
          opacity: fotoOpacidad,
        }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 px-7 pb-[4.5vh] text-center"
        style={{ opacity: textoOpacidad, y: textoY }}>
        <motion.p
          className="font-sans-label"
          style={{ color: "#F3DFAE", fontSize: "clamp(0.74rem, 1vw, 0.95rem)", fontWeight: 600, letterSpacing: "0.34em" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: "easeOut" }}
        >
          {t.portadaEyebrow}
        </motion.p>

        <motion.h1
          className="font-script"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(2.9rem, 14.5vw, 6.4rem)",
            lineHeight: 1.02,
            margin: "0.35rem 0 0",
            textShadow: "0 3px 26px rgba(12,28,52,0.55)",
          }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: "easeOut" }}
        >
          Antonio
        </motion.h1>

        <motion.p
          className="font-script foil"
          style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: 1, margin: "0 0 0.1rem" }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
        >
          &amp;
        </motion.p>

        <motion.h1
          className="font-script"
          style={{
            color: "#FFFFFF",
            fontSize: "clamp(2.9rem, 14.5vw, 6.4rem)",
            lineHeight: 1.02,
            marginBottom: "1rem",
            textShadow: "0 3px 26px rgba(12,28,52,0.55)",
          }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.1, ease: "easeOut" }}
        >
          Yasareth
        </motion.h1>

        <motion.p
          className="font-script"
          style={{
            color: "#F5E3B8",
            fontSize: "clamp(1.55rem, 6.4vw, 2.3rem)",
            lineHeight: 1,
            margin: "0 0 0.85rem",
            textShadow: "0 2px 18px rgba(12,28,52,0.55)",
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: "easeOut" }}
        >
          {t.portadaNosCasamos}
        </motion.p>


        <motion.p
          className="font-serif italic"
          style={{ color: "rgba(255,255,255,0.92)", fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)", marginTop: "0.85rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.9 }}
        >
          {t.ciudad}
        </motion.p>
      </motion.div>
    </section>
  );
}
