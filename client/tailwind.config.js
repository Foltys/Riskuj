/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3b82f6",
          dark: "#1e40af",
        },
        secondary: {
          light: "#10b981",
          dark: "#065f46",
        },
        background: {
          light: "#ffffff",
          dark: "#1f2937",
        },
        text: {
          light: "#1f2937",
          dark: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};
