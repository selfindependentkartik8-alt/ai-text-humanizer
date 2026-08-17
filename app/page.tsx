"use client";

import { useState } from "react";

type Style =
  | "Natural"
  | "Professional"
  | "Casual"
  | "Academic"
  | "Friendly";

type Level = "Light" | "Balanced" | "Strong";

const styles: Style[] = [
  "Natural",
  "Professional",
  "Casual",
  "Academic",
  "Friendly",
];

const levels: Level[] = [
  "Light",
  "Balanced",
  "Strong",
];

function formatText(text: string) {
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-3" />;
    }

    const isHeading =
      /^(introduction|overview|summary|main point|key points|conclusion|important|note|result|final|body|opening|closing)\s*[:\-—]?$/i.test(
        trimmed
      ) ||
      /^(introduction|overview|summary|main point|key points|conclusion|important|note|result|final|body|opening|closing)\s*[:\-—]/i.test(
        trimmed
      );

    if (isHeading) {
      return (
        <div
          key={index}
          className="mt-4 mb-2 rounded-xl border border-[#d4a72c]/30 bg-[#d4a72c]/10 px-4 py-3 text-sm font-bold text-[#f1c84b]"
        >
          {trimmed}
        </div>
      );
    }

    return (
      <p
        key={index}
        className="text-sm leading-7 text-zinc-300"
      >
        {trimmed}
      </p>
    );
  });
}

