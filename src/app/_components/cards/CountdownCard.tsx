"use client";

import { useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { FECHA_BODA } from "../../_data/fecha";
import { useLang } from "../../_data/idioma";


/** La ceremonia es a las 11:00 de la manana. */
const HORA_CEREMONIA = 11;

type Resto = { dias: number; horas: number; minutos: number };

function calcular(fecha: Date): Resto {
  const objetivo = new Date(fecha);
  objetivo.setHours(HORA_CEREMONIA, 0, 0, 0);
  const ms = Math.max(objetivo.getTime() - Date.now(), 0);
  return {
    dias: Math.floor(ms / 86400000),
    horas: Math.floor((ms % 86400000) / 3600000),
    minutos: Math.floor((ms % 3600000) / 60000),
  };
}

export default function CountdownCard() {
  const { t } = useLang();
  const [resto, setResto] = useState<Resto | null>(null);

  useEffect(() => {
    const fecha = FECHA_BODA;
    if (!fecha) return;
    const tick = () => setResto(calcular(fecha));
    tick();
    const id = setInterval(tick, 20000);
    return () => clearInterval(id);
  }, []);

  const casillas: { valor: number | null; etiqueta: string }[] = [
    { valor: resto ? resto.dias : null, etiqueta: t.dias },
    { valor: resto ? resto.horas : null, etiqueta: t.horas },
    { valor: resto ? resto.minutos : null, etiqueta: t.minutos },
  ];

  return (
    <AnimatedCard className="tex-count text-center py-9" anim="zoom">
      <Stagger>
        <div className="flex justify-center mb-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.1 }}>
          {t.faltan}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center items-start gap-2 mt-4 mb-1">
          {casillas.map((c, i) => (
            <div key={c.etiqueta} className="flex items-start gap-2">
              {i > 0 && (
                <span
                  className="font-serif"
                  style={{ color: "var(--gold-antique)", fontSize: "2.4rem", lineHeight: 1.1, opacity: 0.55 }}
                  aria-hidden="true"
                >
                  &middot;
                </span>
              )}
              <div style={{ minWidth: 74 }}>
                <p
                  className="font-serif font-semibold"
                  style={{
                    color: "var(--olive-primary)",
                    fontSize: "3rem",
                    lineHeight: 1,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {c.valor === null ? "––" : c.valor}
                </p>
                <p
                  className="font-sans-label"
                  style={{
                    color: "var(--olive-soft)",
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.22em",
                    marginTop: "0.4rem",
                  }}
                >
                  {c.etiqueta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Stagger>

      <Stagger>
        <p className="font-serif italic mt-4" style={{ color: "var(--ink-dark)", fontSize: "1.25rem" }}>
          {t.granDia}
        </p>
      </Stagger>
    </AnimatedCard>
  );
}
