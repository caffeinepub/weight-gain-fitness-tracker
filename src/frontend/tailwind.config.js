import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        // Custom fitness theme colors
        "fit-red": "oklch(0.57 0.22 27)",
        "fit-red-bright": "oklch(0.62 0.24 27)",
        "fit-red-dim": "oklch(0.42 0.18 27)",
        "fit-black": "oklch(0.08 0 0)",
        "fit-surface-1": "oklch(0.10 0 0)",
        "fit-surface-2": "oklch(0.14 0 0)",
        "fit-surface-3": "oklch(0.18 0 0)",
      },
      fontFamily: {
        sans: ["'Outfit'", "system-ui", "sans-serif"],
        display: ["'Bricolage Grotesque'", "'Outfit'", "sans-serif"],
        body: ["'Outfit'", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        "red-glow": "0 0 15px oklch(0.57 0.22 27 / 0.4), 0 0 30px oklch(0.57 0.22 27 / 0.2)",
        "red-glow-lg": "0 0 25px oklch(0.57 0.22 27 / 0.5), 0 0 50px oklch(0.57 0.22 27 / 0.3)",
        "card-dark": "0 4px 24px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "red-gradient": "linear-gradient(135deg, oklch(0.57 0.22 27) 0%, oklch(0.42 0.18 27) 100%)",
        "dark-gradient": "linear-gradient(180deg, oklch(0.08 0 0) 0%, oklch(0.12 0 0) 100%)",
        "footer-gradient": "linear-gradient(135deg, oklch(0.57 0.22 27) 0%, oklch(0.35 0.15 27) 40%, oklch(0.08 0 0) 100%)",
        "hero-radial": "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.57 0.22 27 / 0.15) 0%, transparent 70%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
