"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


export default function ReceptionCard() {
  const { t } = useLang();
  return (
    <AnimatedCard className="card-olive card-arch text-center" anim="zoom">
      <img
        src="/assets/sello-sage.png"
        alt=""
        className="absolute pointer-events-none"
        style={{ width: 66, height: "auto", top: -16, left: -12, zIndex: 30, transform: "rotate(-12deg)", filter: "drop-shadow(0 5px 10px rgba(22,32,46,0.35))" }}
      />
      <Stagger>
        <p className="font-script mb-1" style={{ color: "var(--olive-primary)", fontSize: "2.7rem", lineHeight: 1.1, marginTop: "1.5rem" }}>
          {t.recepcion}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.25rem" }}>
          Salón Social Diamante
        </p>
      </Stagger>

      <Stagger>
        <div className="lugar-foto mt-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/lugares/quinta.jpg" alt="Salón Social Diamante" />
        </div>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mt-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <div className="divider-gold" />
      </Stagger>

      <Stagger>
        <div className="my-5 text-center">
          <p className="font-serif font-semibold" style={{ color: "var(--olive-primary)", fontSize: "3.2rem", lineHeight: 1.1 }}>
            {t.horaRecepcion}
          </p>
          <p className="font-serif italic text-lg" style={{ color: "var(--olive-primary)", opacity: 0.85 }}>
            {t.dirRecepcion}
          </p>
        </div>
      </Stagger>

      <Stagger>
        <div className="flex justify-center" style={{ marginTop: "0.25rem" }}>
          <a
            href="https://maps.app.goo.gl/coPsC1uRrWx3GDeeA"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-map"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" />
            </svg>
            {t.irUbicacion}
          </a>
        </div>
      </Stagger>

    </AnimatedCard>
  );
}
