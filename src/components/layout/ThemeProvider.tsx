"use client";

import { useEffect } from "react";
import { defaultTheme, isThemeId } from "@/lib/themes";

const storageKey = "reha-spor-theme";

export function ThemeProvider() {
  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKey);
    const theme = isThemeId(storedTheme) ? storedTheme : defaultTheme;
    document.documentElement.dataset.theme = theme;
  }, []);

  return null;
}
