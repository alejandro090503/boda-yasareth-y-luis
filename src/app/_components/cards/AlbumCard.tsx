"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


/**
 * QR para que los invitados suban sus fotos al album compartido.
 *
 * PENDIENTE: el enlace real del album (Google Fotos / Drive). Mientras el
 * cliente no lo mande, el QR apunta al hashtag de Instagram, que al menos
 * lleva a un sitio valido en vez de a un enlace roto.
 */
const ALBUM_URL = "https://www.instagram.com/explore/tags/YasarethyLuis2026";
const HASHTAG = "#YasarethyLuis2026";

const QR =
  "https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=0&color=16325C&bgcolor=FFFFFF&data=" +
  encodeURIComponent(ALBUM_URL);

export default function AlbumCard() {
  const { t } = useLang();
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
        <div className="flex justify-center mt-5">
          <a
            href={ALBUM_URL}
            target="_blank"
            rel="noopener noreferrer"
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
              src={QR}
              alt={`${t.albumQrAlt} ${HASHTAG}`}
              width={168}
              height={168}
              style={{ display: "block", width: 168, height: 168 }}
            />
          </a>
        </div>
      </Stagger>

      <Stagger>
        <p className="font-script mt-4 foil" style={{ fontSize: "1.9rem", lineHeight: 1.2 }}>
          {HASHTAG}
        </p>
      </Stagger>
    </AnimatedCard>
  );
}
