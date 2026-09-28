"use client";

import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeLoader from "./EnvelopeLoader";
import LangGate from "./LangGate";
import AudioPlayer, { type AudioAPI } from "./AudioPlayer";
import Petals from "./Petals";
import CoverCard from "./cards/CoverCard";
import HistoriaCard from "./cards/HistoriaCard";
import HeroCard from "./cards/HeroCard";
import VerseCard from "./cards/VerseCard";
import CountdownCard from "./cards/CountdownCard";
import PadrinosCard from "./cards/PadrinosCard";
import CeremonyCard from "./cards/CeremonyCard";
import ReceptionCard from "./cards/ReceptionCard";
import ItineraryCard from "./cards/ItineraryCard";
import GalleryCard from "./cards/GalleryCard";
import WeatherCard from "./cards/WeatherCard";
import DressCodeCard from "./cards/DressCodeCard";
import NotesCard from "./cards/NotesCard";
import HotelsCard from "./cards/HotelsCard";
import GiftsCard from "./cards/GiftsCard";
import GiftBoxCard from "./cards/GiftBoxCard";
import AlbumCard from "./cards/AlbumCard";
import RSVPCard from "./cards/RSVPCard";
import { FECHA_BODA, DIA, ANIO } from "../_data/fecha";
import { LangProvider, T, useLangGuardado, type Lang } from "../_data/idioma";

function Pie({ lang }: { lang: Lang }) {
  const t = T[lang];
  const mes = FECHA_BODA ? t.mes(FECHA_BODA.getMonth(), "DICIEMBRE") : "";
  return (
    <footer className="text-center mt-4 mb-8">
      <div className="divider" />
      <p className="font-script mt-4 foil" style={{ fontSize: "2.2rem" }}>
        Antonio &amp; Yasareth
      </p>
      <p className="font-sans-label mt-2" style={{ color: "var(--ink-dark)", fontSize: "0.8rem", fontWeight: 600 }}>
        {DIA} &middot; {mes} &middot; {ANIO}
      </p>
      <p className="font-sans-label mt-4" style={{ color: "var(--ink-dark)", fontSize: "0.66rem", fontWeight: 500 }}>
        {t.pieCredito}{" "}
        <a
          href="https://instagram.com/elysium.invitaciones"
          target="_blank"
          rel="noopener noreferrer"
          className="credito-link"
          style={{ color: "var(--olive-soft)", textDecoration: "none" }}
        >
          @ELYSIUM
        </a>
      </p>
    </footer>
  );
}

export default function InvitationClient() {
  const [phase, setPhase] = useState<"envelope" | "cards">("envelope");
  const audio = useRef<AudioAPI>(null);
  const { lang, setLang, listo } = useLangGuardado();

  // hasta leer localStorage no se pinta nada: evita el parpadeo de la portada
  if (!listo) return null;

  if (!lang) {
    return (
      <AnimatePresence>
        <LangGate key="gate" onPick={setLang} />
      </AnimatePresence>
    );
  }

  return (
    <LangProvider lang={lang} setLang={setLang}>
      <AudioPlayer ref={audio} />

      {phase === "cards" && (
        <div className="lang-switch" role="group" aria-label="Idioma / Language">
          <button type="button" onClick={() => setLang("es")} aria-pressed={lang === "es"} lang="es">
            ES
          </button>
          <button type="button" onClick={() => setLang("en")} aria-pressed={lang === "en"} lang="en">
            EN
          </button>
        </div>
      )}

      <AnimatePresence>
        {phase === "envelope" && (
          <EnvelopeLoader
            key="env"
            onOpen={() => setPhase("cards")}
            /* el play va dentro del gesto de abrir el sobre: si se llama
               despues, el navegador lo bloquea por autoplay */
            onTap={() => audio.current?.play()}
          />
        )}
      </AnimatePresence>

      {phase === "cards" && <Petals />}

      {phase === "cards" && <CoverCard />}

      {phase === "cards" && (
        <main className="relative z-10 flex flex-col items-center py-8 px-4 max-w-[500px] mx-auto">
          <HistoriaCard />
          <HeroCard />
          <VerseCard />
          <CountdownCard />
          <PadrinosCard />
          <CeremonyCard />
          <ReceptionCard />
          <ItineraryCard />
          <GalleryCard />
          <WeatherCard />
          <DressCodeCard />
          <NotesCard />
          <HotelsCard />
          <GiftsCard />
          {/* PENDIENTE: <GiftBoxCard /> vuelve en cuanto el cliente mande
              banco, titular y CLABE. No se publica con datos de otra boda. */}
          <AlbumCard />
          <RSVPCard />
          <Pie lang={lang} />
        </main>
      )}
    </LangProvider>
  );
}
