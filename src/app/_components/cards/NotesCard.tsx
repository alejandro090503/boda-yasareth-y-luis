"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/**
 * Apartado de NOTAS que pidió el cliente en sus detalles finales.
 * Los cuatro textos van literales, tal como los escribió.
 */
export default function NotesCard() {
  const { t } = useLang();
  const notas = t.notas;
  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="slideRight">
      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          {t.notasTitulo}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <div className="mt-2">
        {notas.map((n, i) => (
          <Stagger key={i}>
            <div className="note-item">
              <span className="note-bullet" aria-hidden="true" />
              <p
                className="font-serif"
                style={{ color: "var(--ink-dark)", fontSize: "1.18rem", lineHeight: 1.6, fontWeight: 500 }}
              >
                {n}
              </p>
            </div>
          </Stagger>
        ))}
      </div>
    </AnimatedCard>
  );
}
