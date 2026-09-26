import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayIcon } from "@heroicons/react/24/outline";
import BottomYouTubePlayer from "../components/BottomYouTubePlayer";
import Footer from "../sections/footer";

const COVER_FRONT = "/timeline/esse.jpeg";
const COVER_BACK = "/timeline/esseback.jpg";
const ESSE_BIO = "/esse/ESSE_BIO.jpg";

const ESSE_PLAYER_ROOT = "esse::2017";

const ESSE_ALBUM_TRACK = {
  title: "EMANUELE MONETTI - ESSE, album completo",
  youtubeEmbed: "https://youtu.be/vwPm2KkO3dY?si=Sg95_xN1Cf12xK8w",
};

const DESCRIPTION =
  "Il nuovo lavoro del cantautore Emanuele Monetti: «ESSE», si tratta di un'opera musicale divisa in cinque brani che ripercorrono le fasi salienti della vita. Un'esperienza musicale al limite della sperimentazione dove le sonorità cercano di interpretare sensazioni e stati d'animo. L'ascoltatore può immergersi in una particolare atmosfera ritrovando il concetto dell'essere e quindi esistere riferito all'esperienza di vita di ogni individuo.";

const esseTracks = [
  {
    roman: "I",
    title: "La nascita",
    hint:
      'Ancora embrione sento il mondo più veloce di me, poi l\'impatto con la materia inorganica: "LA NASCITA"',
    tone: "warm",
    youtubeTitle: "EMANUELE MONETTI - LA NASCITA (ESSE)",
    youtubeEmbed: "https://youtu.be/r-BayW8enQM?si=f949mtpR05gfYLdg",
  },
  {
    roman: "II",
    title: "Primi passi",
    hint: "",
    tone: "slate",
    youtubeTitle: "EMANUELE MONETTI - PRIMI PASSI (ESSE)",
    youtubeEmbed: "https://youtu.be/tR8ptxI5g48?si=M4i-HvNBgwyrntYA",
  },
  {
    roman: "III",
    title: "Voce del cielo",
    hint:
      'La pioggia, il tuono: "VOCE DEL CIELO"… da dietro il vetro comincio a capire',
    tone: "warm",
    youtubeTitle: "EMANUELE MONETTI - VOCE DEL CIELO (ESSE)",
    youtubeEmbed: "https://youtu.be/pSNvmlfwA0g?si=ROgietmlZOeQH0SC",
  },
  {
    roman: "IV",
    title: "L'attesa del non so",
    hint: 'Tra i battiti del cuore "L\'ATTESA DEL NON SO"',
    tone: "slate",
    youtubeTitle: "EMANUELE MONETTI - L'ATTESA DEL NON SO (ESSE)",
    youtubeEmbed: "https://youtu.be/igemsvkBM58?si=48YnMtj6Re5uwRc5",
  },
  {
    roman: "V",
    title: "I ricordi",
    hint: 'I miei giorni, adesso, sempre, ciò che è stato: "I RICORDI"',
    tone: "warm",
    youtubeTitle: "EMANUELE MONETTI - I RICORDI (ESSE)",
    youtubeEmbed: "https://youtu.be/GrstONbxzPo?si=GOuO6r51w5IcfR9V",
  },
];

const ARCHIVE_ROWS = [
  { label: "Anno", value: "2017" },
  { label: "Musiche originali", value: "Emanuele Monetti" },
  { label: "Copertina", value: "Luca Dalmazio — Self-Portrait" },
  { label: "Formato", value: "Opera musicale in cinque parti" },
];

const listenButtonClass =
  "group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-[#3d4a5c] hover:bg-[#3d4a5c] hover:text-[#f8f4ec] sm:gap-3 sm:px-6 sm:py-3";

const backButtonClass =
  "group inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-900 transition-all duration-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white sm:gap-3 sm:px-6 sm:py-3";

const partsEase = [0.22, 0.08, 0.25, 1];

const partsGridVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const partsCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: partsEase },
  },
};

const partListenButtonClass =
  "mt-auto inline-flex h-6 min-h-[24px] max-h-[28px] w-max max-w-full shrink-0 cursor-pointer items-center gap-0.5 self-start rounded-full border border-[#2a3444]/20 bg-transparent px-2 py-0 text-[7px] font-medium uppercase tracking-[0.18em] text-[#2a3444] transition-all duration-300 hover:border-[#9d2b2b]/38 hover:bg-[#2a3444]/[0.04] hover:text-[#9d2b2b] sm:text-[7.5px]";

const esseBackgroundSectionClass =
  "esse-background-section relative min-h-[min(72svh,640px)] overflow-hidden";

const esseBackgroundInnerClass =
  "relative mx-auto flex min-h-[min(72svh,640px)] px-4 py-16 sm:px-6 sm:py-20 md:px-10 lg:px-16";

/** Texture ESSE + overlay scuro — intro e «La radice dell’essere» */
function EsseAtmosphereSection({ children, className = "" }) {
  return (
    <section
      className={[esseBackgroundSectionClass, className].filter(Boolean).join(" ")}
    >
      <img
        src={ESSE_BIO}
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="lazy"
        decoding="async"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[linear-gradient(165deg,rgba(28,36,48,0.88)_0%,rgba(42,52,66,0.78)_42%,rgba(24,30,40,0.92)_100%)]"
        aria-hidden
      />
      {children}
    </section>
  );
}

/** Blocco movimento — stile uniforme (indice d’opera) */
function PartMovement({ roman, title, hint, onListen }) {
  return (
    <article
      className={[
        "relative flex h-full min-h-0 flex-col rounded-sm border p-5 sm:p-5",
        "border-[#c4b8a8]/60 bg-[#faf7f0]/75",
        "shadow-[0_12px_30px_rgba(0,0,0,0.035)]",
        "transition-[transform,background-color,box-shadow,border-color] duration-400 ease-out",
        "hover:-translate-y-[3px] hover:border-[#b5a796]/80 hover:bg-[#faf7f0]/92",
        "hover:shadow-[0_16px_36px_rgba(0,0,0,0.05)]",
        "lg:min-h-[268px] lg:px-4 lg:py-5 xl:px-5",
      ].join(" ")}
    >
      <span className="mb-2 font-serif text-4xl leading-none text-[#9d2b2b] sm:text-[2.35rem] lg:text-[2.5rem]">
        {roman}
      </span>
      <h3
        className={[
          "font-serif text-lg italic leading-snug text-[#1e2838] sm:text-xl lg:text-[1.05rem] lg:leading-snug xl:text-lg",
          hint?.trim() ? "mb-2" : "mb-0 flex-1",
        ].join(" ")}
      >
        {title}
      </h3>
      {hint?.trim() && (
        <>
          <div className="mb-3 h-px w-8 bg-[#b01c24]/45" />
          <p className="mb-3 flex-1 font-serif text-[0.9rem] leading-[1.68] text-[#3d4550] sm:text-[0.92rem] lg:text-[0.84rem] lg:leading-[1.62] xl:text-[0.88rem]">
            {hint}
          </p>
        </>
      )}
      <button type="button" onClick={onListen} className={partListenButtonClass}>
        <PlayIcon className="h-2 w-2 shrink-0 opacity-80 sm:h-2.5 sm:w-2.5" aria-hidden />
        Ascolta
      </button>
    </article>
  );
}

