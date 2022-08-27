// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  content: ["{pages,app}/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        bounce: "bounce 1s infinite",
      },
      keyframes: {
        bounce: {
          "0%, 100%": {
            transform: "translateY(0%)",
            "animation-timing-function": "cubic-bezier(0, 0, 0.2, 1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0.8, 0, 1, 1)",
          },
        },
      },
    },
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
