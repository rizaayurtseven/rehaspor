"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { getServerThemeSnapshot, getThemeSnapshot, persistTheme, subscribeToTheme } from "@/lib/themeStore";
import { themes, type ThemeId, type ThemeOption } from "@/lib/themes";

function ThemeSwatch({ theme, compact = false }: { theme: ThemeOption; compact?: boolean }) {
  return (
    <span className={`relative shrink-0 overflow-hidden rounded-full border border-current/15 ${compact ? "h-5 w-5" : "h-6 w-6"}`}>
      <span className="absolute inset-y-0 left-0 w-1/2" style={{ backgroundColor: theme.swatches[0] }} />
      <span className="absolute right-0 top-0 h-1/2 w-1/2" style={{ backgroundColor: theme.swatches[1] }} />
      <span className="absolute bottom-0 right-0 h-1/2 w-1/2" style={{ backgroundColor: theme.swatches[2] }} />
    </span>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const selectedTheme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const currentTheme = themes.find((theme) => theme.id === selectedTheme) ?? themes[0];

  const selectTheme = (theme: ThemeId) => {
    persistTheme(theme);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-label={`Renk temasını değiştir. Seçili tema: ${currentTheme.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded border border-brand-line bg-brand-cream px-3 text-sm font-bold text-brand-ink transition hover:border-brand-red focus-visible:outline-brand-red"
      >
        <ThemeSwatch theme={currentTheme} compact />
        <span className="hidden 2xl:inline">{currentTheme.name}</span>
        <Palette size={15} className="text-brand-muted" aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Tema seç"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded border border-slate-700 bg-slate-950 p-2 text-white shadow-2xl"
        >
          {themes.map((theme) => {
            const active = theme.id === selectedTheme;

            return (
              <button
                key={theme.id}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => selectTheme(theme.id)}
                className={
                  active
                    ? "flex w-full items-center gap-3 rounded bg-white/10 px-3 py-2.5 text-left text-sm font-bold text-white"
                    : "flex w-full items-center gap-3 rounded px-3 py-2.5 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/5 hover:text-white"
                }
              >
                <ThemeSwatch theme={theme} />
                <span className="flex-1">{theme.name}</span>
                {active ? <Check size={16} className="text-white" aria-hidden="true" /> : null}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
