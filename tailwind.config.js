/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        customBackgound: "#191414",
        customBlack: "#121212",
        customRed: "#FF0000",
        customYellow: "#FFBA00",
        customGreen: "#00AB47",
        customBlue: "#4086F3",
      },
      gradients: {
        "pod-ai":
          "linear-gradient(90deg, customRed, customYellow, customGreen, customBlue)",
      },
    },
  },
  plugins: [],
};
