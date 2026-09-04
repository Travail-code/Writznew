import { useState } from "react";
import {
  ArrowDownRight,
  Check,
  Copy,
  Minus,
  Play,
  Square,
  Terminal,
  Trash2,
  X,
} from "lucide-react";
import { GlowButton } from "./glow-button";
import { useMounted } from "./hooks";
import { LOADSTRING } from "./download";

const TITLE = "Writz Hub";

export function Hero() {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);
  const [executed, setExecuted] = useState(false);
  const [tab, setTab] = useState<"editor" | "console">("editor");
  const [logs, setLogs] = useState<string[]>([
    "[Writz] Executor ready",
    "[Writz] Waiting for script…",
  ]);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(LOADSTRING);
      } else {
        throw new Error("clipboard unavailable");
      }
    } catch {
      const ta = document.createElement("textarea");
      ta.value = LOADSTRING;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const execute = async () => {
    await copy();
    setExecuted(true);
    setTab("console");
    setLogs((prev) => [
      ...prev,
      "> execute",
      "[Writz] Compiling loadstring…",
      "[Writz] HttpGet → writzzzzzz.vercel.app/loader.lua",
      "[Writz] Script injected successfully",
      "[Writz] Status: OK",
    ]);
    window.setTimeout(() => setExecuted(false), 2200);
  };

  const clear = () => {
    setLogs(["[Writz] Console cleared"]);
    setTab("console");
  };

  return (
    <section
      id="top"
      className="relative z-10 flex min-h-svh flex-col items-center justify-center px-5 pb-20 pt-28 text-center"
    >
      <div className={cnReady(mounted)} style={{ transitionDelay: "40ms" }}>
        <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)]">
          <span className="status-pulse size-1.5 rounded-full bg-fg" />
          Script hub · 2026
        </span>
      </div>

      <h1
        className={cnReady(
          mounted,
          "font-display mt-8 text-[clamp(3.2rem,12vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-fg",
        )}
        style={{ transitionDelay: "120ms" }}
      >
        {TITLE}
      </h1>

      {/* Premium Fake Executor */}
      <div
        id="download"
        className={cnReady(mounted, "mx-auto mt-10 w-full max-w-[580px] text-left")}
        style={{ transitionDelay: "280ms" }}
      >
        <div className="relative overflow-hidden rounded-xl bg-[#0b0b0d] shadow-[0_0_0_1px_rgb(255_255_255_/_0.08),0_30px_100px_rgb(0_0_0_/_0.65),0_0_60px_rgb(255_255_255_/_0.04)]">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -left-20 -top-20 size-56 rounded-full bg-white/[0.04] blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 size-48 rounded-full bg-emerald-500/[0.07] blur-3xl" />

          {/* Title bar */}
          <div className="relative flex h-11 items-center gap-3 border-b border-white/[0.06] bg-gradient-to-b from-[#16161a] to-[#121216] px-3.5">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57] shadow-[0_0_0_0.5px_rgb(0_0_0_/_0.35)]" />
              <span className="size-3 rounded-full bg-[#febc2e] shadow-[0_0_0_0.5px_rgb(0_0_0_/_0.35)]" />
              <span className="size-3 rounded-full bg-[#28c840] shadow-[0_0_0_0.5px_rgb(0_0_0_/_0.35)]" />
            </div>
            <div className="flex flex-1 items-center justify-center gap-2">
              <span className="grid size-5 place-items-center rounded bg-white/[0.06]">
                <Terminal className="size-3 text-white/70" />
              </span>
              <span className="font-display text-[13px] font-semibold tracking-tight text-white/90">
                Writz Hub Executor
              </span>
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                live
              </span>
            </div>
            <div className="flex items-center gap-1 text-white/30">
              <Minus className="size-3.5" />
              <Square className="size-3" />
              <X className="size-3.5" />
            </div>
          </div>

          {/* Tabs */}
          <div className="relative flex items-center gap-1 border-b border-white/[0.05] bg-[#0e0e11] px-3 pt-2">
            <button
              type="button"
              onClick={() => setTab("editor")}
              className={`rounded-t-md px-3 py-1.5 font-mono text-[11px] transition ${
                tab === "editor"
                  ? "bg-[#0b0b0d] text-white shadow-[0_-1px_0_0_rgb(255_255_255_/_0.06)]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              editor.lua
            </button>
            <button
              type="button"
              onClick={() => setTab("console")}
              className={`rounded-t-md px-3 py-1.5 font-mono text-[11px] transition ${
                tab === "console"
                  ? "bg-[#0b0b0d] text-white shadow-[0_-1px_0_0_rgb(255_255_255_/_0.06)]"
                  : "text-white/40 hover:text-white/70"
              }`}
            >
              console
              {logs.length > 2 ? (
                <span className="ml-1.5 inline-flex size-4 items-center justify-center rounded-full bg-emerald-500/20 text-[9px] text-emerald-400">
                  {logs.length}
                </span>
              ) : null}
            </button>
          </div>

          {/* Body */}
          <div className="relative px-0 pt-0">
            {tab === "editor" ? (
              <div className="flex min-h-[150px]">
                {/* Line numbers */}
                <div className="select-none border-r border-white/[0.04] bg-[#0a0a0c] px-2.5 py-3 text-right font-mono text-[11px] leading-6 text-white/20">
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
                {/* Code */}
                <div className="flex-1 overflow-x-auto px-3 py-3 font-mono text-[12px] leading-6 md:text-[13px]">
                  <div className="text-white/25">-- Writz Hub · paste in any executor</div>
                  <div className="select-all">
                    <span className="text-[#c792ea]">loadstring</span>
                    <span className="text-white/50">(</span>
                    <span className="text-[#82aaff]">game</span>
                    <span className="text-white/50">:</span>
                    <span className="text-[#82aaff]">HttpGet</span>
                    <span className="text-white/50">(</span>
                    <span className="text-[#c3e88d]">
                      "https://writzzzzzz.vercel.app/loader.lua"
                    </span>
                    <span className="text-white/50">))()</span>
                  </div>
                  <div className="mt-1 inline-block h-4 w-[2px] animate-pulse bg-emerald-400/80" />
                </div>
              </div>
            ) : (
              <div className="min-h-[150px] space-y-1 overflow-y-auto bg-[#08080a] px-4 py-3 font-mono text-[11px] leading-5 text-white/55">
                {logs.map((line, i) => (
                  <div
                    key={`${line}-${i}`}
                    className={
                      line.startsWith(">")
                        ? "text-white/35"
                        : line.includes("OK") || line.includes("successfully")
                          ? "text-emerald-400/90"
                          : line.includes("Compiling") || line.includes("HttpGet")
                            ? "text-sky-400/80"
                            : ""
                    }
                  >
                    {line}
                  </div>
                ))}
                <div className="inline-block h-3.5 w-[2px] animate-pulse bg-white/40" />
              </div>
            )}
          </div>

          {/* Toolbar */}
          <div className="relative flex flex-wrap items-center gap-2 border-t border-white/[0.06] bg-[#0e0e12] px-3.5 py-3">
            <button
              type="button"
              onClick={execute}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-gradient-to-b from-emerald-500 to-emerald-600 px-4 text-[12px] font-semibold text-white shadow-[0_0_20px_rgb(16_185_129_/_0.35)] transition hover:brightness-110 active:scale-[0.97]"
            >
              {executed || copied ? (
                <Check className="size-3.5" />
              ) : (
                <Play className="size-3.5 fill-current" />
              )}
              {executed ? "Executed" : copied ? "Copied" : "Execute"}
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/[0.06] px-3.5 text-[12px] font-medium text-white/85 shadow-[0_0_0_1px_rgb(255_255_255_/_0.08)] transition hover:bg-white/[0.1] active:scale-[0.97]"
            >
              <Copy className="size-3.5" />
              Copy
            </button>
            <button
              type="button"
              onClick={clear}
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-white/[0.04] px-3.5 text-[12px] font-medium text-white/55 transition hover:bg-white/[0.08] hover:text-white/80 active:scale-[0.97]"
            >
              <Trash2 className="size-3.5" />
              Clear
            </button>
            <a
              href="/loader.lua"
              download="loader.lua"
              className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-sky-500/15 px-3.5 text-[12px] font-medium text-sky-300 shadow-[0_0_0_1px_rgb(56_189_248_/_0.2)] transition hover:bg-sky-500/25 active:scale-[0.97]"
            >
              Load Hub
            </a>
          </div>

          {/* Status bar */}
          <div className="relative flex items-center justify-between border-t border-white/[0.04] bg-[#0a0a0c] px-3.5 py-1.5 font-mono text-[10px] text-white/30">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-emerald-400 status-pulse" />
              Luau · keyless
            </span>
            <span>Xeno · Solara · Delta · Wave</span>
            <span>UTF-8</span>
          </div>
        </div>

        <p className="mt-3.5 text-center font-mono text-[11px] text-faint">
          Clique Execute pour copier · colle dans ton executor
        </p>
      </div>

      <p
        className={cnReady(mounted, "mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg")}
        style={{ transitionDelay: "380ms" }}
      >
        Run your scripts with surgical precision. Premium interface,
        instant load, compatible with every executor.
      </p>

      <div
        className={cnReady(mounted, "mt-8 flex flex-wrap items-center justify-center gap-3")}
        style={{ transitionDelay: "480ms" }}
      >
        <GlowButton variant="glow" href="#showcase" icon={<ArrowDownRight className="size-4" />}>
          View preview
        </GlowButton>
      </div>

      <p
        className={cnReady(mounted, "mt-8 font-mono text-[11px] tracking-wide text-faint")}
        style={{ transitionDelay: "560ms" }}
      >
        loadstring · keyless · auto-update
      </p>
    </section>
  );
}

function cnReady(mounted: boolean, extra = "") {
  return [
    "transition-[opacity,transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
    mounted ? "translate-y-0 opacity-100 blur-0" : "translate-y-4 opacity-0 blur-[4px]",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}
