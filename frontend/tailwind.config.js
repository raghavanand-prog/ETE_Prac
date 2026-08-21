/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#0c0c0c",
          100: "#151515",
          200: "#1f1f1f",
          300: "#2a2a2a",
          400: "#3a3a3a"
        },
        accent: {
          300: "#fbbf24",
          400: "#f4a323",
          500: "#f59e0b",
          700: "#b45309"
        }
      }
    }
  },
  plugins: []
};