/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        element: "hsl(var(--element-clr)) ",
        background: "hsl(var(--bg-clr))",
        input: "hsl(var(--input-clr))",
        text: "hsl(var(--text-clr))",
        text2: "hsl(var(--text-clr-2))"
      },
    },
  },
  plugins: [],
};
