"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { useLang } from "../../_data/idioma";

const PANEL_API = "https://panel-invitados.vercel.app/api/confirmar";
const RSVP_URL = "https://boda-yasareth-y-luis.vercel.app";
/* Fecha límite de confirmación: 12 de octubre de 2026 (coincide con el texto del pie). */
const DEADLINE = new Date(2026, 9, 12, 23, 59, 59, 999);

const EASE = [0.22, 0.61, 0.36, 1] as const;

/* WhatsApp y Messenger cortan la URL en el primer espacio o "&". El panel manda
   un token base64url en ?i= ("nombre|pases|menores") que llega intacto.
   Se conserva ?para=&pases= para los links ya enviados. */
function decodeInvite(tok: string): { nombre: string; pases: number } {
  try {
    let b64 = tok.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    const [nombre, pases] = new TextDecoder().decode(bytes).split("|");
    const n = parseInt(pases ?? "1", 10);
    return { nombre: (nombre ?? "").trim(), pases: isNaN(n) || n < 1 || n > 20 ? 1 : n };
  } catch {
    return { nombre: "", pases: 1 };
  }
}

export default function RSVPCard() {
  const { t } = useLang();
  const searchParams = useSearchParams();
  const token = searchParams.get("i") || "";
  const desdeToken = token ? decodeInvite(token) : null;
  const urlPara = (desdeToken ? desdeToken.nombre : searchParams.get("para") || "").trim();
  const pasesUrl = (() => {
    if (desdeToken) return desdeToken.pases;
    const n = parseInt(searchParams.get("pases") ?? "1", 10);
    return isNaN(n) || n < 1 || n > 20 ? 1 : n;
  })();

  const frozen = Date.now() > DEADLINE.getTime();
  /* Tope: los pases que los novios asignaron en el panel */
  const [pasesAsignados, setPasesAsignados] = useState(pasesUrl);
  /* Lo que el invitado va a ocupar: arranca en 1 y nunca pasa del tope */
  const [pasesAUsar, setPasesAUsar] = useState(1);
  const [nombres, setNombres] = useState<string[]>([]);
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [gateLoading, setGateLoading] = useState(!!urlPara);
  const [cerrada, setCerrada] = useState(false);
  const [bloqueada, setBloqueada] = useState(false);
  const [faltantes, setFaltantes] = useState<number[]>([]);
  const [resumen, setResumen] = useState<{ estado: "yes" | "no"; nombres: string[] } | null>(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackKind, setFeedbackKind] = useState<"info" | "success" | "warn" | "error">("info");
  const [btnLabel, setBtnLabel] = useState<string>(frozen ? t.rsvpVencido : t.rsvpEnviar);
  const feedRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!urlPara) return;
    fetch(
      `${PANEL_API}?nombre=${encodeURIComponent(urlPara)}&url_boda=${encodeURIComponent(RSVP_URL)}`
    )
      .then((r) => r.json())
      .then((resp) => {
        const d = resp?.invitado;
        const tope = typeof d?.pases === "number" && d.pases > 0 && d.pases <= 20 ? d.pases : pasesUrl;
        setPasesAsignados(tope);
        if (d?.bloqueado) setBloqueada(true);

        if (d && (d.estado === "confirmado" || d.estado === "declino")) {
          const guardados: string[] = (d.nombres_confirmados || []).filter(
            (n: string) => n && String(n).trim()
          );
          /* El contador arranca en cuántos pases había ocupado antes */
          setPasesAUsar(Math.min(tope, Math.max(1, guardados.length)));
          setNombres(guardados);
          setChoice(d.estado === "confirmado" ? "yes" : "no");
          setBtnLabel(t.rsvpActualizar);
          /* Con respuesta ya guardada, la sección arranca CERRADA. */
          setResumen({ estado: d.estado === "confirmado" ? "yes" : "no", nombres: guardados });
          setCerrada(true);
        }
      })
      .catch(() => {
        setFeedbackKind("error");
        setFeedback(t.errCarga);
      })
      .finally(() => setGateLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlPara]);

  const setPases = (n: number) => {
    if (frozen || bloqueada) return;
    const v = Math.max(1, Math.min(pasesAsignados, n));
    if (v === pasesAUsar) return;
    setPasesAUsar(v);
    setFaltantes([]);
    setFeedback("");
  };

  const escribirNombre = (i: number, v: string) => {
    setNombres((prev) => {
      const copia = prev.slice();
      copia[i] = v;
      return copia;
    });
    setFaltantes((prev) => prev.filter((x) => x !== i));
  };

  const elegir = (v: "yes" | "no") => {
    if (frozen || bloqueada) return;
    setChoice(v);
    setFaltantes([]);
    setFeedback("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (frozen || enviando || bloqueada || !urlPara) return;
    if (!choice) {
      setFeedbackKind("warn");
      setFeedback(t.rsvpElige);
      return;
    }

    const asisten = choice === "yes" ? nombres.slice(0, pasesAUsar).map((n) => (n || "").trim()) : [];
    const escritos = asisten.filter(Boolean);

    if (choice === "yes") {
      if (escritos.length === 0) {
        setFeedbackKind("warn");
        setFeedback(t.rsvpUnNombre);
        return;
      }
      if (escritos.length < pasesAUsar) {
        /* Se marcan los campos vacíos para que se note cuál falta */
        const vacios: number[] = [];
        for (let i = 0; i < pasesAUsar; i++) if (!(nombres[i] || "").trim()) vacios.push(i);
        setFaltantes(vacios);
        setFeedbackKind("warn");
        setFeedback(t.rsvpFaltan(pasesAUsar, escritos.length, pasesAUsar - escritos.length));
        feedRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
        return;
      }
    }

    const estado = choice === "yes" ? "confirmado" : "declino";
    setEnviando(true);
    setBtnLabel(t.rsvpEnviando);
    setFeedback("");
    try {
      const res = await fetch(PANEL_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: urlPara,
          url_boda: RSVP_URL,
          estado,
          pases_confirmados: estado === "confirmado" ? escritos.length : 0,
          nombres_confirmados: estado === "confirmado" ? escritos : [],
        }),
      });
      const data = await res.json().catch(() => null);

      // La ronda de invitaciones puede estar cerrada desde el panel.
      if (res.status === 423) {
        setBloqueada(true);
        setFeedbackKind("warn");
        setFeedback(t.errCerradas);
        setBtnLabel(t.rsvpCerradas);
        return;
      }
      if (res.status === 410) {
        setBloqueada(true);
        setFeedbackKind("warn");
        setFeedback(t.errLink);
        setBtnLabel(t.rsvpNoDisponible);
        return;
      }
      // Solo se da por registrada si el panel la guardó de verdad.
      if (!res.ok || !data?.ok) {
        setFeedbackKind("error");
        setFeedback(data?.error === "no_match" ? t.errIdent : t.errEnvio);
        setBtnLabel(t.rsvpReintentar);
        return;
      }

      setBtnLabel(t.rsvpActualizar);
      setResumen({ estado: choice, nombres: escritos });
      setCerrada(true);
      setFeedback("");
    } catch {
      setFeedbackKind("error");
      setFeedback(t.errRed);
      setBtnLabel(t.rsvpReintentar);
    } finally {
      setEnviando(false);
    }
  };

  const feedbackColor =
    feedbackKind === "success"
      ? "var(--olive-primary)"
      : feedbackKind === "warn"
        ? "var(--terracotta)"
        : feedbackKind === "error"
          ? "#8c2f22"
          : "var(--olive-primary)";

  const cerradoTodo = frozen || bloqueada;
  const togglesDisabled = cerradoTodo || gateLoading;
  const sinLink = !urlPara;
  /* Sin link personalizado no hay invitación que actualizar */
  const puedeResponder = !sinLink;

  const resumenTexto = (() => {
    if (!resumen) return { titulo: "", sub: "" };
    if (resumen.estado === "no" || resumen.nombres.length === 0) {
      return { titulo: t.rsvpGraciasNo, sub: t.rsvpGraciasNoSub };
    }
    if (resumen.nombres.length === 1) {
      return { titulo: t.rsvpGraciasSi, sub: t.rsvpEsperamos(resumen.nombres[0]) };
    }
    return {
      titulo: t.rsvpGraciasSi,
      sub: t.rsvpConfirmados(resumen.nombres.length, resumen.nombres.join(", ")),
    };
  })();

  return (
    <AnimatedCard className="tex-fiber text-center" anim="unfold" corners={false}>
      <Stagger>
        <img
          src="/assets/olivo-acuarela.png"
          alt=""
          style={{ width: 140, height: "auto", margin: "0.25rem auto 0.75rem", opacity: 0.9 }}
        />
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "3rem", lineHeight: 1 }}>
          {t.rsvpTitulo}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-serif italic mb-2 mt-1" style={{ color: "var(--ink-dark)", fontSize: "1.2rem" }}>
          {t.rsvpSub}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex items-center gap-3 max-w-[280px] mx-auto mb-5">
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, var(--green-line))", opacity: 0.9 }} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/pluma.png"
            alt=""
            aria-hidden="true"
            /* Inclinada: vertical rompia la linea de los dos filetes */
            style={{ height: 32, width: "auto", display: "block", opacity: 0.95, flexShrink: 0, transform: "rotate(-24deg)" }}
          />
          <span className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, var(--green-line))", opacity: 0.9 }} />
        </div>
      </Stagger>

      {puedeResponder && (
        <Stagger>
          <div
            className="max-w-[360px] mx-auto mb-5 px-5 py-3"
            style={{ backgroundColor: "rgba(31,28,25,0.06)", border: "1px solid var(--beige)", borderRadius: 14 }}
          >
            <p className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "1.2rem", lineHeight: 1.5 }}>
              {t.rsvpTienes}{" "}
              <span className="font-semibold" style={{ color: "var(--olive-primary)" }}>
                {pasesAsignados} {pasesAsignados === 1 ? t.rsvpPase : t.rsvpPases}
              </span>
              <br />
              {t.rsvpPara}{" "}
              <span className="font-script" style={{ color: "var(--olive-primary)", fontSize: "1.8rem" }}>
                {urlPara}
              </span>
            </p>
          </div>
        </Stagger>
      )}

      {sinLink && (
        <Stagger>
          <p
            className="font-serif italic mx-auto max-w-[360px] mb-2"
            style={{ color: "var(--ink-dark)", fontSize: "1.05rem", lineHeight: 1.6 }}
          >
            {t.rsvpSinLink}
          </p>
        </Stagger>
      )}

      {puedeResponder && (
        <Stagger>
          <AnimatePresence mode="wait" initial={false}>
            {cerrada ? (
              /* ── Panel de agradecimiento (la bandeja queda colapsada) ── */
              <motion.div
                key="gracias"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="max-w-[360px] mx-auto px-5 py-6"
                style={{
                  background: "rgba(255,253,249,0.72)",
                  border: "1.5px solid var(--beige)",
                  borderRadius: 16,
                }}
              >
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green-deep)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ margin: "0 auto 0.6rem", display: "block" }}
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="8.5 12.5 11 15 16 9.5" />
                </svg>

                <p
                  className="font-serif font-semibold"
                  style={{ color: "var(--ink-dark)", fontSize: "1.45rem", lineHeight: 1.35, marginBottom: "0.5rem" }}
                >
                  {resumenTexto.titulo}
                </p>
                <p
                  className="font-serif italic"
                  style={{ color: "var(--ink-dark)", fontSize: "1.15rem", lineHeight: 1.6, marginBottom: "1.1rem" }}
                >
                  {resumenTexto.sub}
                </p>

                {!bloqueada && (
                  <button
                    type="button"
                    onClick={() => {
                      if (frozen || bloqueada) return;
                      setCerrada(false);
                      setFeedback("");
                    }}
                    disabled={frozen}
                    className="font-serif italic transition-all disabled:opacity-45 disabled:cursor-not-allowed"
                    style={{
                      padding: "11px 24px",
                      border: "1.5px solid var(--beige)",
                      background: "transparent",
                      cursor: "pointer",
                      fontSize: "1.05rem",
                      color: "var(--olive-primary)",
                      borderRadius: 24,
                    }}
                  >
                    {t.rsvpModificar}
                  </button>
                )}
              </motion.div>
            ) : (
              /* ── Bandeja: toggle, contador de pases y un campo por pase ── */
              <motion.form
                key="bandeja"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="max-w-[360px] mx-auto space-y-5"
              >
                <div className="flex gap-2">
                  {(["yes", "no"] as const).map((val) => {
                    const activo = choice === val;
                    const isYes = val === "yes";
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => elegir(val)}
                        disabled={togglesDisabled}
                        aria-pressed={activo}
                        className="flex-1 py-3 font-serif italic transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                          border: `1.5px solid ${
                            activo ? (isYes ? "var(--olive-primary)" : "var(--terracotta)") : "var(--beige)"
                          }`,
                          backgroundColor: activo
                            ? isYes
                              ? "var(--olive-primary)"
                              : "var(--terracotta)"
                            : "rgba(255,253,249,0.55)",
                          color: activo ? "var(--bg-cream)" : "var(--ink-dark)",
                          fontSize: "1.05rem",
                          borderRadius: 10,
                        }}
                      >
                        {isYes ? t.rsvpSi : t.rsvpNo}
                      </button>
                    );
                  })}
                </div>

                {choice === "yes" && (
                  <div>
                    <p
                      className="font-serif italic mx-auto mb-3"
                      style={{ color: "var(--ink-dark)", fontSize: "1.05rem", lineHeight: 1.55 }}
                    >
                      {pasesAsignados === 1 ? t.rsvpNotaUno : t.rsvpNotaVarios(pasesAsignados)}
                    </p>

                    {pasesAsignados > 1 && (
                      <>
                        <div
                          className="flex items-center justify-center gap-5 mx-auto mb-2 px-4 py-3"
                          style={{
                            background: "rgba(31,28,25,0.06)",
                            border: "1px solid var(--beige)",
                            borderRadius: 14,
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => setPases(pasesAUsar - 1)}
                            disabled={cerradoTodo || pasesAUsar <= 1}
                            aria-label={t.rsvpQuitarPase}
                            className="font-serif transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                            style={{
                              width: 46,
                              height: 46,
                              flexShrink: 0,
                              borderRadius: "50%",
                              border: "1.5px solid var(--beige)",
                              background: "rgba(255,253,249,0.8)",
                              color: "var(--olive-primary)",
                              fontSize: "1.6rem",
                              lineHeight: 1,
                              cursor: "pointer",
                            }}
                          >
                            −
                          </button>
                          <span
                            className="font-script"
                            aria-live="polite"
                            style={{ color: "var(--olive-primary)", fontSize: "2.6rem", lineHeight: 1, minWidth: 58 }}
                          >
                            {pasesAUsar}
                          </span>
                          <button
                            type="button"
                            onClick={() => setPases(pasesAUsar + 1)}
                            disabled={cerradoTodo || pasesAUsar >= pasesAsignados}
                            aria-label={t.rsvpAgregarPase}
                            className="font-serif transition-all disabled:opacity-35 disabled:cursor-not-allowed"
                            style={{
                              width: 46,
                              height: 46,
                              flexShrink: 0,
                              borderRadius: "50%",
                              border: "1.5px solid var(--beige)",
                              background: "rgba(255,253,249,0.8)",
                              color: "var(--olive-primary)",
                              fontSize: "1.6rem",
                              lineHeight: 1,
                              cursor: "pointer",
                            }}
                          >
                            +
                          </button>
                        </div>
                        <p
                          className="font-sans-label"
                          style={{
                            color: "var(--olive-primary)",
                            fontSize: "0.78rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                          }}
                        >
                          {pasesAUsar >= pasesAsignados ? t.rsvpTodos : t.rsvpDePases(pasesAUsar, pasesAsignados)}
                        </p>
                      </>
                    )}

                    <div className="space-y-2 mt-4">
                      {Array.from({ length: pasesAUsar }, (_, i) => (
                        <input
                          key={`n-${i}`}
                          type="text"
                          value={nombres[i] || ""}
                          onChange={(e) => escribirNombre(i, e.target.value)}
                          placeholder={pasesAUsar === 1 ? t.rsvpTuNombre : t.rsvpNombreN(i + 1)}
                          aria-label={pasesAUsar === 1 ? t.rsvpTuNombre : t.rsvpNombreN(i + 1)}
                          autoComplete="off"
                          maxLength={60}
                          disabled={cerradoTodo}
                          className="w-full font-serif disabled:opacity-60"
                          style={{
                            padding: "13px 16px",
                            border: `1.5px solid ${faltantes.includes(i) ? "var(--terracotta)" : "var(--beige)"}`,
                            background: "rgba(255,253,249,0.75)",
                            color: "var(--ink-dark)",
                            fontSize: "1.05rem",
                            borderRadius: 12,
                            outline: "none",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={enviando || cerradoTodo}
                  className="w-full py-4 font-sans-label transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: "var(--olive-primary)",
                    color: "var(--bg-cream)",
                    letterSpacing: "0.25em",
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    borderRadius: 50,
                    boxShadow: "0 6px 18px rgba(31,28,25,0.3)",
                  }}
                >
                  {btnLabel}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </Stagger>
      )}

      {/* Sin <Stagger>: este aviso se monta DESPUES de que la tarjeta ya entro,
          y los hijos de Stagger que nacen tarde se quedan en opacity:0 porque
          el disparo por scroll (whileInView once) ya paso y no vuelve. */}
      {feedback && (
        <p
          ref={feedRef}
          className="font-serif italic mt-4 mx-auto max-w-[360px]"
          style={{ color: feedbackColor, fontSize: "1.05rem", lineHeight: 1.6, textAlign: "center" }}
        >
          {feedback}
        </p>
      )}

      <Stagger>
        <div className="flex items-center justify-center gap-2 mt-6 mx-auto text-center" style={{ color: "var(--olive-primary)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0 }}>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm.5 5v5.25l4.5 2.67-.75 1.23L11 13V7h1.5z" />
          </svg>
          <span className="font-serif" style={{ color: "var(--ink-dark)", fontSize: "1.1rem", lineHeight: 1.5 }}>
            {t.rsvpLimite}
            <br />
            <span className="font-semibold">{t.limite}</span>
            <br />
            <span style={{ fontSize: "0.95rem", opacity: 0.85 }}>{t.rsvpLimiteNota}</span>
          </span>
        </div>
      </Stagger>
    </AnimatedCard>
  );
}
