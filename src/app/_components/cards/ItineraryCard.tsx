"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/* Un icono por momento, en el orden del itinerario: misa, recepcion,
   coctel, civil, cena, vals y fiesta. */
const ICONOS = [
  "/iconos/iglesia.png",
  "/iconos/arco.png",
  "/iconos/copas.png",
  "/iconos/anillos.png",
  "/iconos/cena.png",
  "/iconos/novios.png",
  "/iconos/fiesta.png",
];

export default function ItineraryCard() {
  const { t } = useLang();
  const events = t.itinerario.map((e, i) => ({ ...e, icon: ICONOS[i] }));
  const pista = useRef<HTMLDivElement>(null);
  const [avance, setAvance] = useState(0);

  /* Avance del recorrido: 0 cuando la lista entra por abajo de la pantalla y
     1 cuando termina de salir por arriba. Se mide en el scroll con rAF en vez
     de con ScrollTrigger porque esta invitacion no carga GSAP. */
  useEffect(() => {
    const el = pista.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAvance(1);
      return;
    }
    let pedido = 0;
    const medir = () => {
      pedido = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const inicio = vh * 0.82;
      const total = r.height + inicio - vh * 0.25;
      const p = total <= 0 ? 1 : (inicio - r.top) / total;
      setAvance(Math.min(Math.max(p, 0), 1));
    };
    const alScroll = () => {
      if (pedido) return;
      pedido = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      if (pedido) cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <AnimatedCard className="card-arch tex-emboss" anim="slideRight">
      <Stagger>
        <div className="flex justify-center" style={{ marginBottom: "0.25rem" }}>
          <img
            src="/assets/sobre-motivo-chico.png"
            alt=""
            className="pointer-events-none"
            style={{ width: 105, height: "auto", opacity: 0.95 }}
          />
        </div>
      </Stagger>
      <Stagger>
        <p className="font-script text-center" style={{ color: "var(--olive-primary)", fontSize: "3.4rem", lineHeight: 1.05 }}>
          {t.itinerarioTitulo}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center mb-6">
          <OliveBranch width={112} color="var(--green-line)" />
        </div>
      </Stagger>

      <div className="relative" ref={pista}>
        {/* riel apagado */}
        <div
          className="absolute top-5 bottom-5"
          style={{ left: 23, width: 1.5, background: "var(--beige)", opacity: 0.65 }}
        />
        {/* El recorrido: la linea se llena conforme baja el scroll y arrastra
            una perla de champan, que es lo que pidio el cliente. */}
        <div
          className="absolute top-5"
          style={{
            left: 23,
            width: 1.5,
            height: `calc(${avance} * (100% - 40px))`,
            background: "linear-gradient(var(--gold-antique), var(--green-line))",
            transition: "height .18s linear",
          }}
        />
        <div
          className="absolute"
          style={{
            left: 18,
            top: `calc(20px + ${avance} * (100% - 40px))`,
            width: 11,
            height: 11,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #FFF6E2, #C9971F 60%, #8C6F43)",
            boxShadow: "0 0 10px rgba(212,175,55,.75)",
            opacity: avance > 0.002 && avance < 0.999 ? 1 : 0,
            transition: "top .18s linear, opacity .3s ease",
            zIndex: 11,
          }}
          aria-hidden="true"
        />

        {events.map((evt, i) => {
          const isLast = i === events.length - 1;
          const activo = avance >= (i + 0.35) / events.length;
          return (
            <Stagger key={i}>
              <div
                className="flex gap-2.5"
                style={{ paddingBottom: isLast ? 0 : 46 }}
              >
                {/* nodo con icono a mano alzada */}
                <motion.div
                  className="relative z-10 shrink-0 flex items-center justify-center rounded-full mt-0.5"
                  animate={{
                    scale: activo ? 1.14 : 1,
                    borderColor: activo ? "#C9971F" : "var(--beige)",
                    backgroundColor: activo ? "#FFF8E4" : "var(--bg-cream)",
                    boxShadow: activo
                      ? "0 0 0 5px rgba(201,151,31,.20), 0 0 18px 2px rgba(201,151,31,.42), 0 3px 10px rgba(30,42,56,.16)"
                      : "0 2px 6px rgba(30,42,56,0.1)",
                  }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  style={{
                    width: 42,
                    height: 42,
                    borderWidth: 1.5,
                    borderStyle: "solid",
                  }}
                >
                  {/* halo de oro: solo aparece en el momento por el que va
                      pasando el invitado, para que el recorrido se lea */}
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full pointer-events-none"
                    animate={{ opacity: activo ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,248,228,.55) 0%, rgba(240,205,120,.55) 52%, rgba(201,151,31,.30) 70%, transparent 82%)",
                    }}
                  />
                  <Image
                    src={evt.icon}
                    alt={evt.label}
                    width={30}
                    height={30}
                    className="relative z-10"
                    style={{ objectFit: "contain" }}
                  />
                </motion.div>

                {/* contenido */}
                <div className="text-left flex-1 min-w-0 pt-1">
                  {evt.time && (
                    <motion.p
                      className="font-serif font-semibold leading-none"
                      animate={{ color: activo ? "#8a5c13" : "var(--ink-dark)" }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      style={{ fontSize: "1.72rem" }}
                    >
                      {evt.time}
                    </motion.p>
                  )}
                  <p
                    className="font-sans-label mt-1"
                    style={{ color: "var(--ink-dark)", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "pre-line", lineHeight: 1.5 }}
                  >
                    {evt.label}
                  </p>
                  {evt.desc && (
                    <p
                      className="font-serif italic mt-1.5 text-justify"
                      style={{ color: "var(--ink-dark)", fontSize: "1.23rem", lineHeight: 1.6 }}
                    >
                      {evt.desc}
                    </p>
                  )}
                </div>
              </div>
            </Stagger>
          );
        })}
      </div>
    </AnimatedCard>
  );
}
