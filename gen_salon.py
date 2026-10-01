# -*- coding: utf-8 -*-
"""Genera SalonIlustracion.tsx: pabellon clasico en linea fina + laurel.

Las hojas del laurel se colocan sobre una curva de Bezier y se orientan con
su tangente, por eso se calculan aqui en vez de escribirse a mano.
"""
import io, math

CX = 120.0

def bez(p0, p1, p2, p3, t):
    u = 1 - t
    x = u**3*p0[0] + 3*u*u*t*p1[0] + 3*u*t*t*p2[0] + t**3*p3[0]
    y = u**3*p0[1] + 3*u*u*t*p1[1] + 3*u*t*t*p2[1] + t**3*p3[1]
    dx = 3*u*u*(p1[0]-p0[0]) + 6*u*t*(p2[0]-p1[0]) + 3*t*t*(p3[0]-p2[0])
    dy = 3*u*u*(p1[1]-p0[1]) + 6*u*t*(p2[1]-p1[1]) + 3*t*t*(p3[1]-p2[1])
    return x, y, math.degrees(math.atan2(dy, dx))

# rama izquierda: nace abajo al centro y sube abrazando el medallon
P = [(112, 221), (80, 221), (42, 204), (27, 158)]
hojas = []
TS = [0.16, 0.30, 0.44, 0.58, 0.72, 0.86, 0.98]
for i, t in enumerate(TS):
    x, y, ang = bez(*P, t)
    largo = 13.5 - i * 0.55                    # las hojas se afinan hacia la punta
    for lado in (-1, 1):
        # cada hoja se abre ~38 grados respecto a la rama
        a = ang + lado * 38
        hojas.append((x, y, a, largo))
# hoja terminal, alineada con la rama
x, y, ang = bez(*P, 1.0)
hojas.append((x, y, ang, 11))

def hoja_path(largo):
    w = largo * 0.30
    return "M0 0 Q%.1f %.1f %.1f 0 Q%.1f %.1f 0 0Z" % (largo/2, -w, largo, largo/2, w)

def rama(espejo):
    out = []
    tr = ' transform="translate(240 0) scale(-1 1)"' if espejo else ""
    out.append('        <g%s>' % tr)
    out.append('          <path d="M%g %g C%g %g %g %g %g %g" strokeWidth="1.25" />'
               % (P[0][0], P[0][1], P[1][0], P[1][1], P[2][0], P[2][1], P[3][0], P[3][1]))
    for (x, y, a, largo) in hojas:
        out.append('          <path d="%s" transform="translate(%.1f %.1f) rotate(%.1f)" '
                   'fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />'
                   % (hoja_path(largo), x, y, a))
    out.append('        </g>')
    return "\n".join(out)

# gajos de la cupula: arcos del remate a la base
gajos = []
for bx in (96, 108, 132, 144):
    gajos.append('        <path d="M120 54 Q%g 62 %g 92" strokeWidth="0.9" strokeOpacity="0.55" />'
                 % (120 + (bx - 120) * 0.92, bx))

# dentellones del friso
dent = " ".join("M%d 93.5 V98.5" % x for x in range(72, 172, 8))

# columnas (dos trazos + capitel + basa)
cols = []
for x in (78, 98, 142, 162):
    cols.append('        <path d="M%g 170 V106 M%g 170 V106" />' % (x - 3, x + 3))
    cols.append('        <path d="M%g 106 H%g M%g 102.5 H%g" strokeWidth="1.5" />' % (x - 5.5, x + 5.5, x - 6.5, x + 6.5))
    cols.append('        <path d="M%g 170 H%g M%g 173.5 H%g" strokeWidth="1.5" />' % (x - 5.5, x + 5.5, x - 6.5, x + 6.5))
    cols.append('        <path d="M%g 112 V166" strokeWidth="0.7" strokeOpacity="0.4" />' % x)

# ventanas laterales en arco, con cruceta
vent = []
for c in (88, 152):
    vent.append('        <path d="M%g 164 V135 a4.5 4.5 0 0 1 9 0 V164Z" strokeWidth="1.1" />' % (c - 4.5))
    vent.append('        <path d="M%g 132 V164 M%g 148 H%g" strokeWidth="0.7" strokeOpacity="0.5" />' % (c, c - 4.5, c + 4.5))

# luneta de la puerta: radios
radios = " ".join("M120 128 L%.1f %.1f" % (120 + 12.5 * math.cos(math.radians(a)),
                                          128 - 12.5 * math.sin(math.radians(a)))
                  for a in (30, 60, 90, 120, 150))

# destellos
def destello(x, y, r):
    return ('        <path d="M%g %g V%g M%g %g H%g" strokeWidth="0.9" strokeOpacity="0.7" />'
            % (x, y - r, y + r, x - r, y, x + r))

