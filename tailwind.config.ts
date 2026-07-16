import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "rgb(var(--brand-navy) / <alpha-value>)",
          ink: "rgb(var(--brand-ink) / <alpha-value>)",
          red: "rgb(var(--brand-red) / <alpha-value>)",
          soft: "rgb(var(--brand-soft) / <alpha-value>)",
          line: "rgb(var(--brand-line) / <alpha-value>)",
          steel: "rgb(var(--brand-steel) / <alpha-value>)",
          cream: "rgb(var(--brand-cream) / <alpha-value>)",
          panel: "rgb(var(--brand-panel) / <alpha-value>)",
          muted: "rgb(var(--brand-muted) / <alpha-value>)"
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(15, 23, 42, 0.05)",
        lift: "0 18px 50px rgba(15, 23, 42, 0.10)"
      },
      fontFamily: {
        sans: ["var(--font-hanken)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"]
      },
      borderRadius: {
        "2xl": "0.75rem"
      }
    }
  },
  plugins: []
};

export default config;
