"use client";

import { motion } from "framer-motion";
import { useLang } from "../../_data/idioma";


export default function VerseCard() {
  const { t } = useLang();
  return (
    <motion.section
      className="w-[88vw] max-w-[380px] mx-auto text-center mb-12 px-4"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex justify-center mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/sobre-motivo-chico.png" alt="" style={{ width: 120, opacity: 0.75 }} />
      </div>
      <p
        className="font-serif italic"
        style={{ color: "var(--ink-dark)", fontSize: "1.45rem", lineHeight: 1.8 }}
      >
        &ldquo;{t.versiculo}&rdquo;
      </p>

      {/* La cita, en versalitas doradas bajo el texto */}
      <p
        className="font-sans-label mt-4"
        style={{
          color: "var(--gold-antique)",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.26em",
        }}
      >
        {t.versiculoCita}
      </p>
    </motion.section>
  );
}
