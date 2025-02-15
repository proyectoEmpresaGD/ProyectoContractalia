/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sfpro: ['SF Pro', 'sans-serif']
      },
      colors: {
        primary: "#706FE5",
        secondary: "#EAEAFC",
        footer: "#2E3E5C",
      },
    },
  },
  plugins: [],
};
