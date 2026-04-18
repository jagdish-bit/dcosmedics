/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:        "#FDF8F3",
        accent:         "#B07A68",
        "accent-light": "#C9907A",
        "off-white":    "#2C1A12",
        graphite:       "#F5EDE5",
        muted:          "#9A7060",
        petal:          "#EDD5C5",
        gold:           "#C4A46B",
        "gold-light":   "#E8D4A8",
        copper:         "#8C5A48",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        sans:  ["'Montserrat'", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        shimmer:   "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      backgroundImage: {
        "copper-gradient": "linear-gradient(135deg, #B07A68 0%, #C4A46B 50%, #B07A68 100%)",
        "cream-gradient":  "linear-gradient(180deg, #FDF8F3 0%, #F5EDE5 100%)",
      },
    },
  },
  plugins: [],
};