export default function Esse() {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const openEssePlayer = (tracks, keySuffix) => {
    const playerKey = `${ESSE_PLAYER_ROOT}::${keySuffix}`;
    setCurrentPlayer((prev) =>
      prev?.playerKey === playerKey
        ? null
        : {
            playerKey,
            albumTitle: "ESSE",
            coverImage: COVER_FRONT,
            tracks: tracks.map(({ title: trackTitle, youtubeEmbed }) => ({
              title: trackTitle,
              youtubeEmbed,
            })),
          }
    );
  };

  const openAlbumPlayer = () => openEssePlayer([ESSE_ALBUM_TRACK], "album");

  const openPartPlayer = (track) =>
    openEssePlayer(
      [{ title: track.youtubeTitle, youtubeEmbed: track.youtubeEmbed }],
      `part-${track.roman}`
    );

  return (
    <>
      <div className="page-with-bottom-player min-h-[100svh] w-full min-w-0 overflow-x-hidden bg-[#f3efe6] font-sans text-[#1a1816]">
        {/* —— 1. Hero —— */}
        <section className="relative overflow-hidden border-b border-[#e6e1d6]/80">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url(${ESSE_BIO})`,
              backgroundSize: "cover",
              backgroundPosition: "center 38%",
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_18%_20%,rgba(255,252,244,0.92),transparent_58%)]"
            aria-hidden
          />

          <div className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-16 lg:py-24">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
              <header className="order-1 min-w-0 lg:col-start-1 lg:row-start-1">
                <p className="mb-4 text-[10px] uppercase tracking-[0.38em] text-[#9d2b2b] sm:text-[11px]">
                  Album · 2017
                </p>
                <h1 className="mb-5 font-serif text-[clamp(3.2rem,12vw,5.5rem)] leading-[0.92] tracking-[-0.02em] text-[#161616]">
                  ESSE
                </h1>
                <p className="mb-6 text-[10px] uppercase tracking-[0.32em] text-[#5c574f] sm:text-[11px]">
                  Opera musicale in cinque parti
                </p>
                <div className="h-px w-16 bg-[#b01c24] lg:mb-0" />
              </header>

              <figure className="order-2 flex justify-center lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:justify-end">
                <div className="cover-elevated w-full max-w-[min(100%,22rem)] sm:max-w-md lg:max-w-lg">
                  <img
                    src={COVER_FRONT}
                    alt="Copertina album ESSE"
                    className="block h-auto w-full object-contain"
                    width={640}
                    height={640}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </figure>

              <div className="order-3 space-y-2 font-serif text-[0.95rem] leading-[1.7] text-[#4a4540] sm:text-[1.02rem] lg:col-start-1 lg:row-start-2">
                <p>Musiche originali di Emanuele Monetti</p>
                <p className="text-[#5c574f]">
                  In copertina l&apos;opera del pittore Luca Dalmazio: «Self-Portrait»
                </p>
              </div>

              <div className="order-4 flex flex-wrap items-center gap-3 lg:col-start-1 lg:row-start-3">
                <button
                  type="button"
                  onClick={openAlbumPlayer}
                  className={listenButtonClass}
                >
                  <PlayIcon className="h-4 w-4 shrink-0" aria-hidden />
                  Ascolta
                </button>
                <Link to="/#timeline" className={backButtonClass}>
                  <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
                    ←
                  </span>
                  Torna al Diario
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* —— 2. Sezione scura atmosferica —— */}
        <EsseAtmosphereSection>
          <div className={`${esseBackgroundInnerClass} max-w-3xl items-center`}>
            <p className="font-serif text-[1.05rem] leading-[1.9] text-[#f3efe8] sm:text-[1.15rem] sm:leading-[1.95] md:text-[1.22rem] md:leading-[2]">
              {DESCRIPTION}
            </p>
          </div>
        </EsseAtmosphereSection>

        {/* —— 3. Opera in cinque parti —— */}
        <section className="border-y border-[#e6e1d6]/70 bg-[#f8f4ec] px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto max-w-[88rem]">
            <div className="text-center">
              <h2 className="font-serif text-3xl italic text-[#161616] sm:text-4xl md:text-[2.6rem]">
                Opera in cinque parti
              </h2>
              <div className="mx-auto mt-4 mb-12 h-px w-20 bg-[#b01c24] sm:mb-14" />
            </div>

            <motion.div
                className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-5 lg:gap-5 xl:gap-6"
                variants={partsGridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.18 }}
              >
                {esseTracks.map((track) => (
                  <motion.div key={track.roman} variants={partsCardVariants} className="h-full">
                    <PartMovement
                      roman={track.roman}
                      title={track.title}
                      hint={track.hint}
                      onListen={() => openPartPlayer(track)}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </section>

        {/* —— Radice dell’essere — stesso template della intro scura —— */}
        <EsseAtmosphereSection className="esse-latin-meaning">
          <motion.div
            className={`${esseBackgroundInnerClass} esse-latin-meaning-inner max-w-[42rem] flex-col items-center justify-center text-center lg:max-w-[47.5rem]`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.58, ease: partsEase }}
          >
            <p className="esse-latin-kicker mb-4 text-[10px] uppercase tracking-[0.42em] text-[#c4b8a8]/75 sm:mb-5 sm:tracking-[0.48em]">
              sum · es · fui · esse
            </p>
            <div className="mx-auto mb-8 h-px w-12 bg-[#c4a574]/30 sm:mb-10" aria-hidden />
            <div className="space-y-5 text-left font-serif text-[1.02rem] leading-[1.86] text-[#e8e0d4]/90 sm:space-y-6 sm:text-[1.06rem] sm:leading-[1.9] md:text-[1.08rem] md:leading-[1.92]">
              <p>
                In latino, <span className="text-[#f3efe8]">esse</span> è l&apos;infinito presente
                del verbo <span className="text-[#f3efe8]">essere</span>. Dal punto di vista
                grammaticale è un verbo anomalo: il suo paradigma — sum, es, fui, esse — corrisponde
                all&apos;italiano «essere» e all&apos;inglese «to be».
              </p>
              <p>
                In filosofia, da questa radice nasce il concetto stesso di{" "}
                <span className="text-[#f3efe8]">essere</span>: l&apos;
                <span className="text-[#f3efe8]">esistenza</span>, la presenza, ciò che permane
                nell&apos;esperienza di ogni individuo.
              </p>
            </div>
          </motion.div>
        </EsseAtmosphereSection>

        {/* —— 4. Archivio / retro copertina —— */}
        <section className="bg-[#ebe6df] px-4 py-16 sm:px-6 sm:py-20 md:px-10 md:py-24 lg:px-16">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
            <div className="cover-elevated mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <img
                src={COVER_BACK}
                alt="Retro copertina ESSE — informazioni e tracklist"
                className="block h-auto w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="min-w-0">
              <h2 className="mb-6 font-serif text-2xl italic text-[#161616] sm:mb-7 sm:text-3xl">
                Retro copertina
              </h2>
              <dl className="space-y-4 border border-[#d2c8bb]/90 bg-[#faf7f0]/80 px-6 py-7 sm:px-8 sm:py-8">
                {ARCHIVE_ROWS.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-b border-[#e6e1d6]/80 pb-4 last:border-0 last:pb-0 sm:grid-cols-[9rem_1fr] sm:gap-4"
                  >
                    <dt className="text-[10px] uppercase tracking-[0.28em] text-[#9d2b2b]">
                      {row.label}
                    </dt>
                    <dd className="font-serif text-[1rem] leading-[1.6] text-[#2a2622] sm:text-[1.05rem]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* —— 5. Footer interno —— */}
        <section className="border-t border-[#e6e1d6] bg-[#f3efe6] px-4 py-14 sm:px-6 md:px-10 lg:px-16">
          <div className="mx-auto flex max-w-6xl justify-center">
            <Link to="/#timeline" className={backButtonClass}>
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>
              Torna al Diario di Bordo
            </Link>
          </div>
        </section>

        <Footer />
      </div>

      {currentPlayer && (
        <BottomYouTubePlayer
          player={currentPlayer}
          onClose={() => setCurrentPlayer(null)}
        />
      )}
    </>
  );
}
