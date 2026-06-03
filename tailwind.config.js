/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        ipad: "820px", // custom breakpoint
      },
      scale: {
        250: "2.5",
      },
      fontFamily: {
        britti: ["Britti Sans", "Arial", "sans-serif"],
      },
      colors: {
        "grit-orange": "#F57423",
        "surface-alt": "#F5F5F7",
        "surface-container-low": "#f3f3f4",
        "surface-container": "#eeeeee",
        "surface-container-high": "#e8e8e8",
        "on-surface": "#1a1c1c",
        "on-surface-variant": "#4c4546",
        "outline-variant": "#cfc4c5",
        "technical-grey": "#1D1D1F",
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
};
