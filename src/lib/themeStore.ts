import { defaultTheme, isThemeId, type ThemeId } from "@/lib/themes";

const storageKey = "reha-spor-theme";
const changeEvent = "reha-spor-theme-change";

export function getThemeSnapshot(): ThemeId {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(storageKey);
  return isThemeId(storedTheme) ? storedTheme : defaultTheme;
}

export function getServerThemeSnapshot(): ThemeId {
  return defaultTheme;
}

export function subscribeToTheme(onStoreChange: () => void): () => void {
  window.addEventListener(changeEvent, onStoreChange);
  return () => window.removeEventListener(changeEvent, onStoreChange);
}

export function persistTheme(theme: ThemeId): void {
  window.localStorage.setItem(storageKey, theme);
  window.dispatchEvent(new Event(changeEvent));
}
