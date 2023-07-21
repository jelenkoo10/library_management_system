/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "300px",
      md: "750px",
      lg: "1100px",
      xl: "1480px",
      "2xl": "1736px",
    },
  },
  plugins: [],
};
