import { useState } from "react";
import { ArrowDownRight, Check, Copy, Play, Trash2 } from "lucide-react";
import { GlowButton } from "./glow-button";
import { useMounted } from "./hooks";
import { LOADSTRING } from "./download";

const TITLE = "Writz Hub";

export function Hero() {
  const mounted = useMounted();
  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"editor" | "output">("editor");
  const [logs, setLogs] = useState<string[]>(["Ready."]);

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
    setTab("output");
    setLogs(["Executing…", "HttpGet loader.lua", "Injected.", "Done."]);
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

      {/* Executor — monochrome */}
      <div
        id="download"
        className={cnReady(mounted, "mx-auto mt-10 w-full max-w-[520px] text-left")}
        style={{ transitionDelay: "280ms" }}
      >
        <div className="overflow-hidden rounded-md bg-bg shadow-[0_0_0_1px_rgb(255_255_255_/_0.1),0_24px_60px_rgb(0_0_0_/_0.45)]">
          {/* Header */}
          <div className="flex h-10 items-center justify-between border-b border-line px-4">
            <div className="flex items-center gap-3">
              <span className="font-display text-[13px] font-semibold tracking-tight text-fg">
                Executor
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                Writz Hub
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTab("editor")}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
                  tab === "editor" ? "text-fg" : "text-faint hover:text-muted"
                }`}
              >
                Script
              </button>
              <button
                type="button"
                onClick={() => setTab("output")}
                className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition ${
                  tab === "output" ? "text-fg" : "text-faint hover:text-muted"
                }`}
              >
                Output
              </button>
            </div>
          </div>

          {/* Body */}
          {tab === "editor" ? (
            <div className="flex min-h-[132px] border-b border-line">
              <div className="select-none border-r border-line px-2.5 py-3 text-right font-mono text-[11px] leading-6 text-faint/50">
                <div>1</div>
                <div>2</div>
              </div>
              <pre className="flex-1 overflow-x-auto px-3 py-3 font-mono text-[12px] leading-6 text-fg md:text-[13px]">
                <span className="select-all">{LOADSTRING}</span>
              </pre>
            </div>
          ) : (
            <div className="min-h-[132px] space-y-1 border-b border-line px-4 py-3 font-mono text-[11px] leading-5 text-muted">
              {logs.map((line, i) => (
                <div key={`${line}-${i}`} className={i === logs.length - 1 ? "text-fg" : ""}>
                  {line}
                </div>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 px-3 py-3">
            <button
              type="button"
              onClick={execute}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-5 text-[12px] font-medium text-accent-fg transition hover:opacity-90 active:scale-[0.97]"
            >
              {copied ? <Check className="size-3.5" /> : <Play className="size-3.5" />}
              {copied ? "Copied" : "Execute"}
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-medium text-fg shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)] transition hover:bg-fg/5 active:scale-[0.97]"
            >
              <Copy className="size-3.5" />
              Copy
            </button>
            <button
              type="button"
              onClick={() => {
                setLogs(["Cleared."]);
                setTab("output");
              }}
              className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-medium text-muted transition hover:text-fg active:scale-[0.97]"
            >
              <Trash2 className="size-3.5" />
              Clear
            </button>
            <a
              href="/loader.lua"
              download="loader.lua"
              className="ml-auto inline-flex h-9 items-center rounded-full px-4 font-mono text-[11px] text-faint transition hover:text-fg"
            >
              .lua ↘
            </a>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-faint">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-fg" />
              keyless
            </span>
            <span>Xeno · Solara · Delta · Wave</span>
          </div>
        </div>

        <p className="mt-3 text-center font-mono text-[11px] text-faint">
          Execute copie le loadstring — colle-le dans ton executor
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
