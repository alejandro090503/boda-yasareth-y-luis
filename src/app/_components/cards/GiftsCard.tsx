"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/**
 * Los novios NO tienen mesa de regalos: se mudan a Atlanta despues de la boda.
 * Los dos parrafos van literales, tal como los escribio el cliente.
 *
 * El sobre que se abre y los sobres cayendo de fondo son de
 * boda-jeffersson-y-vanessa, montados sobre la tarjeta de papel de esta
 * invitacion en vez de sobre su seccion a pantalla completa.
 */

const AZUL = "#6F8FAF";
const PAPEL_A = "#FBF8F1";
const PAPEL_B = "#F1EADC";

export default function GiftsCard() {
  const { t } = useLang();
  const parrafos = t.lluvia;
  const [abierto, setAbierto] = useState(false);
  const [aterrizado, setAterrizado] = useState(false);
  const seccion = useRef<HTMLDivElement>(null);
  const lluvia = useRef<HTMLDivElement>(null);

  /* Los sobres caen hasta que la tarjeta entra en pantalla; ahi para la
     lluvia y el sobre grande "aterriza" con un rebote. */
  useEffect(() => {
    const sec = seccion.current;
    const capa = lluvia.current;
    if (!sec || !capa) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAterrizado(true);
      return;
    }

    let lloviendo = true;
    let vivos = 0;
    const MAX_VIVOS = 14;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const crearSobre = () => {
      if (!lloviendo || vivos >= MAX_VIVOS || !capa.isConnected) return;
      vivos++;
      const el = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      el.setAttribute("viewBox", "0 0 34 24");
      el.setAttribute("class", "env-rain-item");
      const w = 14 + Math.random() * 14;
      el.style.width = `${w}px`;
      el.style.height = `${(w * 24) / 34}px`;
      el.style.left = `${Math.random() * 100}%`;
      el.innerHTML =
        `<rect x="1" y="1" width="32" height="22" rx="2.5" fill="${PAPEL_A}" stroke="${AZUL}" stroke-width="1.2"/>` +
        `<path d="M1 1 L17 13 L33 1" fill="none" stroke="${AZUL}" stroke-width="1.2" stroke-linejoin="round"/>`;
      capa.appendChild(el);

      const alto = sec.offsetHeight + 80;
      const dur = 4.5 + Math.random() * 3.5;
      el.animate(
        [
          { transform: "translate(0px, -46px) rotate(0deg)", opacity: 0 },
          { transform: `translate(${(Math.random() - 0.5) * 30}px, ${alto * 0.2}px) rotate(20deg)`, opacity: 0.7, offset: 0.2 },
          { transform: `translate(${(Math.random() - 0.5) * 60}px, ${alto * 0.75}px) rotate(90deg)`, opacity: 0.7, offset: 0.75 },
          { transform: `translate(${(Math.random() - 0.5) * 70}px, ${alto}px) rotate(140deg)`, opacity: 0 },
        ],
        { duration: dur * 1000, easing: "linear" }
      ).onfinish = () => {
        el.remove();
        vivos--;
      };
    };

    const programar = () => {
      if (!lloviendo) return;
      crearSobre();
      timers.push(setTimeout(programar, 520));
    };
    for (let i = 0; i < 6; i++) timers.push(setTimeout(crearSobre, i * 260));
    programar();

    const pararLluvia = () => {
      lloviendo = false;
      timers.forEach(clearTimeout);
      capa.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1100, fill: "forwards" }).onfinish = () => {
        capa.innerHTML = "";
        vivos = 0;
      };
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        pararLluvia();
        setAterrizado(true);
      },
      { threshold: 0.35 }
    );
    obs.observe(sec);

    /* Red de seguridad: si el observer no dispara (tarjeta mas alta que la
       pantalla, preview con IO congelado), el sobre aparece igual. */
    const rescate = setTimeout(() => {
      obs.disconnect();
      pararLluvia();
      setAterrizado(true);
    }, 9000);
    timers.push(rescate);

    return () => {
      lloviendo = false;
      timers.forEach(clearTimeout);
      obs.disconnect();
    };
  }, []);

  const alternar = useCallback(() => {
    if (!aterrizado) return;
    setAbierto((v) => !v);
  }, [aterrizado]);

  return (
    <AnimatedCard className="card-terracotta text-center py-8" anim="rotateIn">
      <div ref={seccion} style={{ position: "relative" }}>
        <div className="env-rain" ref={lluvia} aria-hidden="true" />

        <div className="env-stage">
          <Stagger>
            <p
              className="font-sans-label mb-2"
              style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600 }}
            >
              {t.conCarino}
            </p>
          </Stagger>

          <Stagger>
            <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.05 }}>
              {t.lluviaTitulo}
            </p>
          </Stagger>

          <Stagger>
            <div className="flex justify-center my-2">
              <OliveBranch width={100} color="var(--green-line)" />
            </div>
          </Stagger>

          <button
            type="button"
            className={`env-interactive ${abierto ? "open" : ""}`}
            onClick={alternar}
            aria-expanded={abierto}
            aria-label={t.lluviaAbrir}
            style={
              aterrizado
                ? { opacity: 1, transform: "none", transition: "opacity .5s ease, transform 1s cubic-bezier(.2,1.4,.4,1)" }
                : { opacity: 0, transform: "translateY(-140px) rotate(-12deg) scale(.82)" }
            }
          >
            <div className="env-body">
              <svg className="env-svg" viewBox="0 0 260 200" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="giftPaper" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor={PAPEL_B} />
                    <stop offset="100%" stopColor={PAPEL_A} />
                  </linearGradient>
                </defs>
                <rect x="18" y="52" width="224" height="132" rx="8" fill="url(#giftPaper)" stroke="rgba(111,143,175,.55)" strokeWidth="1.4" />
                <path d="M18 184 L130 110 L242 184" stroke="rgba(111,143,175,.35)" strokeWidth="1" fill="none" />
              </svg>

              <div className="env-flap-wrap" aria-hidden="true">
                <svg viewBox="0 0 224 86" preserveAspectRatio="none" style={{ width: "100%", height: "100%", display: "block" }}>
                  <defs>
                    <linearGradient id="giftFlap" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0%" stopColor={PAPEL_B} />
                      <stop offset="100%" stopColor="#FFFDF8" />
                    </linearGradient>
                  </defs>
                  <path d="M0 0 L112 86 L224 0 Z" fill="url(#giftFlap)" stroke="rgba(111,143,175,.55)" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>

              <svg className="env-seal" viewBox="0 0 60 60" aria-hidden="true">
                <circle cx="30" cy="30" r="28" fill="#8FD9FB" />
                <circle cx="30" cy="30" r="28" fill="none" stroke="#5E93B0" strokeWidth="2" opacity=".55" />
                <circle cx="30" cy="30" r="21.5" fill="none" stroke="#F3DFAE" strokeWidth="1.3" opacity=".95" />
                {/* el monograma va en marino, no en oro: sobre el baby blue del
                    sello el dorado se perdia */}
                <text x="30" y="38.5" textAnchor="middle" fontFamily="var(--font-script), cursive" fontSize="25" fill="#16325C">
                  A&amp;Y
                </text>
              </svg>
            </div>

            <div className="env-open-content" aria-live="polite">
              <svg width="40" height="40" viewBox="0 0 52 52" fill="none" stroke="var(--gold-antique)" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0 }}>
                <rect x="8" y="22" width="36" height="24" rx="5" />
                <path d="M8 30 Q26 38 44 30" />
                <rect x="18" y="8" width="16" height="16" rx="2" />
                <path d="M18 8 Q26 3 34 8" />
              </svg>

              {parrafos.map((t, i) => (
                <p
                  key={i}
                  className="font-serif"
                  style={{
                    color: "var(--ink-dark)",
                    fontSize: "1.16rem",
                    lineHeight: 1.7,
                    fontWeight: 500,
                    maxWidth: "330px",
                    marginTop: i > 0 ? "0.85rem" : "0.35rem",
                    textAlign: "left",
                  }}
                >
                  {t}
                </p>
              ))}
            </div>
          </button>

          <p className={`env-tap-hint ${aterrizado && !abierto ? "show" : ""}`} aria-hidden="true">
            {t.lluviaHint}
          </p>
        </div>
      </div>
    </AnimatedCard>
  );
}
