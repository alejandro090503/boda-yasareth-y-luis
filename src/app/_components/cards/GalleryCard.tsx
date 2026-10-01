"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { useLang } from "../../_data/idioma";


/* 19 fotos en orden cronologico: de novios jovenes a la sesion de compromiso.
   El orden lo propuso `cronologia.py`; la clienta lo confirma o lo corrige. */
const fotos = Array.from({ length: 19 }, (_, i) => `/galeria/g${i + 1}.jpg`);

export default function GalleryCard() {
  const { t } = useLang();
  const [idx, setIdx] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const go = useCallback((d: number) => {
    setIdx((i) => (i + d + fotos.length) % fotos.length);
  }, []);

  // Auto-play (pausado mientras el lightbox está abierto)
  useEffect(() => {
    if (lightbox) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % fotos.length);
    }, 3800);
    return () => clearInterval(t);
  }, [lightbox]);

  return (
    <>
      <AnimatedCard className="card-olive card-arch text-center" anim="zoom">
        <Stagger>
          <p
            className="font-script mb-1"
            style={{ color: "var(--olive-primary)", fontSize: "2.6rem", lineHeight: 1.1, marginTop: "1.5rem" }}
          >
            {t.galeriaTitulo}
          </p>
        </Stagger>

        <Stagger>
          <p
            className="font-serif italic"
            style={{ color: "var(--olive-primary)", opacity: 0.85, fontSize: "1.1rem", marginBottom: "1.1rem" }}
          >
            {t.galeriaSub}
          </p>
        </Stagger>

        {/* Carrusel: una foto tipo polaroid a la vez */}
        <Stagger>
          <div className="relative mx-auto gal-marco">
            {/* Flechas laterales */}
            <button
              onClick={() => go(-1)}
              aria-label={t.fotoAnterior}
              className="carousel-arrow"
              style={{ left: -14 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button
              onClick={() => go(1)}
              aria-label={t.fotoSiguiente}
              className="carousel-arrow"
              style={{ right: -14 }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>

            {/* Marco polaroid */}
            <div
              onClick={() => setLightbox(true)}
              style={{ background: "#fdfdfb", padding: "9px 9px 22px", borderRadius: 3, boxShadow: "0 8px 22px rgba(60,55,50,0.28)", cursor: "pointer" }}
            >
              <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 5", overflow: "hidden", background: "#e8e3d9" }}>
                <AnimatePresence mode="wait" initial={false}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <motion.img
                    key={idx}
                    src={fotos[idx]}
                    alt=""
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Stagger>

        {/* Indicadores (dots) */}
        <Stagger>
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 mx-auto" style={{ maxWidth: 300, rowGap: 7 }}>
            {fotos.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`${i + 1}`}
                style={{
                  width: i === idx ? 18 : 7,
                  height: 7,
                  borderRadius: 4,
                  border: "none",
                  cursor: "pointer",
                  background: i === idx ? "var(--olive-primary)" : "var(--olive-soft)",
                  opacity: i === idx ? 0.9 : 0.4,
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </Stagger>
      </AnimatedCard>

      {/* Lightbox pantalla completa */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 200, background: "rgba(20,16,14,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", padding: 24 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setLightbox(false)}
          >
            <button onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label={t.fotoAnterior} className="lb-arrow" style={{ left: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={(e) => { e.stopPropagation(); go(1); }} aria-label={t.fotoSiguiente} className="lb-arrow" style={{ right: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 6l6 6-6 6" /></svg>
            </button>

            <motion.div
              className="relative"
              key={idx}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 220, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ background: "#fdfdfb", padding: "10px 10px 26px", borderRadius: 3, boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={fotos[idx]} alt="Foto de Yasareth y Antonio" style={{ display: "block", maxWidth: "82vw", maxHeight: "70vh", width: "auto", height: "auto", objectFit: "contain" }} />
              </div>
              <button
                onClick={() => setLightbox(false)}
                aria-label={t.cerrarFoto}
                style={{ position: "absolute", top: -16, right: -16, width: 40, height: 40, borderRadius: "50%", border: "none", cursor: "pointer", background: "var(--olive-primary)", color: "#fdfdfb", boxShadow: "0 4px 14px rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