export default function Home() {
  const [text, setText] = useState("");
  const [style, setStyle] =
    useState<Style>("Natural");
  const [level, setLevel] =
    useState<Level>("Balanced");
  const [instruction, setInstruction] =
    useState("");

  const [result, setResult] = useState("");
  const [loading, setLoading] =
    useState(false);
  const [copied, setCopied] =
    useState(false);
  const [error, setError] = useState("");

  const humanizeText = async () => {
    if (!text.trim()) {
      setError("Please paste some text first.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          style,
          level,
          instruction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Unable to humanize the text."
        );
      }

      if (!data?.result) {
        throw new Error(
          "AI returned an empty response."
        );
      }

      setResult(data.result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the result.");
    }
  };

  const clearAll = () => {
    setText("");
    setInstruction("");
    setResult("");
    setError("");
    setCopied(false);
  };

  const originalWords = text.trim()
    ? text.trim().split(/\s+/).length
    : 0;

  const resultWords = result.trim()
    ? result.trim().split(/\s+/).length
    : 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#3a2b08] via-[#090806] to-black text-white">

      {/* AMBIENT GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[850px] max-w-[100vw] -translate-x-1/2 rounded-full bg-[#d4a72c]/20 blur-[170px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-[#d4a72c]/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[65%] h-[350px] w-[350px] rounded-full bg-[#d4a72c]/10 blur-[150px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-[#d4a72c]/20 bg-black/70 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#d4a72c]/30 bg-[#d4a72c]/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>

          </div>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-[#f1c84b]"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-[#f1c84b]"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-[#f1c84b]"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-[#f1c84b]"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#f1c84b] px-5 py-2 font-medium text-black transition hover:bg-[#ffe48a]"
            >
              Follow
            </a>

          </div>

          <a
            href="#humanizer"
            className="rounded-full border border-[#d4a72c]/30 bg-[#d4a72c]/10 px-4 py-2 text-xs text-[#f1c84b] md:hidden"
          >
            Try
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-[#d4a72c]/30 bg-[#d4a72c]/10 px-4 py-2 text-xs text-[#f1c84b]">
          ✍️ AI Text Humanizer
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-[#f1c84b]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Make Your Writing
          <br />

          <span className="bg-gradient-to-r from-white via-[#f1c84b] to-[#d49b16] bg-clip-text text-transparent">
            Sound More Natural.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Rewrite AI-generated or robotic text into
          clear, natural and human-like writing while
          keeping the original meaning intact.
        </p>

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-[#d4a72c]/20 bg-[#d4a72c]/10 px-4 py-2 text-xs text-zinc-300">
            ✨ Natural Writing
          </span>

          <span className="rounded-full border border-[#d4a72c]/20 bg-[#d4a72c]/10 px-4 py-2 text-xs text-zinc-300">
            🎯 Meaning Preserved
          </span>

          <span className="rounded-full border border-[#d4a72c]/20 bg-[#d4a72c]/10 px-4 py-2 text-xs text-zinc-300">
            🤖 Gemini AI
          </span>

        </div>

      </section>

      {/* HUMANIZER */}

      <section
        id="humanizer"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="rounded-[2rem] border border-[#d4a72c]/20 bg-black/75 p-4 shadow-2xl shadow-[#d4a72c]/5 backdrop-blur-2xl sm:p-7">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c39a29]">
              Text Humanizer
            </p>

            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Turn robotic writing into natural text.
            </h2>

          </div>

          {/* INPUT */}

          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Your Text
          </label>

          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            placeholder="Paste your AI-generated or robotic text here..."
            className="mt-3 min-h-[240px] w-full resize-y rounded-2xl border border-[#d4a72c]/15 bg-[#080807] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-700 focus:border-[#d4a72c]/50 focus:ring-1 focus:ring-[#d4a72c]/20"
          />

          {/* CONTROLS */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Writing Style
              </label>

              <select
                value={style}
                onChange={(e) =>
                  setStyle(e.target.value as Style)
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#d4a72c]/15 bg-[#080807] px-4 text-sm text-white outline-none focus:border-[#d4a72c]/50"
              >

                {styles.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Humanization Level
              </label>

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value as Level)
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#d4a72c]/15 bg-[#080807] px-4 text-sm text-white outline-none focus:border-[#d4a72c]/50"
              >

                {levels.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* INSTRUCTION */}

          <div className="mt-5">

            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Optional Instruction
            </label>

            <input
              value={instruction}
              onChange={(e) =>
                setInstruction(e.target.value)
              }
              placeholder="Example: Keep the meaning but make it sound warmer..."
              className="mt-2 h-12 w-full rounded-xl border border-[#d4a72c]/15 bg-[#080807] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-[#d4a72c]/50"
            />

          </div>

          {/* MAIN BUTTON */}

          {!result && (
            <button
              type="button"
              onClick={humanizeText}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-[#f1c84b] px-5 py-4 text-sm font-bold text-black shadow-xl shadow-[#d4a72c]/10 transition hover:bg-[#ffe48a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "🤖 Humanizing Text..."
                : "✨ Humanize Text"}
            </button>
          )}

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearAll}
            className="mt-3 w-full py-2 text-xs text-zinc-600 transition hover:text-[#f1c84b]"
          >
            Clear Everything
          </button>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* RESULT */}

          {result && (
            <div className="mt-8 rounded-3xl border border-[#d4a72c]/20 bg-[#080807] p-5 sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c39a29]">
                    AI Result
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Your Humanized Text Is Ready.
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={copyResult}
                  className="rounded-xl bg-[#f1c84b] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#ffe48a]"
                >
                  {copied
                    ? "✓ Copied"
                    : "📋 Copy Text"}
                </button>

              </div>

              {/* STATS */}

              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-2xl border border-[#d4a72c]/10 bg-black p-4">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Original Words
                  </p>

                  <p className="mt-2 text-xl font-bold text-[#f1c84b]">
                    {originalWords}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#d4a72c]/10 bg-black p-4">
                  <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    Result Words
                  </p>

                  <p className="mt-2 text-xl font-bold text-[#f1c84b]">
                    {resultWords}
                  </p>
                </div>

              </div>

              {/* RESULT */}

              <div className="mt-6 rounded-2xl border border-[#d4a72c]/10 bg-black p-5 sm:p-6">
                {formatText(result)}
              </div>

              {/* REGENERATE */}

              <button
                type="button"
                onClick={humanizeText}
                disabled={loading}
                className="mt-4 w-full rounded-xl border border-[#d4a72c]/25 bg-[#d4a72c]/5 px-5 py-3 text-xs font-semibold text-[#f1c84b] transition hover:border-[#d4a72c]/45 hover:bg-[#d4a72c]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "🤖 Creating New Version..."
                  : "🔄 Humanize Again"}
              </button>

            </div>
          )}

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="grid gap-5 md:grid-cols-3">

          {[
            [
              "✨",
              "Natural Writing",
              "Improve robotic phrasing and create smoother, more natural sentences.",
            ],
            [
              "🎯",
              "Meaning Preserved",
              "Keep the original message and important information intact.",
            ],
            [
              "🎨",
              "Choose Your Style",
              "Switch between natural, professional, casual, academic and friendly writing.",
            ],
          ].map(
            ([icon, title, description]) => (

              <div
                key={title}
                className="rounded-3xl border border-[#d4a72c]/10 bg-black/70 p-6 backdrop-blur-xl transition hover:border-[#d4a72c]/25"
              >

                <div className="text-3xl">
                  {icon}
                </div>

                <h3 className="mt-5 text-base font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c39a29]">
            How To Use
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Humanize your writing in three steps.
          </h2>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {[
            [
              "01",
              "Paste Your Text",
              "Paste the AI-generated or robotic text you want to improve.",
            ],
            [
              "02",
              "Choose Your Style",
              "Select a writing style and how strongly you want the text rewritten.",
            ],
            [
              "03",
              "Humanize",
              "Generate a natural version and copy it whenever you're ready.",
            ],
          ].map(
            ([number, title, description]) => (

              <div
                key={number}
                className="rounded-3xl border border-[#d4a72c]/10 bg-black/70 p-6"
              >

                <span className="text-sm font-bold text-[#f1c84b]">
                  {number}
                </span>

                <h3 className="mt-5 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {description}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#c39a29]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          {[
            [
              "What does the AI Humanizer do?",
              "It rewrites text to make the wording feel more natural, readable and appropriate for your selected style while preserving the original meaning.",
            ],
            [
              "Can I choose the writing style?",
              "Yes. You can choose Natural, Professional, Casual, Academic or Friendly.",
            ],
            [
              "What does the humanization level control?",
              "Light makes smaller changes, Balanced provides a natural rewrite, and Strong allows more substantial sentence restructuring.",
            ],
            [
              "Will the tool change my original meaning?",
              "The humanizer is instructed to preserve the original meaning and important information, but you should always review the generated text before using it.",
            ],
          ].map(
            ([question, answer]) => (

              <div
                key={question}
                className="rounded-3xl border border-[#d4a72c]/10 bg-black/70 p-6"
              >

                <h3 className="text-sm font-bold">
                  {question}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {answer}
                </p>

              </div>

            )
          )}

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-8">

        <div className="rounded-[2rem] border border-[#d4a72c]/20 bg-gradient-to-b from-[#d4a72c]/15 to-black p-8 sm:p-12">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Make your writing feel more like you.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Rewrite robotic text into clear, natural and readable writing in seconds.
          </p>

          <a
            href="#humanizer"
            className="mt-7 inline-flex rounded-xl bg-[#f1c84b] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#ffe48a]"
          >
            Humanize Text
          </a>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-[#d4a72c]/10 px-4 py-10">

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#d4a72c]/20">

              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />

            </div>

            <div>

              <p className="text-sm font-bold">
                KrishAIWorks
              </p>

              <p className="text-xs text-zinc-600">
                AI Solutions That Work
              </p>

            </div>

          </div>

          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} KrishAIWorks. All rights reserved.
          </p>

        </div>

      </footer>

    </main>
  );
}