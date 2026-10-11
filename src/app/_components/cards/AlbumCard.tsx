"use client";

import { useEffect, useState } from "react";
import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";

/**
 * Album de fotos estandar de Elysium: el QR (public/qr-album.png) abre /album,
 * que vercel.json redirige a panel-invitados.vercel.app/subir/yasareth-y-luis.
 * El album se habilita el dia del evento (la base ademas rechaza fotos antes).
 */
const FECHA_ALBUM = "2026-12-26";

const HASHTAG = "#YasarethyLuis2026";

export default function AlbumCard() {
  const { t } = useLang();
  const [bloqueado, setBloqueado] = useState(false);
  useEffect(() => {
    // Se desbloquea solo el dia del evento
    const [y, m, d] = FECHA_ALBUM.split("-").map(Number);
    setBloqueado(new Date() < new Date(y, m - 1, d, 0, 0, 0));
  }, []);
  return (
    <AnimatedCard className="tex-beige text-center py-9" anim="slideLeft">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.albumEyebrow}
        </p>
      </Stagger>

      <Stagger>
        <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.9rem", lineHeight: 1.05 }}>
          {t.albumTitulo}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={100} color="var(--green-line)" />
        </div>
      </Stagger>

      <Stagger>
        <p
          className="font-serif italic mx-auto px-2"
          style={{ color: "var(--ink-dark)", fontSize: "1.25rem", lineHeight: 1.6, maxWidth: "310px" }}
        >
          {t.albumSub}
        </p>
      </Stagger>

      <Stagger>
        <div
          className={"album-qr flex flex-col items-center mt-5" + (bloqueado ? " bloqueado" : "")}
          data-fecha={FECHA_ALBUM}
          style={{ gap: 16 }}
        >
          <div
            style={{
              display: "block",
              padding: 14,
              borderRadius: 4,
              backgroundColor: "#FFFFFF",
              border: "1px solid var(--gold-antique)",
              boxShadow: "0 8px 22px rgba(22,32,46,0.16)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/qr-album.png"
              alt={t.albumQrAlt}
              width={168}
              height={168}
              style={{
                display: "block",
                width: 168,
                height: 168,
                filter: bloqueado ? "blur(7px)" : "none",
                opacity: bloqueado ? 0.75 : 1,
              }}
            />
          </div>
          <a
            className="album-btn font-sans-label"
            href="/album"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 46,
              padding: "12px 30px",
              borderRadius: 999,
              border: "1px solid var(--olive-primary)",
              backgroundColor: "var(--olive-primary)",
              color: "#FFFFFF",
              fontSize: "0.8rem",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 8px 22px rgba(22,32,46,0.16)",
              pointerEvents: bloqueado ? "none" : "auto",
              opacity: bloqueado ? 0.45 : 1,
            }}
          >
            {t.albumBtn}
          </a>
        </div>
      </Stagger>

      {/* Sin <Stagger>: el aviso se monta DESPUÉS del primer render (bloqueado
          se calcula en un efecto) y los hijos tardíos de Stagger se quedan en
          opacity:0 porque su disparo por scroll ya pasó. */}
      {bloqueado && (
        <p
          className="album-aviso font-serif italic mx-auto px-2 mt-4"
          style={{ color: "var(--ink-dark)", fontSize: "1.1rem", lineHeight: 1.6, maxWidth: "300px" }}
        >
          {t.albumAviso}
        </p>
      )}

      {/* Hashtag de Instagram: se conserva junto al álbum */}
      <Stagger>
        <p className="font-script mt-4 foil" style={{ fontSize: "1.9rem", lineHeight: 1.2 }}>
          {HASHTAG}
        </p>
      </Stagger>
    </AnimatedCard>
  );
}
