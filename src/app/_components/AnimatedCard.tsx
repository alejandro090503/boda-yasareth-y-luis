"use client";

import { motion, Variants, Transition, TargetAndTransition } from "framer-motion";
import { ReactNode } from "react";
import { LeafCorners, CornerVariant, CornerSpot } from "./Ornaments";

export type CardAnim =
  | "rise"
  | "slideLeft"
  | "slideRight"
  | "zoom"
  | "unfold"
  | "flip"
  | "blurRise"
  | "rotateIn";

const EASE_ELEGANT = [0.22, 0.61, 0.36, 1] as const;

const variants: Record<
  CardAnim,
  { initial: TargetAndTransition; animate: TargetAndTransition; transition: Transition }
> = {
  // sube con desvanecido
  rise: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE_ELEGANT },
  },
  // entra deslizando desde la izquierda
  slideLeft: {
    initial: { opacity: 0, x: -70, rotate: -1.5 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.75, ease: EASE_ELEGANT },
  },
  // entra deslizando desde la derecha
  slideRight: {
    initial: { opacity: 0, x: 70, rotate: 1.5 },
    animate: { opacity: 1, x: 0, rotate: 0 },
    transition: { duration: 0.75, ease: EASE_ELEGANT },
  },
  // aparece haciendo zoom suave
  zoom: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: EASE_ELEGANT },
  },
  // se despliega desde arriba (bisagra 3D)
  unfold: {
    initial: { opacity: 0, rotateX: -75, transformPerspective: 900 },
    animate: { opacity: 1, rotateX: 0, transformPerspective: 900 },
    transition: { duration: 0.85, ease: EASE_ELEGANT },
  },
  // giro 3D lateral tipo página
  flip: {
    initial: { opacity: 0, rotateY: -38, transformPerspective: 1000 },
    animate: { opacity: 1, rotateY: 0, transformPerspective: 1000 },
    transition: { duration: 0.85, ease: EASE_ELEGANT },
  },
  // sube saliendo de desenfoque
  blurRise: {
    initial: { opacity: 0, y: 45, filter: "blur(10px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.8, ease: EASE_ELEGANT },
  },
  // rota levemente al entrar con escala
  rotateIn: {
    initial: { opacity: 0, scale: 0.85, rotate: -5 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    transition: { duration: 0.8, ease: EASE_ELEGANT },
  },
};

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  anim?: CardAnim;
  /** Diseno de esquina botanica (1-4). Por defecto van APAGADAS: la novia las
   *  pidio fuera en toda la invitacion. Se pasa un numero para encenderlas en
   *  una tarjeta concreta. */
  corners?: CornerVariant | false;
  /** En que esquinas va. Por defecto en diagonal. */
  cornerSpots?: CornerSpot[];
  cornerSize?: number;
  cornerTilt?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  anim = "rise",
  corners = false as CornerVariant | false,
  cornerSpots,
  cornerSize = 86,
  cornerTilt = -35,
}: Props) {
  const v = variants[anim];
  return (
    <motion.div
      className={`card-base ${className}`}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ ...v.transition, delay }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {corners && (
        <LeafCorners variant={corners} spots={cornerSpots} size={cornerSize} tilt={cornerTilt} />
      )}

      <motion.div
        /* El contenido va por delante de las esquinas botanicas */
        style={{ position: "relative", zIndex: 3 }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: 0.15 + delay, staggerChildren: 0.09 },
          },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

const childVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_ELEGANT } },
};

export function Stagger({ children }: { children: ReactNode }) {
  return <motion.div variants={childVariants}>{children}</motion.div>;
}
