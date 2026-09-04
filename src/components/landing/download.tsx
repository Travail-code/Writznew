import { useState } from "react";
import { Check, Copy, Download, Play, Trash2, X } from "lucide-react";
import { GlowButton } from "./glow-button";
import { Reveal, WordReveal } from "./reveal";

export const LOADSTRING =
  'loadstring(game:HttpGet("https://writzzzzzz.vercel.app/loader.lua"))()';

const EXECUTORS = ["Xeno", "Solara", "Delta", "Wave", "Swift", "Codex"];

export function DownloadSection() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const write = async () => {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(LOADSTRING);
        return;
      }
      throw new Error("clipboard unavailable");
    };
    try {
      await write();
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
    <section id="download-section" className="relative z-10 mx-auto max-w-6xl px-5 py-24 md:px-8 md:py-32">
      <div className="glass-strong overflow-hidden rounded-xl px-6 py-12 md:px-14 md:py-16">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">Download</p>
        </Reveal>
        <WordReveal
          text="One loadstring. Every executor."
          className="font-display mt-4 max-w-xl text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
        />
        <Reveal delay={80}>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Copy the loader, paste it into your executor, run. Writz Hub updates itself.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-8 overflow-hidden rounded-[10px] bg-[#0c0c0e] shadow-[0_0_0_1px_rgb(40_40_48)]">
            <div className="flex h-9 items-center justify-between border-b border-white/5 bg-[#121216] px-3">
              <span className="font-display text-[13px] font-semibold tracking-tight text-[#e6e6eb]">
                Writz Hub&nbsp;·&nbsp;Executor
              </span>
              <span className="grid size-7 place-items-center rounded-md bg-[#1c1c22] text-[#c8c8d2]">
                <X className="size-3.5" strokeWidth={2.5} />
              </span>
            </div>
            <div className="px-3.5 pt-3">
              <div className="min-h-[88px] rounded-lg bg-[#08080a] px-3 py-2.5 font-mono text-[12px] leading-relaxed text-[#b4ffb4] md:text-[13px]">
                <span className="select-all">{LOADSTRING}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 px-3.5 py-3.5">
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#28a05a] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#2fb368]"
              >
                {copied ? <Check className="size-3.5" /> : <Play className="size-3.5" />}
                {copied ? "Copied" : "Execute"}
              </button>
              <button
                type="button"
                onClick={copy}
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#46464a] px-3.5 text-[12px] font-medium text-white transition hover:bg-[#55555a]"
              >
                <Copy className="size-3.5" />
                Copy
              </button>
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1.5 rounded-md bg-[#32323c] px-3.5 text-[12px] font-medium text-white/80"
              >
                <Trash2 className="size-3.5" />
                Clear
              </button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <GlowButton onClick={copy} icon={copied ? <Check className="size-4" /> : <Copy className="size-4" />}>
              {copied ? "Copied" : "Copy loadstring"}
            </GlowButton>
            <GlowButton
              variant="glow"
              href="/loader.lua"
              download="loader.lua"
              icon={<Download className="size-4" />}
            >
              Download .lua
            </GlowButton>
          </div>
        </Reveal>

        <Reveal delay={220}>
          <ul className="mt-8 flex flex-wrap gap-2">
            {EXECUTORS.map((name) => (
              <li
                key={name}
                className="rounded-full px-3 py-1.5 font-mono text-[11px] text-muted shadow-[0_0_0_1px_rgb(255_255_255_/_0.1)]"
              >
                {name}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
