/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Rajdhani", "sans-serif"],
        caprasimo: ["Caprasimo", "cursive"]
      },
    },
  },
  plugins: [],
}