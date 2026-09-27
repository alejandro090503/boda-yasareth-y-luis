"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/* PENDIENTE: datos bancarios de los novios. Mientras esten vacios esta
   tarjeta NO se renderiza (ver InvitationClient), para que nadie
   transfiera a una cuenta equivocada. */
const BANCO = "";
const TITULAR = "";
const CUENTAS: string[] = [];

const EASE = [0.22, 0.61, 0.36, 1] as const;

function Copiar({ valor }: { valor: string }) {
  const { t } = useLang();
  const [copiado, setCopiado] = useState(false);

  const copiar = useCallback(async () => {
    const limpio = valor.replace(/\s/g, "");
    try {
      await navigator.clipboard.writeText(limpio);
    } catch {
      /* navegadores sin permiso de portapapeles: se copia a la vieja usanza */
      const ta = document.createElement("textarea");
      ta.value = limpio;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        /* si tampoco se puede, el numero sigue visible para copiarlo a mano */
      }
      ta.remove();
    }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  }, [valor]);

  return (
    <button type="button" onClick={copiar} className="gb-copy" aria-label={`${t.copiar} ${valor}`}>
      {copiado ? (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          {t.copiado}
        </>
      ) : (
        <>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="9" y="9" width="12" height="12" rx="2" />
            <path d="M5 15V5a2 2 0 0 1 2-2h10" />
          </svg>
          {t.copiar}
        </>
      )}
    </button>
  );
}

