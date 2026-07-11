"use client";

import { Check, Palette } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { defaultTheme, isThemeId, themes, type ThemeId, type ThemeOption } from "@/lib/themes";

const storageKey = "reha-spor-theme";

function ThemeSwatch({ theme }: { theme: ThemeOption }) {
  return (
    <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/10">
      <span className="absolute inset-y-0 left-0 w-1/2" style={{ backgroundColor: theme.swatches[0] }} />
      <span className="absolute right-0 top-0 h-1/2 w-1/2" style={{ backgroundColor: theme.swatches[1] }} />
      <span className="absolute bottom-0 right-0 h-1/2 w-1/2" style={{ backgroundColor: theme.swatches[2] }} />
    </span>
  );
}

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeId>(defaultTheme);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme = isThemeId(storedTheme) ? storedTheme : defaultTheme;
    setSelectedTheme(theme);
    document.documentElement.dataset.theme = theme;
  }, []);

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
    setSelectedTheme(theme);
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(storageKey, theme);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded border border-brand-line bg-white/80 px-3 text-sm font-bold text-brand-navy transition hover:border-brand-red"
      >
        <ThemeSwatch theme={currentTheme} />
        <span className="hidden xl:inline">{currentTheme.name}</span>
        <Palette size={16} aria-hidden="true" />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Tema seç"
          className="absolute right-0 top-[calc(100%+10px)] z-50 w-72 overflow-hidden rounded-lg border border-white/10 bg-[#181a1c] p-2 text-white shadow-2xl"
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
                    ? "flex w-full items-center gap-3 rounded-md bg-white/8 px-3 py-3 text-left text-sm font-bold"
                    : "flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-bold text-slate-200 transition hover:bg-white/6"
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
