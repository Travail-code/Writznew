import { useState } from "react";
import { ArrowDownRight, Check, Copy, Play, Trash2, X } from "lucide-react";
import { GlowButton } from "./glow-button";
import { useMounted } from "./hooks";
import { LOADSTRING } from "./download";

const TITLE = "Writz Hub";

export function Hero() {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);

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

      {/* Fake Executor */}
      <div
        id="download"
        className={cnReady(mounted, "mx-auto mt-10 w-full max-w-[540px] text-left")}
        style={{ transitionDelay: "280ms" }}
      >
        <div className="overflow-hidden rounded-[10px] bg-[#0c0c0e] shadow-[0_0_0_1px_rgb(40_40_48),0_24px_80px_rgb(0_0_0_/_0.55)]">
          {/* Title bar */}
          <div className="flex h-9 items-center justify-between border-b border-white/5 bg-[#121216] px-3">
            <span className="font-display text-[13px] font-semibold tracking-tight text-[#e6e6eb]">
              Writz Hub&nbsp;·&nbsp;Executor
            </span>
            <span className="grid size-7 place-items-center rounded-md bg-[#1c1c22] text-[#c8c8d2]">
              <X className="size-3.5" strokeWidth={2.5} />
            </span>
          </div>

          {/* Script box with loadstring */}
          <div className="px-3.5 pt-3">
            <div className="min-h-[120px] rounded-lg bg-[#08080a] px-3 py-2.5 font-mono text-[12px] leading-relaxed text-[#b4ffb4] md:text-[13px]">
              <span className="select-all">{LOADSTRING}</span>
            </div>
          </div>

          {/* Buttons row */}
          <div className="flex flex-wrap gap-2 px-3.5 py-3.5">
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#28a05a] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#2fb368] active:scale-[0.97]"
            >
              {copied ? <Check className="size-3.5" /> : <Play className="size-3.5" />}
              {copied ? "Copied" : "Execute"}
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#46464a] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#55555a] active:scale-[0.97]"
            >
              <Copy className="size-3.5" />
              Copy
            </button>
            <button
              type="button"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#32323c] px-3.5 text-[12px] font-medium text-white/80 transition hover:bg-[#3c3c48] active:scale-[0.97]"
            >
              <Trash2 className="size-3.5" />
              Clear
            </button>
            <a
              href="/loader.lua"
              download="loader.lua"
              className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#4664c8] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#5574d8] active:scale-[0.97]"
            >
              Load Hub
            </a>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[11px] text-faint">
          Colle le loadstring dans ton executor · ou télécharge le .lua
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
