/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#084887",
        secondary: "#909CC2",
        accent: "#F58A07",
        white: "#fff",
        online: "#4ACB68",
        offline: "#A5A5A5",
        away: "#E2C639",
        busy: "#E25313",
        gray: {
          100: "#f2f2f2",
          200: "#e9e9e9",
          500: "#7f7f7f",
        },
        dark: {
          300: "#303030",
          500: "#292A2A",
          800: "#222322",
        },
      },
    },

  },
  plugins: [],
};
