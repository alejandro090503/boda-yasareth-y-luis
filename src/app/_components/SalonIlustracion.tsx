"use client";

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
        <g>
          <path d="M112 221 C80 221 42 204 27 158" strokeWidth="1.25" />
          <path d="M0 0 Q6.8 -4.0 13.5 0 Q6.8 4.0 0 0Z" transform="translate(96.3 219.6) rotate(-208.2)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.8 -4.0 13.5 0 Q6.8 4.0 0 0Z" transform="translate(96.3 219.6) rotate(-132.2)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.5 -3.9 12.9 0 Q6.5 3.9 0 0Z" transform="translate(82.4 216.1) rotate(-199.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.5 -3.9 12.9 0 Q6.5 3.9 0 0Z" transform="translate(82.4 216.1) rotate(-123.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.2 -3.7 12.4 0 Q6.2 3.7 0 0Z" transform="translate(68.7 210.1) rotate(-189.4)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.2 -3.7 12.4 0 Q6.2 3.7 0 0Z" transform="translate(68.7 210.1) rotate(-113.4)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.9 -3.6 11.8 0 Q5.9 3.6 0 0Z" transform="translate(55.9 201.5) rotate(-178.9)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.9 -3.6 11.8 0 Q5.9 3.6 0 0Z" transform="translate(55.9 201.5) rotate(-102.9)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.7 -3.4 11.3 0 Q5.7 3.4 0 0Z" transform="translate(44.4 190.1) rotate(-167.8)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.7 -3.4 11.3 0 Q5.7 3.4 0 0Z" transform="translate(44.4 190.1) rotate(-91.8)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.4 -3.2 10.8 0 Q5.4 3.2 0 0Z" transform="translate(34.6 175.6) rotate(-156.7)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.4 -3.2 10.8 0 Q5.4 3.2 0 0Z" transform="translate(34.6 175.6) rotate(-80.7)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.1 -3.1 10.2 0 Q5.1 3.1 0 0Z" transform="translate(27.9 160.7) rotate(-147.5)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.1 -3.1 10.2 0 Q5.1 3.1 0 0Z" transform="translate(27.9 160.7) rotate(-71.5)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.5 -3.3 11.0 0 Q5.5 3.3 0 0Z" transform="translate(27.0 158.0) rotate(-108.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
        </g>
        <g transform="translate(240 0) scale(-1 1)">
          <path d="M112 221 C80 221 42 204 27 158" strokeWidth="1.25" />
          <path d="M0 0 Q6.8 -4.0 13.5 0 Q6.8 4.0 0 0Z" transform="translate(96.3 219.6) rotate(-208.2)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.8 -4.0 13.5 0 Q6.8 4.0 0 0Z" transform="translate(96.3 219.6) rotate(-132.2)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.5 -3.9 12.9 0 Q6.5 3.9 0 0Z" transform="translate(82.4 216.1) rotate(-199.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.5 -3.9 12.9 0 Q6.5 3.9 0 0Z" transform="translate(82.4 216.1) rotate(-123.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.2 -3.7 12.4 0 Q6.2 3.7 0 0Z" transform="translate(68.7 210.1) rotate(-189.4)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q6.2 -3.7 12.4 0 Q6.2 3.7 0 0Z" transform="translate(68.7 210.1) rotate(-113.4)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.9 -3.6 11.8 0 Q5.9 3.6 0 0Z" transform="translate(55.9 201.5) rotate(-178.9)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.9 -3.6 11.8 0 Q5.9 3.6 0 0Z" transform="translate(55.9 201.5) rotate(-102.9)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.7 -3.4 11.3 0 Q5.7 3.4 0 0Z" transform="translate(44.4 190.1) rotate(-167.8)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.7 -3.4 11.3 0 Q5.7 3.4 0 0Z" transform="translate(44.4 190.1) rotate(-91.8)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.4 -3.2 10.8 0 Q5.4 3.2 0 0Z" transform="translate(34.6 175.6) rotate(-156.7)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.4 -3.2 10.8 0 Q5.4 3.2 0 0Z" transform="translate(34.6 175.6) rotate(-80.7)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.1 -3.1 10.2 0 Q5.1 3.1 0 0Z" transform="translate(27.9 160.7) rotate(-147.5)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.1 -3.1 10.2 0 Q5.1 3.1 0 0Z" transform="translate(27.9 160.7) rotate(-71.5)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
          <path d="M0 0 Q5.5 -3.3 11.0 0 Q5.5 3.3 0 0Z" transform="translate(27.0 158.0) rotate(-108.1)" fill="url(#salonOro)" fillOpacity="0.9" strokeWidth="0.6" />
        </g>
        {/* lazo que une las dos ramas */}
        <path d="M112 221 Q120 226 128 221" strokeWidth="1.25" />
        <circle cx="120" cy="223.6" r="1.9" fill="url(#salonOro)" stroke="none" />

        {/* ── escalinata ── */}
        <path d="M58 186 H182" strokeWidth="2.1" />
        <path d="M64 180 H176" />
        <path d="M70 174 H170" />
        <path d="M58 186 V183 M182 186 V183 M64 180 V177 M176 180 V177" strokeWidth="1.1" />

        {/* ── columnas ── */}
        <path d="M75 170 V106 M81 170 V106" />
        <path d="M72.5 106 H83.5 M71.5 102.5 H84.5" strokeWidth="1.5" />
        <path d="M72.5 170 H83.5 M71.5 173.5 H84.5" strokeWidth="1.5" />
        <path d="M78 112 V166" strokeWidth="0.7" strokeOpacity="0.4" />
        <path d="M95 170 V106 M101 170 V106" />
        <path d="M92.5 106 H103.5 M91.5 102.5 H104.5" strokeWidth="1.5" />
        <path d="M92.5 170 H103.5 M91.5 173.5 H104.5" strokeWidth="1.5" />
        <path d="M98 112 V166" strokeWidth="0.7" strokeOpacity="0.4" />
        <path d="M139 170 V106 M145 170 V106" />
        <path d="M136.5 106 H147.5 M135.5 102.5 H148.5" strokeWidth="1.5" />
        <path d="M136.5 170 H147.5 M135.5 173.5 H148.5" strokeWidth="1.5" />
        <path d="M142 112 V166" strokeWidth="0.7" strokeOpacity="0.4" />
        <path d="M159 170 V106 M165 170 V106" />
        <path d="M156.5 106 H167.5 M155.5 102.5 H168.5" strokeWidth="1.5" />
        <path d="M156.5 170 H167.5 M155.5 173.5 H168.5" strokeWidth="1.5" />
        <path d="M162 112 V166" strokeWidth="0.7" strokeOpacity="0.4" />

        {/* ── entablamento con friso ── */}
        <path d="M66 100 H174" strokeWidth="2.1" />
        <path d="M62 92 H178" strokeWidth="2.1" />
        <path d="M72 93.5 V98.5 M80 93.5 V98.5 M88 93.5 V98.5 M96 93.5 V98.5 M104 93.5 V98.5 M112 93.5 V98.5 M120 93.5 V98.5 M128 93.5 V98.5 M136 93.5 V98.5 M144 93.5 V98.5 M152 93.5 V98.5 M160 93.5 V98.5 M168 93.5 V98.5" strokeWidth="0.85" strokeOpacity="0.6" />

        {/* ── cupula ── */}
        <path d="M82 92 A38 38 0 0 1 158 92" strokeWidth="2.1" />
        <path d="M120 54 Q97.92 62 96 92" strokeWidth="0.9" strokeOpacity="0.55" />
        <path d="M120 54 Q108.96 62 108 92" strokeWidth="0.9" strokeOpacity="0.55" />
        <path d="M120 54 Q131.04 62 132 92" strokeWidth="0.9" strokeOpacity="0.55" />
        <path d="M120 54 Q142.08 62 144 92" strokeWidth="0.9" strokeOpacity="0.55" />
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
        <path d="M120 128 L130.8 121.8 M120 128 L126.2 117.2 M120 128 L120.0 115.5 M120 128 L113.8 117.2 M120 128 L109.2 121.8" strokeWidth="0.75" strokeOpacity="0.55" />
        <path d="M120 128 V172" strokeWidth="1.1" />
        <circle cx="117.2" cy="152" r="1.05" fill="url(#salonOro)" stroke="none" />
        <circle cx="122.8" cy="152" r="1.05" fill="url(#salonOro)" stroke="none" />
        <path d="M112 136 H118 V166 H112Z M122 136 H128 V166 H122Z" strokeWidth="0.7" strokeOpacity="0.42" />

        {/* ── ventanas laterales ── */}
        <path d="M83.5 164 V135 a4.5 4.5 0 0 1 9 0 V164Z" strokeWidth="1.1" />
        <path d="M88 132 V164 M83.5 148 H92.5" strokeWidth="0.7" strokeOpacity="0.5" />
        <path d="M147.5 164 V135 a4.5 4.5 0 0 1 9 0 V164Z" strokeWidth="1.1" />
        <path d="M152 132 V164 M147.5 148 H156.5" strokeWidth="0.7" strokeOpacity="0.5" />

        {/* ── destellos ── */}
        <path d="M50 73.8 V82.2 M45.8 78 H54.2" strokeWidth="0.9" strokeOpacity="0.7" />
        <path d="M190 65 V75 M185 70 H195" strokeWidth="0.9" strokeOpacity="0.7" />
        <path d="M176 43.2 V48.8 M173.2 46 H178.8" strokeWidth="0.9" strokeOpacity="0.7" />
        <path d="M64 47.4 V52.6 M61.4 50 H66.6" strokeWidth="0.9" strokeOpacity="0.7" />
      </g>
    </svg>
  );
}
