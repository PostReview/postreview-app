// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"Fira Sans"', "sans-serif"],
    },
    colors: {
      "gray-darkest": "#2e2c2c",
      "gray-dark": "#545454",
      "gray-medium": "#737373",
      "gray-light": "#d9d9d9",
      "green-dark": "#74b40a",
      green: "#94ec01",
      red: "#e84343",
      white: "#ffffff",
      black: "#000000",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
