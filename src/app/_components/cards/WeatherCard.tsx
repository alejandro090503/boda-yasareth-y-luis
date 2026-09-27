"use client";

import { useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { FECHA_BODA } from "../../_data/fecha";
import { useLang } from "../../_data/idioma";


/* Guadalupe Ixcotla, Tlaxcala */
const LAT = 19.3202;
const LON = -98.1806;

/* Open-Meteo sólo publica pronóstico hasta ~16 días adelante. */
const DIAS_PRONOSTICO = 16;

type Pronostico = {
  max: number;
  min: number;
  lluvia: number;
  code: number;
};

/* Códigos WMO agrupados en las tres familias que nos interesan */
type Cielo = { despejado: string; casiDespejado: string; nublado: string; neblina: string; lluvia: string; chubascos: string; tormenta: string };

function describeCodigo(code: number, c: Cielo): { texto: string; tipo: "sol" | "nube" | "lluvia" } {
  if (code === 0) return { texto: c.despejado, tipo: "sol" };
  if (code <= 2) return { texto: c.casiDespejado, tipo: "sol" };
  if (code === 3) return { texto: c.nublado, tipo: "nube" };
  if (code <= 48) return { texto: c.neblina, tipo: "nube" };
  if (code <= 67) return { texto: c.lluvia, tipo: "lluvia" };
  if (code <= 82) return { texto: c.chubascos, tipo: "lluvia" };
  return { texto: c.tormenta, tipo: "lluvia" };
}

function IconoClima({ tipo }: { tipo: "sol" | "nube" | "lluvia" }) {
  const common = {
    width: 46,
    height: 46,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "var(--olive-soft)",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  if (tipo === "sol") {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="24" cy="24" r="9" />
        <path d="M24 5v5M24 38v5M5 24h5M38 24h5M10.6 10.6l3.5 3.5M33.9 33.9l3.5 3.5M37.4 10.6l-3.5 3.5M14.1 33.9l-3.5 3.5" />
      </svg>
    );
  }
  if (tipo === "nube") {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M18 34h16a7 7 0 000-14 10 10 0 00-19 2.6A6 6 0 0016 34h2z" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M18 29h16a7 7 0 000-14 10 10 0 00-19 2.6A6 6 0 0016 29h2z" />
      <path d="M17 34l-2 5M24 34l-2 5M31 34l-2 5" />
    </svg>
  );
}

export default function WeatherCard() {
  const { t } = useLang();
  const [pron, setPron] = useState<Pronostico | null>(null);

  useEffect(() => {
    if (!FECHA_BODA) return;
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const dias = Math.ceil((FECHA_BODA.getTime() - hoy.getTime()) / 86400000);
    if (dias < 0 || dias > DIAS_PRONOSTICO) return;

    const y = FECHA_BODA.getFullYear();
    const m = String(FECHA_BODA.getMonth() + 1).padStart(2, "0");
    const d = String(FECHA_BODA.getDate()).padStart(2, "0");
    const fecha = `${y}-${m}-${d}`;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
        `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weather_code` +
        `&timezone=America%2FMexico_City&start_date=${fecha}&end_date=${fecha}`
    )
      .then((r) => r.json())
      .then((j) => {
        const dly = j?.daily;
        if (!dly?.temperature_2m_max?.length) return;
        setPron({
          max: Math.round(dly.temperature_2m_max[0]),
          min: Math.round(dly.temperature_2m_min[0]),
          lluvia: dly.precipitation_probability_max?.[0] ?? 0,
          code: dly.weather_code?.[0] ?? 0,
        });
      })
      .catch(() => {});
  }, []);

  const desc = pron ? describeCodigo(pron.code, t.cielo) : null;

  return (
    <AnimatedCard className="tex-count text-center py-8" anim="blurRise">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.climaLugar}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          {t.climaTitulo}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      {pron && desc ? (
        /* Pronóstico real del día de la boda (se activa 16 días antes) */
        <>
          <Stagger>
            <div className="flex justify-center mb-1">
              <IconoClima tipo={desc.tipo} />
            </div>
          </Stagger>
          <Stagger>
            <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.3rem" }}>
              {desc.texto}
            </p>
          </Stagger>
          <Stagger>
            <div className="flex justify-center gap-3 mt-4">
              <span className="weather-chip">
                <span className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "1.7rem", lineHeight: 1.1 }}>
                  {pron.max}°
                </span>
                <span className="font-sans-label" style={{ color: "var(--ink-dark)", fontSize: "0.78rem", fontWeight: 600 }}>
                  {t.climaMax}
                </span>
              </span>
              <span className="weather-chip">
                <span className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "1.7rem", lineHeight: 1.1 }}>
                  {pron.min}°
                </span>
                <span className="font-sans-label" style={{ color: "var(--ink-dark)", fontSize: "0.78rem", fontWeight: 600 }}>
                  {t.climaMin}
                </span>
              </span>
              <span className="weather-chip">
                <span className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "1.7rem", lineHeight: 1.1 }}>
                  {pron.lluvia}%
                </span>
                <span className="font-sans-label" style={{ color: "var(--ink-dark)", fontSize: "0.78rem", fontWeight: 600 }}>
                  {t.climaLluvia}
                </span>
              </span>
            </div>
          </Stagger>
        </>
      ) : (
        /* Mientras el día no esté a la vista, el clima típico de Mérida */
        <>
          <Stagger>
            <div className="flex justify-center mb-1">
              <IconoClima tipo="sol" />
            </div>
          </Stagger>
          <Stagger>
            <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.3rem" }}>
              {t.climaTipico}
            </p>
          </Stagger>
          <Stagger>
            <div className="flex justify-center gap-3 mt-4">
              <span className="weather-chip">
                <span className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "1.6rem", lineHeight: 1.1 }}>
                  19–22°
                </span>
                <span className="font-sans-label" style={{ color: "var(--ink-dark)", fontSize: "0.78rem", fontWeight: 600 }}>
                  {t.climaDia}
                </span>
              </span>
              <span className="weather-chip">
                <span className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "1.6rem", lineHeight: 1.1 }}>
                  2–5°
                </span>
                <span className="font-sans-label" style={{ color: "var(--ink-dark)", fontSize: "0.78rem", fontWeight: 600 }}>
                  {t.climaNoche}
                </span>
              </span>
            </div>
          </Stagger>
          <Stagger>
            <p
              className="font-serif italic mx-auto mt-5 px-3"
              style={{ color: "var(--ink-dark)", fontSize: "1.15rem", lineHeight: 1.6, maxWidth: "310px" }}
            >
              {t.climaEspera}
            </p>
          </Stagger>
        </>
      )}

      <Stagger>
        <div className="mt-5 pt-5 mx-auto" style={{ borderTop: "1px solid var(--beige)", maxWidth: "320px" }}>
          <p
            className="font-serif"
            style={{ color: "var(--ink-dark)", fontSize: "1.15rem", lineHeight: 1.6, fontWeight: 500 }}
          >
            {t.climaNota}
          </p>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
