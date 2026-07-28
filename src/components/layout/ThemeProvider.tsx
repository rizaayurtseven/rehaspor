"use client";

import { useEffect, useSyncExternalStore } from "react";
import { getServerThemeSnapshot, getThemeSnapshot, subscribeToTheme } from "@/lib/themeStore";

export function ThemeProvider() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  return null;
}
