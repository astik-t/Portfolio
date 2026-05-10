import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "rgba(255,255,255,0.035)",
        primary: "#E6E6E6",
        accent: "#BDBDBD",
        danger: "#F2F2F2",
        text: "#F5F7FA",
        muted: "#9CA3AF"
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"]
      },
      boxShadow: {
        glow: "0 0 30px rgba(255,255,255,0.16)",
        glowAccent: "0 0 30px rgba(255,255,255,0.12)",
        glowDanger: "0 0 30px rgba(255,255,255,0.2)"
      },
      borderRadius: {
        xl2: "1rem"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.04), transparent 30%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02))"
      },
      keyframes: {
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        pulseLine: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "20%": { opacity: "1" },
          "100%": { transform: "translateY(700%)", opacity: "0" }
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.06)" }
        }
      },
      animation: {
        floaty: "floaty 7s ease-in-out infinite",
        pulseLine: "pulseLine 3.5s linear infinite",
        glowPulse: "glowPulse 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;