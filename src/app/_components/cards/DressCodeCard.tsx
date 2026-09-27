"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { Flourish } from "../Ornaments";
import { useLang } from "../../_data/idioma";


// Colores reservados: los cinco hex que el cliente marco como "a evitar"
// (blanco, arena y los tres azules de la boda), en el mismo orden que sus
// nombres en `t.colores`.
const HEX = ["#FFFFFF", "#E8DCC8", "#DCEDFE", "#85A2CB", "#1D2A44"];

export default function DressCodeCard() {
  const { t } = useLang();
  const reservados = HEX.map((hex, i) => ({ hex, nombre: t.colores[i] }));
  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="flip" corners={false}>
      <img
        src="/assets/sobre-motivo-chico.png"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: 110, height: "auto", top: -14, left: -14, opacity: 0.9, zIndex: 1 }}
      />
      <img
        src="/assets/sobre-motivo-chico.png"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: 110, height: "auto", bottom: -14, right: -14, opacity: 0.9, transform: "rotate(180deg)", zIndex: 1 }}
      />

      <Stagger>
        <p className="font-script mb-1" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          {t.vestimenta}
        </p>
      </Stagger>

      <Stagger>
        <p
          className="font-serif font-bold"
          style={{ color: "var(--ink-dark)", fontSize: "2.6rem", letterSpacing: "0.1em", lineHeight: 1.15 }}
        >
          {t.etiqueta1}
          <br />
          {t.etiqueta2}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-2 w-full">
          <Flourish color="var(--green-line)" width={140} />
        </div>
      </Stagger>

      <Stagger>
        <div style={{ position: "relative", zIndex: 10 }}>
          <p
            className="font-serif italic text-lg mt-3 px-3"
            style={{ color: "var(--ink-dark)", lineHeight: 1.6 }}
          >
            <strong>{t.caballeros}</strong>{t.caballerosTxt}
            <br />
            <strong>{t.damas}</strong>{t.damasTxt}
          </p>
          <p
            className="font-serif italic text-lg mt-4 px-3"
            style={{ color: "var(--ink-dark)", lineHeight: 1.6 }}
          >
            {t.coloresAviso1}<strong>{t.coloresAviso2}</strong>{t.coloresAviso3}
          </p>
        </div>
      </Stagger>

      <Stagger>
        <div
          className="flex flex-wrap justify-center gap-x-5 gap-y-4 mt-5 px-2"
          style={{ position: "relative", zIndex: 10 }}
        >
          {reservados.map((c) => (
            <div key={c.nombre} className="flex flex-col items-center gap-2">
              {/* Circulo del color con la diagonal roja de "no usar": el color
                  solo no bastaba, la novia pidio que se vea prohibido. */}
              <span
                aria-hidden="true"
                style={{
                  position: "relative",
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  backgroundColor: c.hex,
                  border: "1px solid var(--gold-antique)",
                  boxShadow: "0 2px 6px rgba(31,28,25,0.16)",
                  display: "block",
                }}
              >
                <svg
                  viewBox="0 0 46 46"
                  width="46"
                  height="46"
                  style={{ position: "absolute", top: -1, left: -1, display: "block" }}
                >
                  <circle cx="23" cy="23" r="21.5" fill="none" stroke="#b3261e" strokeWidth="2.6" />
                  <line x1="8" y1="38" x2="38" y2="8" stroke="#b3261e" strokeWidth="2.6" strokeLinecap="round" />
                </svg>
              </span>
              <span
                className="font-sans-label"
                style={{ color: "var(--ink-dark)", fontSize: "0.88rem", fontWeight: 600, letterSpacing: "0.12em" }}
              >
                {c.nombre}
              </span>
            </div>
          ))}
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