TSX = '''"use client";

/**
 * Ilustracion del salon de la recepcion: un pabellon clasico en linea fina,
 * abrazado por dos ramas de laurel.
 *
 * Es un SVG y no un PNG a proposito: el medallon mide 190 px en telefono y
 * 232 px en pantalla grande, y en retina se dibuja al doble o al triple; un
 * mapa de bits se ensucia en los bordes del trazo. Asi queda nitido en
 * cualquier tamano y pesa unos pocos kB.
 *
 * Dos grosores de trazo dan la jerarquia: la estructura (cupula, columnas,
 * escalinata) va gruesa y el detalle (gajos, friso, luneta, hojas) fino. Todo
 * en el oro de la paleta. El archivo lo genera `gen_salon.py`, porque las
 * hojas del laurel se orientan con la tangente de la rama.
 *
 * Cuando llegue la foto real del salon, esta ilustracion se retira y vuelve
 * el medallon con foto.
 */
export default function SalonIlustracion({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 240"
      className={className}
      role="img"
      aria-label="Ilustración del salón de la recepción"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <linearGradient id="salonOro" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6b4408" />
          <stop offset="24%" stopColor="#996515" />
          <stop offset="50%" stopColor="#cf9b38" />
          <stop offset="76%" stopColor="#996515" />
          <stop offset="100%" stopColor="#6b4408" />
        </linearGradient>
        <radialGradient id="salonLuz" cx="50%" cy="62%" r="42%">
          <stop offset="0%" stopColor="#FBEEC0" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FBEEC0" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* resplandor calido detras del pabellon */}
      <circle cx="120" cy="140" r="78" fill="url(#salonLuz)" />

      <g
        fill="none"
        stroke="url(#salonOro)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ── laurel ── */}
__RAMA_IZQ__
__RAMA_DER__
        {/* lazo que une las dos ramas */}
        <path d="M112 221 Q120 226 128 221" strokeWidth="1.25" />
        <circle cx="120" cy="223.6" r="1.9" fill="url(#salonOro)" stroke="none" />

        {/* ── escalinata ── */}
        <path d="M58 186 H182" strokeWidth="2.1" />
        <path d="M64 180 H176" />
        <path d="M70 174 H170" />
        <path d="M58 186 V183 M182 186 V183 M64 180 V177 M176 180 V177" strokeWidth="1.1" />

        {/* ── columnas ── */}
__COLUMNAS__

        {/* ── entablamento con friso ── */}
        <path d="M66 100 H174" strokeWidth="2.1" />
        <path d="M62 92 H178" strokeWidth="2.1" />
        <path d="__DENT__" strokeWidth="0.85" strokeOpacity="0.6" />

        {/* ── cupula ── */}
        <path d="M82 92 A38 38 0 0 1 158 92" strokeWidth="2.1" />
__GAJOS__
        <path d="M120 54 V92" strokeWidth="0.9" strokeOpacity="0.55" />
        {/* linterna y remate */}
        <path d="M115 54 V46 H125 V54" strokeWidth="1.5" />
        <path d="M113 46 H127" strokeWidth="1.5" />
        <circle cx="120" cy="41.5" r="3.1" strokeWidth="1.4" />
        <path d="M120 38 V30" strokeWidth="1.3" />
        <circle cx="120" cy="28.5" r="1.6" fill="url(#salonOro)" stroke="none" />

        {/* ── puerta en arco con luneta ── */}
        <path d="M106 172 V128 A14 14 0 0 1 134 128 V172" strokeWidth="1.9" />
        <path d="M109.5 172 V128 A10.5 10.5 0 0 1 130.5 128 V172" strokeWidth="0.9" strokeOpacity="0.5" />
        <path d="M107 128 H133" strokeWidth="1.1" />
        <path d="__RADIOS__" strokeWidth="0.75" strokeOpacity="0.55" />
        <path d="M120 128 V172" strokeWidth="1.1" />
        <circle cx="117.2" cy="152" r="1.05" fill="url(#salonOro)" stroke="none" />
        <circle cx="122.8" cy="152" r="1.05" fill="url(#salonOro)" stroke="none" />
        <path d="M112 136 H118 V166 H112Z M122 136 H128 V166 H122Z" strokeWidth="0.7" strokeOpacity="0.42" />

        {/* ── ventanas laterales ── */}
__VENTANAS__

        {/* ── destellos ── */}
__DESTELLOS__
      </g>
    </svg>
  );
}
'''

TSX = (TSX.replace("__RAMA_IZQ__", rama(False))
          .replace("__RAMA_DER__", rama(True))
          .replace("__COLUMNAS__", "\n".join(cols))
          .replace("__DENT__", dent)
          .replace("__GAJOS__", "\n".join(gajos))
          .replace("__RADIOS__", radios)
          .replace("__VENTANAS__", "\n".join(vent))
          .replace("__DESTELLOS__", "\n".join([destello(50, 78, 4.2), destello(190, 70, 5),
                                                destello(176, 46, 2.8), destello(64, 50, 2.6)])))

io.open(r"C:\Users\aleja\boda-yasareth-y-luis\src\app\_components\SalonIlustracion.tsx",
        "w", encoding="utf-8", newline="").write(TSX)
print("SalonIlustracion.tsx generado  (%d hojas por rama)" % len(hojas))
