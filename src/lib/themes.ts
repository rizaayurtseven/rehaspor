export type ThemeId =
  | "alexandria"
  | "bauhaus"
  | "glacier"
  | "carbon"
  | "neon-tokyo"
  | "terra"
  | "silk"
  | "obsidian"
  | "sahara"
  | "candy";

export type ThemeOption = {
  id: ThemeId;
  name: string;
  swatches: [string, string, string];
};

export const defaultTheme: ThemeId = "carbon";

export const themes: ThemeOption[] = [
  { id: "alexandria", name: "Alexandria", swatches: ["#3b82f6", "#eab308", "#1f2937"] },
  { id: "bauhaus", name: "Bauhaus", swatches: ["#ef4444", "#2563eb", "#171717"] },
  { id: "glacier", name: "Glacier", swatches: ["#7dd3fc", "#d8b4fe", "#1e293b"] },
  { id: "carbon", name: "Carbon", swatches: ["#2563eb", "#22c55e", "#101818"] },
  { id: "neon-tokyo", name: "Neon Tokyo", swatches: ["#ec4899", "#2dd4bf", "#facc15"] },
  { id: "terra", name: "Terra", swatches: ["#4c7757", "#b48954", "#293428"] },
  { id: "silk", name: "Silk", swatches: ["#6366f1", "#a78bfa", "#312e81"] },
  { id: "obsidian", name: "Obsidian", swatches: ["#a855f7", "#34d399", "#0b0f14"] },
  { id: "sahara", name: "Sahara", swatches: ["#c25f2d", "#a85a3e", "#442d23"] },
  { id: "candy", name: "Candy", swatches: ["#ec4899", "#06b6d4", "#312e81"] }
];

export function isThemeId(value: string | null): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}
