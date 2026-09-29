/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#070a08",
        secondary: "#94a3b8",
        tertiary: "#0e1712",
        "tech-mint": "#00f59b",
        "tech-green": "#10b981",
        "tech-teal": "#06b6d4",
        "space-cyan": "#00f59b",
        "space-purple": "#10b981",
        "space-pink": "#06b6d4",
        "black-100": "#0b140f",
        "black-200": "#050806",
        "white-100": "#f8fafc",
      },
      boxShadow: {
        card: "0px 25px 90px -10px rgba(16, 185, 129, 0.15)",
        "glow-cyan": "0 0 25px rgba(0, 245, 155, 0.45)",
        "glow-purple": "0 0 25px rgba(16, 185, 129, 0.45)",
        "glow-green": "0 0 25px rgba(16, 185, 129, 0.45)",
        "glow-mint": "0 0 25px rgba(0, 245, 155, 0.45)",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "space-gradient": "linear-gradient(135deg, #00f59b 0%, #10b981 50%, #06b6d4 100%)",
        "tech-gradient": "linear-gradient(135deg, #00f59b 0%, #10b981 50%, #06b6d4 100%)",
      },
    },
  },
  plugins: [],
};