export default function GiftBoxCard() {
  const { t } = useLang();
  const cuentas = [
    { etiqueta: t.cuenta, valor: CUENTAS[0] },
    { etiqueta: t.clabe, valor: CUENTAS[1] },
  ];
  const [abierto, setAbierto] = useState(false);

  // con el detalle abierto no se puede hacer scroll detras
  useEffect(() => {
    if (!abierto) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = previo;
      window.removeEventListener("keydown", esc);
    };
  }, [abierto]);

  return (
    <>
      <AnimatedCard className="tex-fiber text-center py-9" anim="zoom">
        <Stagger>
          <p
            className="font-sans-label"
            style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
          >
            {t.transfEyebrow}
          </p>
        </Stagger>

        <Stagger>
          <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.05 }}>
            {t.transfTitulo}
          </p>
        </Stagger>

        <Stagger>
          <div className="flex justify-center my-2">
            <OliveBranch width={100} color="var(--green-line)" />
          </div>
        </Stagger>

        <Stagger>
          <p
            className="font-serif italic mx-auto px-2"
            style={{ color: "var(--ink-dark)", fontSize: "1.22rem", lineHeight: 1.6, maxWidth: "310px" }}
          >
            {t.transfSub}
          </p>
        </Stagger>

        <Stagger>
          <button type="button" className="gb-box" onClick={() => setAbierto(true)} aria-label={t.transfAbrir}>
            <svg viewBox="0 0 200 186" aria-hidden="true">
              <defs>
                {/* Papel marfil con el mismo grano que el resto de la invitacion */}
                <linearGradient id="gbPaper" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFDF8" />
                  <stop offset="55%" stopColor="#F4EEE2" />
                  <stop offset="100%" stopColor="#E7DECE" />
                </linearGradient>
                {/* Cinta de champan con reflejo metalico */}
                <linearGradient id="gbRibbon" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#8C6F43" />
                  <stop offset="26%" stopColor="#D9BE8A" />
                  <stop offset="48%" stopColor="#F3DFAE" />
                  <stop offset="68%" stopColor="#C9A96E" />
                  <stop offset="100%" stopColor="#8C6F43" />
                </linearGradient>
                <linearGradient id="gbRibbonV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F3DFAE" />
                  <stop offset="45%" stopColor="#C9971F" />
                  <stop offset="100%" stopColor="#8C6F43" />
                </linearGradient>
                <linearGradient id="gbLid" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFDF9" />
                  <stop offset="100%" stopColor="#EFE7D8" />
                </linearGradient>
              </defs>

              {/* cuerpo */}
              <rect x="30" y="78" width="140" height="94" rx="3" fill="url(#gbPaper)" />
              <rect x="30.7" y="78.7" width="138.6" height="92.6" rx="2.4" fill="none" stroke="#C6B698" strokeWidth="1.1" />
              <rect x="37" y="85" width="126" height="80" rx="2" fill="none" stroke="#D9C9A8" strokeWidth="0.7" opacity=".85" />
              {/* cinta vertical */}
              <rect x="91" y="78" width="18" height="94" fill="url(#gbRibbonV)" opacity=".92" />

              {/* tapa */}
              <g className="gb-lid">
                <rect x="20" y="58" width="160" height="26" rx="3" fill="url(#gbLid)" />
                <rect x="20.7" y="58.7" width="158.6" height="24.6" rx="2.4" fill="none" stroke="#C6B698" strokeWidth="1.1" />
                <rect x="20" y="66" width="160" height="10" fill="url(#gbRibbon)" opacity=".95" />
                <rect x="91" y="58" width="18" height="26" fill="url(#gbRibbonV)" opacity=".92" />
                {/* lazo */}
                <path d="M100 58 C100 42 82 28 68 35 C56 41 61 57 82 58 Z" fill="url(#gbRibbon)" stroke="#8C6F43" strokeWidth="1" strokeLinejoin="round" />
                <path d="M100 58 C100 42 118 28 132 35 C144 41 139 57 118 58 Z" fill="url(#gbRibbon)" stroke="#8C6F43" strokeWidth="1" strokeLinejoin="round" />
                <path d="M96 58 C92 48 86 42 80 39" fill="none" stroke="#B2925C" strokeWidth="0.8" opacity=".7" />
                <path d="M104 58 C108 48 114 42 120 39" fill="none" stroke="#B2925C" strokeWidth="0.8" opacity=".7" />
                <circle cx="100" cy="56" r="8.5" fill="url(#gbRibbonV)" stroke="#8C6F43" strokeWidth="1" />
                <circle cx="97.5" cy="53.5" r="2.6" fill="#FFF6E2" opacity=".75" />
              </g>
            </svg>
            <span className="gb-cta">{t.transfCta}</span>
          </button>
        </Stagger>
      </AnimatedCard>

      <AnimatePresence>
        {abierto && (
          <motion.div
            className="gb-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label={t.transfTitulo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setAbierto(false)}
          >
            <motion.div
              className="gb-panel"
              initial={{ opacity: 0, y: 30, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.5, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" className="gb-close" onClick={() => setAbierto(false)} aria-label={t.cerrar}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>

              <p
                className="font-sans-label"
                style={{ color: "var(--olive-soft)", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.26em" }}
              >
                {t.transfGraciasEyebrow}
              </p>

              <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.5rem", lineHeight: 1.1, marginTop: "0.3rem" }}>
                {t.transfGracias}
              </p>

              <div className="foil-rule" style={{ width: 90, margin: "0.85rem auto 1.1rem" }} />

              <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "1.15rem", fontWeight: 500 }}>
                {BANCO} &middot; {TITULAR}
              </p>

              {cuentas.map((c) => (
                <div className="gb-row" key={c.etiqueta}>
                  <div style={{ textAlign: "left", minWidth: 0 }}>
                    <p
                      className="font-sans-label"
                      style={{ color: "var(--olive-soft)", fontSize: "0.66rem", fontWeight: 600, letterSpacing: "0.2em" }}
                    >
                      {c.etiqueta}
                    </p>
                    <p
                      className="font-serif font-semibold"
                      /* la CLABE no cabe en un renglon a 1.3rem y partida se lee mal */
                      style={{ color: "var(--ink-dark)", fontSize: "clamp(1rem, 4.4vw, 1.22rem)", letterSpacing: "0.01em", lineHeight: 1.35, whiteSpace: "nowrap" }}
                    >
                      {c.valor}
                    </p>
                  </div>
                  <Copiar valor={c.valor} />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
