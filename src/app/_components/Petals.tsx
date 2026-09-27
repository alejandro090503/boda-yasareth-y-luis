"use client";

/* Partículas premium tipo polvo dorado — flotan DELANTE del contenido. */

type Mote = {
  left: number;   // %
  top: number;    // %
  size: number;   // px
  dx: number;     // px drift x
  dy: number;     // px drift y
  float: number;  // s
  twinkle: number;// s
  delay: number;  // s
  bright: number; // opacidad pico
};

// distribución determinista (sin hidratación inconsistente)
const MOTES: Mote[] = [
  { left: 6, top: 12, size: 4, dx: 14, dy: -20, float: 13, twinkle: 4.5, delay: -2, bright: 0.5 },
  { left: 14, top: 34, size: 2.5, dx: -10, dy: 18, float: 16, twinkle: 5.5, delay: -7, bright: 0.4 },
  { left: 22, top: 62, size: 5, dx: 12, dy: -16, float: 12, twinkle: 6, delay: -4, bright: 0.55 },
  { left: 30, top: 20, size: 3, dx: -14, dy: -12, float: 15, twinkle: 4, delay: -10, bright: 0.45 },
  { left: 38, top: 78, size: 2, dx: 10, dy: 20, float: 18, twinkle: 5, delay: -1, bright: 0.35 },
  { left: 46, top: 46, size: 4.5, dx: -12, dy: -18, float: 14, twinkle: 6.5, delay: -6, bright: 0.55 },
  { left: 54, top: 15, size: 3, dx: 16, dy: 14, float: 17, twinkle: 4.5, delay: -13, bright: 0.4 },
  { left: 62, top: 70, size: 5.5, dx: -10, dy: -20, float: 12, twinkle: 6, delay: -3, bright: 0.6 },
  { left: 70, top: 40, size: 2.5, dx: 12, dy: 16, float: 16, twinkle: 5, delay: -9, bright: 0.4 },
  { left: 78, top: 24, size: 4, dx: -16, dy: -14, float: 15, twinkle: 4, delay: -5, bright: 0.5 },
  { left: 86, top: 60, size: 3, dx: 10, dy: 18, float: 18, twinkle: 5.5, delay: -12, bright: 0.45 },
  { left: 92, top: 34, size: 4.5, dx: -12, dy: -16, float: 13, twinkle: 6, delay: -8, bright: 0.55 },
  { left: 10, top: 84, size: 3.5, dx: 14, dy: -18, float: 16, twinkle: 4.5, delay: -15, bright: 0.5 },
  { left: 34, top: 52, size: 2, dx: -10, dy: 14, float: 19, twinkle: 5, delay: -2, bright: 0.35 },
  { left: 50, top: 88, size: 4, dx: 12, dy: -20, float: 14, twinkle: 6, delay: -11, bright: 0.5 },
  { left: 66, top: 8, size: 3, dx: -14, dy: 16, float: 17, twinkle: 4, delay: -6, bright: 0.45 },
  { left: 82, top: 82, size: 5, dx: 10, dy: -16, float: 13, twinkle: 6.5, delay: -14, bright: 0.55 },
  { left: 18, top: 50, size: 2.5, dx: -12, dy: -14, float: 18, twinkle: 5, delay: -4, bright: 0.4 },
  { left: 42, top: 30, size: 3.5, dx: 14, dy: 18, float: 15, twinkle: 4.5, delay: -10, bright: 0.5 },
  { left: 58, top: 58, size: 2, dx: -10, dy: -18, float: 20, twinkle: 5.5, delay: -7, bright: 0.35 },
  { left: 74, top: 92, size: 4, dx: 12, dy: -14, float: 14, twinkle: 6, delay: -3, bright: 0.5 },
  { left: 90, top: 14, size: 3, dx: -14, dy: 16, float: 16, twinkle: 4, delay: -13, bright: 0.45 },
  { left: 26, top: 6, size: 2.5, dx: 10, dy: 20, float: 19, twinkle: 5, delay: -9, bright: 0.4 },
  { left: 4, top: 46, size: 3.5, dx: 12, dy: -16, float: 15, twinkle: 6, delay: -5, bright: 0.5 },
];

export default function Petals() {
  return (
    <div className="dust-layer" aria-hidden="true">
      {MOTES.map((m, i) => (
        <span
          key={i}
          className="dust-mote"
          style={
            {
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              "--dx": `${m.dx}px`,
              "--dy": `${m.dy}px`,
              "--bright": m.bright,
              animationDuration: `${m.float}s, ${m.twinkle}s`,
              animationDelay: `${m.delay}s, ${m.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
