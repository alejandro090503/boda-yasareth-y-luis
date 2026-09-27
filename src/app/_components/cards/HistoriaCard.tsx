"use client";

import { motion } from "framer-motion";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/**
 * El parrafo que escribieron los novios, justo despues de la portada.
 *
 * Va suelto sobre el marmol del fondo (sin tarjeta de papel) para que sea lo
 * primero que se lee al terminar la foto: la portada se disuelve y el texto
 * aparece sobre el mismo fondo, sin un borde que corte la entrada.
 */
export default function HistoriaCard() {
  const { t } = useLang();
  return (
    <motion.section
      className="w-[88vw] max-w-[390px] mx-auto text-center mb-12 px-3"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <motion.p
        className="font-sans-label"
        style={{
          color: "var(--gold-antique)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.3em",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.8 }}
      >
        {t.historiaEyebrow}
      </motion.p>

      <div className="flex justify-center mt-3 mb-5">
        <OliveBranch width={104} color="var(--green-line)" />
      </div>

      <motion.p
        className="font-serif"
        style={{
          color: "var(--ink-dark)",
          fontSize: "1.32rem",
          lineHeight: 1.75,
          textWrap: "pretty",
        }}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
      >
        {t.historia}
      </motion.p>

      <motion.div
        className="mx-auto mt-6 foil-rule"
        style={{ width: 132 }}
        initial={{ opacity: 0, scaleX: 0.3 }}
        whileInView={{ opacity: 0.9, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.9, ease: "easeOut" }}
      />
    </motion.section>
  );
}
