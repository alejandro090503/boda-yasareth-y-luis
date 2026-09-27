"use client";

/* Adornos botánicos de línea elegante en la paleta de la boda. */

export function OliveBranch({
  className = "",
  color = "var(--green-line)",
  width = 90,
  flip = false,
}: {
  className?: string;
  color?: string;
  width?: number;
  flip?: boolean;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 0.5}
      viewBox="0 0 200 100"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      <path d="M10 50 Q70 45 190 50" />
      {[30, 55, 80, 105, 130, 155].map((x, i) => {
        const up = i % 2 === 0;
        const dy = up ? -1 : 1;
        return (
          <g key={x}>
            <path d={`M${x} 50 Q${x + 8} ${50 + dy * 16} ${x + 20} ${50 + dy * 20}`} />
            <ellipse
              cx={x + 14}
              cy={50 + dy * 18}
              rx="9"
              ry="4"
              fill={color}
              opacity="0.18"
              stroke="none"
              transform={`rotate(${dy * 30} ${x + 14} ${50 + dy * 18})`}
            />
          </g>
        );
      })}
      {/* olives */}
      <ellipse cx="70" cy="42" rx="4" ry="6" fill={color} opacity="0.35" stroke="none" />
      <ellipse cx="120" cy="60" rx="4" ry="6" fill={color} opacity="0.35" stroke="none" />
    </svg>
  );
}

export function FloralSprig({
  className = "",
  color = "var(--terracotta)",
  leaf = "var(--olive-soft)",
  width = 60,
}: {
  className?: string;
  color?: string;
  leaf?: string;
  width?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height={width * 1.3}
      viewBox="0 0 100 130"
      fill="none"
      aria-hidden="true"
    >
      <path d="M50 130 Q48 80 50 40" stroke={leaf} strokeWidth="1.4" strokeLinecap="round" />
      {/* leaves */}
      <ellipse cx="35" cy="95" rx="11" ry="5" fill={leaf} opacity="0.25" transform="rotate(-35 35 95)" />
      <ellipse cx="66" cy="80" rx="11" ry="5" fill={leaf} opacity="0.25" transform="rotate(35 66 80)" />
      <ellipse cx="38" cy="65" rx="9" ry="4" fill={leaf} opacity="0.25" transform="rotate(-35 38 65)" />
      {/* blossom - 5 petals */}
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse
          key={a}
          cx="50"
          cy="26"
          rx="6"
          ry="11"
          fill={color}
          opacity="0.55"
          transform={`rotate(${a} 50 34)`}
        />
      ))}
      <circle cx="50" cy="34" r="4" fill="var(--gold-antique)" opacity="0.8" />
    </svg>
  );
}

export function Flourish({
  className = "",
  color = "var(--gold-antique)",
  width = 120,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  return (
    <svg
      className={className}
      width={width}
      height="16"
      viewBox="0 0 240 32"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M20 16 H95" opacity="0.6" />
      <path d="M145 16 H220" opacity="0.6" />
      <path d="M95 16 Q108 6 120 16 Q132 26 145 16" />
      <circle cx="120" cy="16" r="2.5" fill={color} stroke="none" />
      <circle cx="20" cy="16" r="1.5" fill={color} stroke="none" opacity="0.6" />
      <circle cx="220" cy="16" r="1.5" fill={color} stroke="none" opacity="0.6" />
    </svg>
  );
}

export function WaxSeal({ size = 54, className = "" }: { size?: number; className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background:
          "radial-gradient(circle at 35% 30%, #c9a366, var(--gold-antique) 55%, #856331)",
        boxShadow:
          "0 3px 9px rgba(59,48,40,0.3), inset 0 1px 3px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2)",
      }}
      aria-hidden="true"
    >
      <span
        className="font-script select-none"
        style={{
          color: "var(--bg-cream)",
          fontSize: size * 0.42,
          lineHeight: 1,
          textShadow: "0 1px 2px rgba(0,0,0,0.25)",
        }}
      >
        AC
      </span>
    </div>
  );
}

/* ── Esquinas botanicas ──────────────────────────────────────────────
   Acuarelas reales (public/esquinas/e1..e4.png), no dibujadas a mano.
   Cada tarjeta elige su diseno para que no se repita el mismo adorno a lo
   largo de la invitacion. Las ramas se espejan segun la esquina para que
   siempre apunten hacia adentro. */

export type CornerVariant = 1 | 2 | 3 | 4;
export type CornerSpot = "tl" | "tr" | "bl" | "br";

const FLIP: Record<CornerSpot, string> = {
  tl: "none",
  tr: "scaleX(-1)",
  bl: "scaleY(-1)",
  br: "scale(-1, -1)",
};

export function CornerArt({
  variant = 1,
  position = "tl",
  size = 86,
  opacity = 0.8,
  inset = -16,
  tilt = -35,
}: {
  variant?: CornerVariant;
  position?: CornerSpot;
  size?: number;
  opacity?: number;
  inset?: number;
  /** Giro extra, en grados, para recostar la rama sobre el marco en vez de
   *  dejarla entrar hacia el texto. Se aplica despues del espejo. */
  tilt?: number;
}) {
  const pos: React.CSSProperties =
    position === "tl"
      ? { top: inset, left: inset }
      : position === "tr"
        ? { top: inset, right: inset }
        : position === "bl"
          ? { bottom: inset, left: inset }
          : { bottom: inset, right: inset };

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/esquinas/e${variant}.png`}
      alt=""
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        ...pos,
        width: size,
        height: "auto",
        opacity,
        transform: `${FLIP[position]} rotate(${tilt}deg)`,
        transformOrigin: "center",
        zIndex: 1,
      }}
    />
  );
}

/* Las esquinas de una tarjeta. Por defecto van en diagonal: se ve mas fino
   que rodear la tarjeta entera, y deja respirar el texto. */
export function LeafCorners({
  variant = 1,
  spots = ["tl", "br"],
  size = 86,
  opacity = 0.8,
  tilt = -35,
}: {
  variant?: CornerVariant;
  spots?: CornerSpot[];
  size?: number;
  opacity?: number;
  tilt?: number;
}) {
  return (
    <>
      {spots.map((sp) => (
        <CornerArt key={sp} variant={variant} position={sp} size={size} opacity={opacity} tilt={tilt} />
      ))}
    </>
  );
}
