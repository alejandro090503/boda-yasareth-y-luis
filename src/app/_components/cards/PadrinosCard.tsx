"use client";

import AnimatedCard, { Stagger } from "../AnimatedCard";
import { OliveBranch } from "../Ornaments";
import { useLang } from "../../_data/idioma";


// Los cinco grupos de padrinos, tal como los entrego el cliente.
const PAREJAS = [
  [{ el: "José Guadalupe Acoltzi Ahuatzi", ella: "Araceli Díaz Ahuactzi" }],
  [{ el: "Ian Carlos Badillo Hernández", ella: "Karla Erika Dergal Calderón" }],
  [{ el: "Abel Lemus Ramos", ella: "Magali Lozano Ramírez" }],
  [{ el: "Luis Mario Tlapale Ramírez", ella: "Guadalupe Ahuatzi Reyes" }],
  [{ el: "Martín Gutiérrez Flores", ella: "Guadalupe Ramírez Jiménez" }],
];

export default function PadrinosCard() {
  const { t } = useLang();
  const grupos = [
    { titulo: t.velacion, parejas: PAREJAS[0] },
    { titulo: t.anillos, parejas: PAREJAS[1] },
    { titulo: t.arras, parejas: PAREJAS[2] },
    { titulo: t.lazo, parejas: PAREJAS[3] },
    { titulo: t.bibliaRosario, parejas: PAREJAS[4] },
  ];
  return (
    <AnimatedCard className="tex-beige text-center py-8" anim="slideLeft">
      <Stagger>
        <p
          className="font-sans-label"
          style={{ color: "var(--olive-soft)", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}
        >
          {t.padrinosEyebrow}
        </p>
      </Stagger>

      <Stagger>
        <div className="flex justify-center my-3">
          <OliveBranch width={96} color="var(--green-line)" />
        </div>
      </Stagger>

      {grupos.map((g, gi) => (
        <div
          key={g.titulo}
          className={gi > 0 ? "mt-6 pt-6" : ""}
          style={gi > 0 ? { borderTop: "1px solid var(--beige)" } : {}}
        >
          <Stagger>
            <p className="font-script" style={{ color: "var(--olive-primary)", fontSize: "2.3rem", lineHeight: 1.05 }}>
              {g.titulo}
            </p>
          </Stagger>

          {g.parejas.map((p, i) => (
            <Stagger key={i}>
              <div className="mt-3">
                <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.3rem", lineHeight: 1.45 }}>
                  {p.el}
                </p>
                <p className="font-script my-0.5" style={{ color: "var(--gold-antique)", fontSize: "1.7rem", lineHeight: 1 }}>
                  &amp;
                </p>
                <p className="font-serif font-semibold" style={{ color: "var(--ink-dark)", fontSize: "1.3rem", lineHeight: 1.45 }}>
                  {p.ella}
                </p>
              </div>
            </Stagger>
          ))}
        </div>
      ))}
    </AnimatedCard>
  );
}
