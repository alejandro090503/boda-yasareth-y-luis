"use client";

import { useCallback, useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { useLang } from "../../_data/idioma";


/**
 * Carrusel lateral con foto del lugar, al estilo del hospedaje de
 * boda-roxana-y-omar, montado sobre la tarjeta de papel de esta invitacion.
 * Los dos hoteles los recomendo el cliente.
 */
const hoteles = [
  {
    name: "Hotel Del Rey",
    foto: "/hoteles/del-rey.jpg",
    mapUrl: "https://maps.app.goo.gl/Av4XeZ8DbpzgSx5v7",
    /* El cliente dio telefono en lugar de pagina: el boton marca. */
    webUrl: "tel:+522464643937",
    webEsTel: true,
  },
  {
    name: "Hotel Boutique Casa del Bosque",
    foto: "/hoteles/casa-del-bosque.jpg",
    mapUrl: "https://maps.app.goo.gl/aA5TTadraE1vkkiJ9",
    webUrl: "http://www.hotelcasadelbosque.com/",
    webEsTel: false,
  },
];

export default function HotelsCard() {
  const { t } = useLang();
  const [i, setI] = useState(0);
  const [tocado, setTocado] = useState(false);

  const ir = useCallback((d: number) => {
    setTocado(true);
    setI((n) => (n + d + hoteles.length) % hoteles.length);
  }, []);

  // avance solo hasta que el invitado toma el control
  useEffect(() => {
    if (tocado) return;
    const t = setInterval(() => setI((n) => (n + 1) % hoteles.length), 4200);
    return () => clearInterval(t);
  }, [tocado]);

  // deslizar con el dedo
  const [x0, setX0] = useState<number | null>(null);

  return (
    <AnimatedCard className="tex-emboss text-center py-9" anim="blurRise">
      <Stagger>
        <p className="font-script mb-1" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          {t.hospedaje}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mb-2">
          <img
            src="/assets/sobre-motivo-chico.png"
            alt=""
            className="pointer-events-none"
            style={{ width: 90, height: "auto", opacity: 0.95 }}
          />
        </div>
      </Stagger>

      <Stagger>
        <p className="font-serif italic text-lg px-2" style={{ color: "var(--ink-dark)", lineHeight: 1.6 }}>
          {t.hospedajeSub1}
          <br />{t.hospedajeSub2}
        </p>
      </Stagger>

      <Stagger>
        <div className="hosp-carousel">
          <button className="hosp-arrow prev" onClick={() => ir(-1)} aria-label={t.hotelAnterior} type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button className="hosp-arrow next" onClick={() => ir(1)} aria-label={t.hotelSiguiente} type="button">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
          </button>

          <div
            className="hosp-viewport"
            onTouchStart={(e) => setX0(e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (x0 === null) return;
              const dx = e.changedTouches[0].clientX - x0;
              if (Math.abs(dx) > 40) ir(dx < 0 ? 1 : -1);
              setX0(null);
            }}
          >
            <div className="hosp-track" style={{ transform: `translateX(-${i * 100}%)` }}>
              {hoteles.map((h, n) => (
                <div className="hosp-slide" key={h.name}>
                  <div className="hosp-photo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={h.foto} alt={h.name} />
                  </div>
                  <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.5rem", lineHeight: 1.3 }}>
                    {h.name}
                  </p>
                  <p className="font-serif" style={{ color: "var(--terracotta)", fontSize: "1.08rem", lineHeight: 1.5, margin: "0.15rem 0 0.9rem" }}>
                    {t.zonas[n]}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <a href={h.webUrl} target="_blank" rel="noopener noreferrer" className="btn-map">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <rect x="3" y="7" width="18" height="14" rx="2" />
                        <path d="M7 7V5a5 5 0 0110 0v2" />
                      </svg>
                      {t.reservar}
                    </a>
                    <a href={h.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-map btn-olive">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      {t.comoLlegar}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hosp-dots">
            {hoteles.map((h, n) => (
              <button
                key={h.name}
                className={n === i ? "active" : ""}
                onClick={() => { setTocado(true); setI(n); }}
                aria-label={h.name}
                type="button"
              />
            ))}
          </div>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
