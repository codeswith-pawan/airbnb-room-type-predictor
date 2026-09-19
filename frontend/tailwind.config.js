/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1220",
          900: "#101A2E",
          700: "#2A3A5C",
          500: "#5B6B8C",
          300: "#9AA6C0",
        },
        cobalt: {
          700: "#1D3FA6",
          600: "#2451D6",
          500: "#3563E9",
          100: "#E6ECFD",
          50: "#F3F6FE",
        },
        canvas: {
          DEFAULT: "#FAF9F6",
          card: "#FFFFFF",
          sunk: "#F3F1EC",
          line: "#E7E3DA",
        },
        signal: {
          green: "#0E9F6E",
          amber: "#B7791F",
          red: "#D6455D",
        },
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "system-ui", "sans-serif"],
        body: ["\"Inter\"", "system-ui", "sans-serif"],
        mono: ["\"JetBrains Mono\"", "ui-monospace", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(23, 20, 15, 0.04), 0 10px 28px -10px rgba(23, 20, 15, 0.12)",
        panel: "0 1px 2px rgba(23, 20, 15, 0.04), 0 24px 48px -20px rgba(16, 26, 46, 0.20)",
        pop: "0 6px 16px rgba(36, 81, 214, 0.22)",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      backgroundImage: {
        glow: "radial-gradient(60% 50% at 50% 0%, rgba(53, 99, 233, 0.08), transparent 70%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='90' height='90'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        rise: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: 0, transform: "scale(0.96)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        pulseDot: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.35 },
        },
        ring: {
          "0%": { transform: "scale(0.85)", opacity: 0.5 },
          "100%": { transform: "scale(1.5)", opacity: 0 },
        },
      },
      animation: {
        rise: "rise 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        pop: "pop 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        pulseDot: "pulseDot 2s ease-in-out infinite",
        ring: "ring 1.8s cubic-bezier(0.16, 1, 0.3, 1) infinite",
      },
    },
  },
  plugins: [],
};
