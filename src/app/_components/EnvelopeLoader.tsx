"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../_data/idioma";

interface Props {
  onOpen: () => void;
  onTap?: () => void;
}

export default function EnvelopeLoader({ onOpen, onTap }: Props) {
  const { t } = useLang();
  const [phase, setPhase] = useState<"sealed" | "opening" | "done">("sealed");
  const videoRef = useRef<HTMLVideoElement>(null);
  const flashedRef = useRef(false);
  const safetyRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerReveal = useCallback(() => {
    if (flashedRef.current) return;
    flashedRef.current = true;
    if (safetyRef.current) clearTimeout(safetyRef.current);
    setPhase("done");
    setTimeout(onOpen, 500);
  }, [onOpen]);

  const handleTap = useCallback(() => {
    if (phase !== "sealed") return;
    onTap?.(); // arranca la música dentro del gesto del usuario
    setPhase("opening");

    const v = videoRef.current;
    if (v) {
      v.currentTime = 0;
      const p = v.play();
      if (p && typeof p.catch === "function") {
        p.catch(() => triggerReveal());
      }
      // respaldo por si el video no dispara eventos
      safetyRef.current = setTimeout(triggerReveal, 10000);
      // respaldo si el video no arranca
      setTimeout(() => {
        if (!flashedRef.current && v.paused && v.currentTime < 0.4) triggerReveal();
      }, 2200);
    } else {
      setTimeout(triggerReveal, 400);
    }
  }, [phase, onTap, triggerReveal]);

  // detecta el fin del video para revelar el contenido
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const dur = v.duration;
      if (!isFinite(dur) || dur <= 0) return;
      if (v.currentTime >= dur - 0.22) triggerReveal();
    };
    const onEnded = () => triggerReveal();
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnded);
    return () => {
      v.removeEventListener("timeupdate", onTime);
      v.removeEventListener("ended", onEnded);
    };
  }, [triggerReveal]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden cursor-pointer"
          style={{ backgroundColor: "#DCE9F2" }}
          onClick={handleTap}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Imagen estática del sobre */}
          <motion.img
            src="/envelope.jpg?v=2"
            alt="Sobre de la invitación"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Video del sobre abriéndose */}
          <motion.video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover", objectPosition: "center" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "opening" ? 1 : 0 }}
            transition={{ duration: 0 }}
          >
            <source src="/envelope.mp4?v=2" type="video/mp4" />
          </motion.video>

          {/* Hint "Toca para abrir" */}
          <AnimatePresence>
            {phase === "sealed" && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 z-10"
                style={{ bottom: "9vh" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.div
                  className="font-sans-label"
                  style={{
                    color: "#12294A",
                    backgroundColor: "rgba(160, 209, 232, 0.94)",
                    border: "1px solid rgba(255,255,255,0.7)",
                    borderRadius: 999,
                    padding: "12px 26px",
                    letterSpacing: "0.35em",
                    fontSize: "0.62rem",
                    boxShadow: "0 8px 24px rgba(22,32,46,0.28)",
                    whiteSpace: "nowrap",
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  {t.sobreHint}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
