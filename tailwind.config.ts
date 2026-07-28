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
        card: "0 10px 30px rgba(15, 23, 42, 0.05)",
        lift: "0 24px 70px rgba(15, 23, 42, 0.12)"
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        sm: "0.125rem",
        md: "0.1875rem",
        lg: "0.25rem",
        xl: "0.5rem",
        "2xl": "0.75rem"
      }
    }
  },
  plugins: []
};

export default config;
