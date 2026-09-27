/**
 * Fecha de la boda de Sebastián y Diana: sábado 26 de diciembre de 2026.
 *
 * De aquí salen la portada, el contador, el pronóstico del clima, el pie de
 * página y la metadata. Si la fecha cambiara, se cambia solo este `return`
 * (ojo: el mes va de 0 a 11, así que enero es 0).
 */
function leerFecha(): Date | null {
  return new Date(2026, 11, 26);
}

export const FECHA_BODA: Date | null = leerFecha();

const MESES = [
  "ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
  "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE",
];

const MESES_LARGO = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

export const hayFecha = FECHA_BODA !== null;

/** "01", o "" mientras no haya fecha */
export const DIA = FECHA_BODA ? String(FECHA_BODA.getDate()).padStart(2, "0") : "";
/** "MAYO", o "" mientras no haya fecha */
export const MES = FECHA_BODA ? MESES[FECHA_BODA.getMonth()] : "";
/** "2027", o "" mientras no haya fecha */
export const ANIO = FECHA_BODA ? String(FECHA_BODA.getFullYear()) : "";

/** "01 · MAYO · 2027" o "FECHA POR CONFIRMAR" (pie de página) */
export const FECHA_PUNTEADA = FECHA_BODA
  ? `${DIA} · ${MES} · ${ANIO}`
  : "FECHA POR CONFIRMAR";

/** "1 de mayo de 2027" o "Fecha por confirmar" (metadata y textos corridos) */
export const FECHA_LARGA = FECHA_BODA
  ? `${FECHA_BODA.getDate()} de ${MESES_LARGO[FECHA_BODA.getMonth()]} de ${FECHA_BODA.getFullYear()}`
  : "Fecha por confirmar";
