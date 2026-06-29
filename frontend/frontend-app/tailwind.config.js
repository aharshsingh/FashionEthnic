/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — deep heritage navy + warm saffron coral
        navy: {
          DEFAULT: "#132C48",
          50: "#eef2f7",
          100: "#d4ddea",
          200: "#a8bbd4",
          300: "#7191b6",
          400: "#446a96",
          500: "#2c4d76",
          600: "#1f3c5e",
          700: "#132C48",
          800: "#0e2138",
          900: "#091625",
        },
        coral: {
          DEFAULT: "#FE8551",
          50: "#fff3ec",
          100: "#ffe1d0",
          200: "#ffc1a1",
          300: "#ff9d6f",
          400: "#FE8551",
          500: "#f96528",
          600: "#e64a14",
          700: "#bf3712",
          800: "#982f16",
          900: "#7a2a16",
        },
        cream: "#FBF7F2",
        sand: "#F3ECE2",
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Plus Jakarta Sans"', "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(19, 44, 72, 0.18)",
        card: "0 18px 40px -18px rgba(19, 44, 72, 0.28)",
        glow: "0 12px 28px -8px rgba(254, 133, 81, 0.55)",
        glass: "0 8px 32px rgba(19, 44, 72, 0.10)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(1200px 600px at 80% -10%, rgba(254,133,81,0.18), transparent 60%), radial-gradient(900px 500px at -10% 20%, rgba(19,44,72,0.10), transparent 55%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-14px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 1.6s infinite",
      },
    },
  },
  plugins: [],
}
