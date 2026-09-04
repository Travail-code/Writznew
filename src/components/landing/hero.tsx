import { useEffect, useState } from "react";
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
  const [flash, setFlash] = useState(false);
  const [runId, setRunId] = useState(0);

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
    setFlash(true);
    setTab("output");
    setRunId((n) => n + 1);
    setLogs(["Executing…", "HttpGet loader.lua", "Injected.", "Done."]);
  };

  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(false), 700);
    return () => window.clearTimeout(t);
  }, [flash]);

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

      <div
        id="download"
        className={cnReady(mounted, "mx-auto mt-10 w-full max-w-[520px] text-left")}
        style={{ transitionDelay: "280ms" }}
      >
        <div
          className={
            "overflow-hidden rounded-md bg-bg transition-[box-shadow] duration-500 " +
            (flash
              ? "shadow-[0_0_0_1px_rgb(255_255_255_/_0.35),0_24px_60px_rgb(0_0_0_/_0.45),0_0_48px_rgb(255_255_255_/_0.08)]"
              : "shadow-[0_0_0_1px_rgb(255_255_255_/_0.1),0_24px_60px_rgb(0_0_0_/_0.45)]")
          }
        >
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
                className={
                  "relative px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 " +
                  (tab === "editor" ? "text-fg" : "text-faint hover:text-muted")
                }
              >
                Script
                <span
                  className={
                    "absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-fg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (tab === "editor" ? "scale-x-100" : "scale-x-0")
                  }
                />
              </button>
              <button
                type="button"
                onClick={() => setTab("output")}
                className={
                  "relative px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors duration-200 " +
                  (tab === "output" ? "text-fg" : "text-faint hover:text-muted")
                }
              >
                Output
                <span
                  className={
                    "absolute inset-x-2.5 -bottom-0.5 h-px origin-left bg-fg transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] " +
                    (tab === "output" ? "scale-x-100" : "scale-x-0")
                  }
                />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="relative min-h-[132px] border-b border-line">
            {tab === "editor" ? (
              <div className="flex min-h-[132px] animate-[fadeSlide_400ms_cubic-bezier(0.22,1,0.36,1)]">
                <div className="select-none border-r border-line px-2.5 py-3 text-right font-mono text-[11px] leading-6 text-faint/50">
                  <div>1</div>
                  <div>2</div>
                </div>
                <pre className="flex-1 overflow-x-auto px-3 py-3 font-mono text-[12px] leading-6 text-fg md:text-[13px]">
                  <span className="select-all">{LOADSTRING}</span>
                  <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] bg-fg align-text-bottom animate-pulse" />
                </pre>
              </div>
            ) : (
              <div className="min-h-[132px] space-y-1 px-4 py-3 font-mono text-[11px] leading-5 text-muted">
                {logs.map((line, i) => (
                  <div
                    key={`${runId}-${line}-${i}`}
                    className={
                      "opacity-0 " +
                      (i === logs.length - 1 ? "text-fg" : "")
                    }
                    style={{
                      animation: `fadeSlide 420ms cubic-bezier(0.22,1,0.36,1) ${i * 90}ms forwards`,
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 px-3 py-3">
            <button
              type="button"
              onClick={execute}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-fg px-5 text-[12px] font-medium text-accent-fg transition duration-200 hover:opacity-90 active:scale-[0.96]"
            >
              <span className="relative flex size-3.5 items-center justify-center">
                <Check
                  className={
                    "absolute size-3.5 transition duration-200 " +
                    (copied ? "scale-100 opacity-100" : "scale-75 opacity-0")
                  }
                />
                <Play
                  className={
                    "absolute size-3.5 transition duration-200 " +
                    (copied ? "scale-75 opacity-0" : "scale-100 opacity-100")
                  }
                />
              </span>
              {copied ? "Copied" : "Execute"}
            </button>
            <button
              type="button"
              onClick={copy}
              className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-medium text-fg shadow-[0_0_0_1px_rgb(255_255_255_/_0.12)] transition duration-200 hover:bg-fg/5 active:scale-[0.96]"
            >
              <Copy className="size-3.5" />
              Copy
            </button>
            <button
              type="button"
              onClick={() => {
                setRunId((n) => n + 1);
                setLogs(["Cleared."]);
                setTab("output");
              }}
              className="inline-flex h-9 items-center gap-2 rounded-full px-4 text-[12px] font-medium text-muted transition duration-200 hover:text-fg active:scale-[0.96]"
            >
              <Trash2 className="size-3.5" />
              Clear
            </button>
            <a
              href="/loader.lua"
              download="loader.lua"
              className="ml-auto inline-flex h-9 items-center rounded-full px-4 font-mono text-[11px] text-faint transition duration-200 hover:text-fg"
            >
              .lua ↘
            </a>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-faint">
            <span className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-fg status-pulse" />
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

      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
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
