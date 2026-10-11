import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../sections/footer";

const initialForm = {
  nome: "",
  email: "",
  oggetto: "",
  messaggio: "",
  website: "", // honeypot anti-bot: deve restare vuoto
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SEND_ERROR_GENERIC =
  "Non è stato possibile inviare il messaggio. Riprova più tardi.";

const isMobileViewport = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;

export default function Contatti() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitPhase, setSubmitPhase] = useState("idle");
  const [sendError, setSendError] = useState(null);
  const successFocusRef = useRef(null);

  const canSubmit = useMemo(
    () =>
      form.nome.trim().length > 1 &&
      emailRegex.test(form.email.trim()) &&
      form.messaggio.trim().length > 4,
    [form.email, form.messaggio, form.nome],
  );
  const isBusy = submitPhase !== "idle" && submitPhase !== "success";

  useEffect(() => {
    if (submitPhase === "success") {
      successFocusRef.current?.focus();
    }
  }, [submitPhase]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (sendError) {
      setSendError(null);
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.nome.trim()) {
      nextErrors.nome = "Inserisci il tuo nome.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Inserisci la tua email.";
    } else if (!emailRegex.test(form.email.trim())) {
      nextErrors.email = "Inserisci una email valida.";
    }

    if (!form.messaggio.trim()) {
      nextErrors.messaggio = "Inserisci un messaggio.";
    }

    return nextErrors;
  };

  const runEnvelopeSequence = async () => {
    setSubmitPhase("formingEnvelope");
    await sleep(1060);
    setSubmitPhase("sealing");
    await sleep(620);
    setSubmitPhase("flying");
    await sleep(1620);
    await sleep(260);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSendError(null);
    setSubmitPhase("sending");

    const payload = {
      name: form.nome.trim(),
      email: form.email.trim(),
      subject: form.oggetto.trim(),
      message: form.messaggio.trim(),
      website: form.website,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      if (!response.ok || data?.success !== true) {
        const backendError =
          data && typeof data.error === "string" && data.error.trim()
            ? data.error.trim()
            : SEND_ERROR_GENERIC;
        setSendError(backendError);
        setSubmitPhase("idle");
        return;
      }

      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      await runEnvelopeSequence();
      setSubmitPhase("success");
      setForm(initialForm);
      setErrors({});
      setSendError(null);
    } catch {
      setSubmitPhase("idle");
      setSendError(SEND_ERROR_GENERIC);
    } finally {
      // keep explicit finally for predictable submit flow lifecycle
    }
  };

  return (
    <div className="min-h-[100svh] w-full min-w-0 overflow-x-clip bg-paper font-sans text-gray-900">
      <Navbar />

      <main className="page-with-bottom-player relative overflow-x-clip pt-[calc(var(--nav-height-current,64px)+1.25rem)] md:pt-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_92%_at_50%_-8%,rgba(255,254,250,0.95)_0%,rgba(246,241,231,0.95)_46%,rgba(237,228,211,0.96)_100%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(172,138,92,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(172,138,92,0.06)_1px,transparent_1px)] bg-size-[28px_28px] opacity-50" />
        <div
          className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22g%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.88%22%20numOctaves%3D%223%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23g)%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.03] mix-blend-multiply"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-[#fffef8]/75 to-transparent" />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          animate={{
            opacity:
              submitPhase === "sealing" || submitPhase === "flying" ? 1 : 0,
          }}
          transition={{ duration: 0.62, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(55%_40%_at_56%_44%,rgba(217,177,115,0.22)_0%,rgba(217,177,115,0.08)_34%,rgba(217,177,115,0)_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20%_30%,rgba(124,95,62,0.35)_100%,transparent),radial-gradient(1px_1px_at_72%_46%,rgba(124,95,62,0.28)_100%,transparent),radial-gradient(1px_1px_at_58%_62%,rgba(124,95,62,0.2)_100%,transparent)] opacity-45" />
        </motion.div>

        <section className="relative mx-auto max-w-5xl px-4 pb-[max(5rem,env(safe-area-inset-bottom,0px)+3.5rem)] sm:px-6 md:px-10 md:pb-28 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="mx-auto"
          >
            <div className="mb-10 border-b border-[#d9ceba] pb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#786756] transition hover:text-[#4f4337]"
              >
                <span aria-hidden>←</span>
                Torna alla home
              </Link>
            </div>

            <header className="mb-10 md:mb-12">
              <h1 className="font-serif text-4xl italic leading-none text-balance text-[#3a3028] sm:text-5xl md:text-6xl">
                Contatti
              </h1>
              <div className="mt-4 h-px w-24 bg-[#b8945d]" />
              <p className="mt-6 max-w-2xl font-serif text-[1.08rem] leading-relaxed text-[#5f5144] md:text-[1.16rem]">
                Per collaborazioni artistiche, informazioni o richieste, compila il
                modulo qui sotto.
              </p>
            </header>

            {sendError ? (
              <div
                role="alert"
                className="mb-8 rounded-2xl border border-[#e8c4bc] bg-[#fdf5f3] px-5 py-4 font-serif text-[0.98rem] leading-relaxed text-[#a04538]"
              >
                {sendError}
              </div>
            ) : null}

            <motion.div
              className="relative mx-auto min-h-132 w-full min-w-0 max-w-full sm:max-w-180"
              animate={{
                filter:
                  submitPhase === "flying" && !isMobileViewport()
                    ? "blur(1.4px)"
                    : "blur(0px)",
              }}
              transition={{ duration: 0.54, ease: "easeOut" }}
            >
              <AnimatePresence mode="wait">
                {(submitPhase === "idle" || submitPhase === "sending") && (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{
                      opacity: 0,
                      y: -8,
                      scale: 0.985,
                      filter: isMobileViewport() ? "blur(0px)" : "blur(6px)",
                    }}
                    transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                    className="rounded-4xl border border-[#d5c7b0] bg-[#fcf8ef]/90 p-5 shadow-[0_16px_48px_rgba(41,28,20,0.12)] ring-1 ring-white/70 sm:p-6 md:p-8 md:backdrop-blur-[2px]"
                  >
                    <input
                      type="text"
                      name="website"
                      value={form.website}
                      onChange={(e) => setForm((prev) => ({ ...prev, website: e.target.value }))}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] h-0 w-0 opacity-0"
                    />
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <Field
                        id="nome"
                        label="Nome"
                        value={form.nome}
                        onChange={handleChange}
                        error={errors.nome}
                        disabled={isBusy}
                      />
                      <Field
                        id="email"
                        type="email"
                        label="Email"
                        value={form.email}
                        onChange={handleChange}
                        error={errors.email}
                        disabled={isBusy}
                      />
                    </div>

                    <div className="mt-5">
                      <Field
                        id="oggetto"
                        label="Oggetto"
                        value={form.oggetto}
                        onChange={handleChange}
                        error={errors.oggetto}
                        disabled={isBusy}
                      />
                    </div>

                    <div className="mt-5">
                      <label
                        htmlFor="messaggio"
                        className="mb-2 block text-[0.74rem] uppercase tracking-[0.24em] text-[#6f5d4d]"
                      >
                        Messaggio
                      </label>
                      <textarea
                        id="messaggio"
                        name="messaggio"
                        rows={6}
                        value={form.messaggio}
                        onChange={handleChange}
                        disabled={isBusy}
                        placeholder="Scrivi qui il tuo messaggio..."
                        className="w-full resize-y rounded-2xl border border-[#ccbca3] bg-[#f8f1e3] px-4 py-3 font-serif text-[1.02rem] leading-relaxed text-[#453a30] caret-[#b8905b] outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[#9a846b] placeholder:transition-opacity placeholder:duration-300 focus:-translate-y-px focus:border-[#b8905b] focus:bg-[#fdf8ee] focus:placeholder:opacity-45 focus:shadow-[0_0_0_2px_rgba(201,156,95,0.2),0_10px_18px_rgba(80,56,33,0.09)] disabled:cursor-not-allowed disabled:opacity-75"
                      />
                      {errors.messaggio ? (
                        <p className="mt-2 text-sm text-[#bb5a45]">{errors.messaggio}</p>
                      ) : null}
                    </div>

                    <div className="mt-8 flex flex-col gap-4">
                      <motion.button
                        type="submit"
                        disabled={isBusy || !canSubmit}
                        whileTap={{ scale: 0.986, y: 1 }}
                        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-full border border-[#b99058]/55 bg-linear-to-r from-[#7d5a35] via-[#9d7141] to-[#7d5832] px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.24em] text-[#f9efdf] shadow-[0_12px_30px_rgba(64,44,27,0.2)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:brightness-105 hover:shadow-[0_18px_38px_rgba(76,52,30,0.26),0_0_16px_rgba(185,144,83,0.22)] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto"
                      >
                        {submitPhase === "sending"
                          ? "Invio in corso..."
                          : "Invia messaggio"}
                      </motion.button>
                    </div>
                  </motion.form>
                )}

                {(submitPhase === "formingEnvelope" ||
                  submitPhase === "sealing" ||
                  submitPhase === "flying") && (
                  <EnvelopeAnimation key="envelope" submitPhase={submitPhase} />
                )}

                {submitPhase === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 16, filter: "blur(5px)" }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                    transition={{ duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    className="mx-auto max-w-132 rounded-3xl border border-[#d4bc94] bg-[#fdf7ea]/92 px-6 py-6 text-[#4a3a2c] shadow-[0_0_0_1px_rgba(218,188,145,0.35),0_0_28px_rgba(224,186,122,0.2),0_18px_32px_rgba(76,56,37,0.13)]"
                    role="status"
                    aria-live="polite"
                  >
                    <div ref={successFocusRef} tabIndex={-1} aria-hidden="true" />
                    <div className="mb-4 h-px w-16 bg-[#c8ab79]/70" />
                    <div className="flex items-start gap-3.5">
                      <span className="mt-[2px] inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#ccab76] bg-[#faedd4] text-[#8f6838]">
                        <Check className="h-[15px] w-[15px]" strokeWidth={2.15} />
                      </span>
                      <p className="font-serif text-[1.06rem] leading-[1.85] tracking-[0.012em]">
                        <span className="block">Messaggio inviato correttamente.</span>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  disabled,
  type = "text",
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-[0.74rem] uppercase tracking-[0.24em] text-[#6f5d4d]"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={label}
        className="w-full rounded-2xl border border-[#ccbca3] bg-[#f8f1e3] px-4 py-3 font-serif text-[1.02rem] text-[#453a30] caret-[#b8905b] outline-none transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] placeholder:text-[#9a846b] placeholder:transition-opacity placeholder:duration-300 focus:-translate-y-px focus:border-[#b8905b] focus:bg-[#fdf8ee] focus:placeholder:opacity-45 focus:shadow-[0_0_0_2px_rgba(201,156,95,0.2),0_10px_18px_rgba(80,56,33,0.09)] disabled:cursor-not-allowed disabled:opacity-75"
      />
      {error ? <p className="mt-2 text-sm text-[#bb5a45]">{error}</p> : null}
    </div>
  );
}

function EnvelopeAnimation({ submitPhase }) {
  const isForming = submitPhase === "formingEnvelope";
  const isSealing = submitPhase === "sealing";
  const isFlying = submitPhase === "flying";
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  const flyingX = isMobile ? [0, 14, 66, 108] : [0, 20, 98, 188];
  const flyingY = isMobile ? [0, -14, -56, -98] : [0, -18, -76, -146];
  const flyingRotate = isMobile ? [0, -1, -3, -6] : [0, -1.5, -3.8, -7];
  const flyingScale = isMobile ? [1, 0.99, 0.9, 0.8] : [1, 0.995, 0.9, 0.79];

  return (
    <motion.div
      className="relative mx-auto mt-6 flex min-h-80 w-full max-w-full items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      aria-hidden
    >
      <motion.div
        className="absolute h-12 w-44 rounded-full bg-[#b89563]/22 blur-[10px]"
        animate={{
          opacity: isFlying ? [0.5, 0.2, 0.08] : 0.45,
          scaleX: isFlying ? [1, 1.28, 1.52] : 1,
          y: isFlying ? [0, 10, 18] : 0,
        }}
        transition={{ duration: 1.35, ease: "easeOut" }}
      />

      <motion.div
        className="relative h-44 w-[min(18.5rem,88vw)] max-w-full will-change-transform"
        animate={
          isFlying
            ? {
                x: flyingX,
                y: flyingY,
                rotate: flyingRotate,
                scale: flyingScale,
                opacity: [1, 1, 0],
              }
            : {
                scale: isForming ? [0.9, 1.01, 1] : 1,
                rotate: isForming ? [0, -0.6, 0] : 0,
              }
        }
        transition={
          isFlying
            ? { duration: 1.66, ease: [0.2, 0.78, 0.24, 1] }
            : { duration: 1.06, ease: [0.3, 1, 0.64, 1] }
        }
      >
        {isFlying && (
          <motion.div
            className="absolute -left-50 top-[53%] h-[2px] w-52 -translate-y-1/2 bg-linear-to-r from-[#e7c690]/0 via-[#e7c690]/55 to-[#e7c690]/0 blur-[0.8px]"
            initial={{ opacity: 0, scaleX: 0.2 }}
            animate={{ opacity: [0, 0.72, 0], scaleX: [0.2, 0.98, 1.15] }}
            transition={{ duration: 1.45, ease: "easeOut" }}
          />
        )}
        {isFlying && (
          <motion.div
            className="absolute -left-44 top-[57%] h-px w-44 -translate-y-1/2 bg-linear-to-r from-[#ceb383]/0 via-[#ceb383]/45 to-[#ceb383]/0"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.55, 0] }}
            transition={{ duration: 1.36, ease: "easeOut", delay: 0.06 }}
          />
        )}

        <div className="absolute inset-0 rounded-[1.6rem] border border-[rgba(90,58,35,0.25)] bg-[linear-gradient(150deg,#eadcbe_0%,#d9c49f_54%,#c7a97a_100%)] shadow-[0_14px_30px_rgba(82,58,36,0.24)]" />
        <div className="absolute inset-[2px] rounded-3xl bg-[linear-gradient(170deg,rgba(255,252,244,0.3)_0%,rgba(255,252,244,0)_45%),radial-gradient(120%_90%_at_70%_100%,rgba(105,74,44,0.12)_0%,rgba(105,74,44,0)_60%)]" />
        <div className="absolute inset-0 rounded-[1.6rem] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20180%20120%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%221.15%22%20numOctaves%3D%222%22%20stitchTiles%3D%22stitch%22%2F%3E%3C%2Ffilter%3E%3Crect%20width%3D%22180%22%20height%3D%22120%22%20filter%3D%22url(%23n)%22%20opacity%3D%220.22%22%2F%3E%3C%2Fsvg%3E')] opacity-[0.09] mix-blend-multiply" />
        <div className="absolute inset-x-0 top-[45%] h-px bg-[rgba(102,72,44,0.25)]" />
        <div className="absolute left-[12%] top-[45%] h-[46%] w-px rotate-35 bg-[rgba(102,72,44,0.23)]" />
        <div className="absolute right-[12%] top-[45%] h-[46%] w-px -rotate-35 bg-[rgba(102,72,44,0.23)]" />
        <div className="absolute inset-x-5 bottom-[1.05rem] h-px bg-[#c8ae84]/65" />

        <motion.div
          className="absolute left-[5%] right-[5%] top-px origin-top rounded-t-[1.45rem] border border-[rgba(90,58,35,0.2)] bg-[linear-gradient(180deg,#f0dfbd_0%,#d5bc90_100%)]"
          animate={
            isFlying
              ? { rotateX: [0, 68], y: [0, -5], opacity: [1, 0.82] }
              : isSealing
                ? { rotateX: [26, 0], y: [6, 0] }
                : { rotateX: [32, 22], y: [7, 4] }
          }
          transition={{
            duration: isFlying ? 0.72 : isSealing ? 0.92 : 0.72,
            ease: [0.26, 1, 0.36, 1],
          }}
          style={{ transformStyle: "preserve-3d" }}
        />
        <motion.div
          className="absolute left-[5%] right-[5%] top-px h-[47%] origin-top rounded-t-[1.45rem] bg-[radial-gradient(100%_120%_at_50%_0%,rgba(55,35,20,0.18)_0%,rgba(55,35,20,0)_65%)]"
          animate={{ opacity: isSealing || isFlying ? 0.65 : 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-[54%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#6f2d22]/70 bg-[radial-gradient(circle_at_35%_28%,#8f3025_0%,#7a2a20_45%,#5e1f18_100%)] text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-[#f8e8cc] shadow-[0_0_0_2px_rgba(234,212,176,0.2),0_6px_14px_rgba(56,25,18,0.3),inset_0_1px_2px_rgba(255,225,195,0.25)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            isFlying
              ? { scale: [1, 0.94, 0.78], y: [0, 0, -1], opacity: [1, 0.86, 0] }
              : isSealing
                ? { opacity: [0, 1], scale: [1.25, 0.94, 1], y: [2, 0, 0] }
                : { opacity: 0, scale: 0.8 }
          }
          transition={{
            duration: isFlying ? 0.74 : isSealing ? 0.62 : 0.22,
            ease: [0.26, 1, 0.36, 1],
          }}
        >
          EM
        </motion.div>

        {isFlying && (
          <motion.div
            className="absolute right-[-1.45rem] top-[1.4rem]"
            initial={{ opacity: 0, x: -4, y: 8, rotate: -8 }}
            animate={{ opacity: [0, 0.8, 0], x: [0, 14, 28], y: [4, -7, -24], rotate: [-8, -3, -16] }}
            transition={{ duration: 0.95, ease: "easeOut" }}
          >
            <PaperPlane />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}

function PaperPlane() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.2 13.3L22.8 3.4L15.1 22.5L11.6 15.2L3.2 13.3Z"
        fill="#f0dfbd"
        stroke="#b89262"
        strokeWidth="0.9"
      />
      <path d="M11.5 15.1L22.8 3.4" stroke="#caa06f" strokeWidth="0.8" />
    </svg>
  );
}
