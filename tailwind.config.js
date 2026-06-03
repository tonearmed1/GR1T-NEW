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
        "outline": "#7e7576",
        "surface-container-lowest": "#ffffff",
        "surface-bright": "#f9f9f9",
        "on-primary": "#ffffff",
        "on-primary-container": "#848484",
        "primary-container": "#1b1b1b",
        "tertiary-fixed-dim": "#c7c6c6",
        "outline-variant": "#cfc4c5",
        "inverse-surface": "#2f3131",
        "surface-dim": "#dadada",
        "inverse-on-surface": "#f0f1f1",
        "secondary-container": "#fe7b2a",
        "surface-variant": "#e2e2e2",
        "on-background": "#1a1c1c",
        "background": "#f9f9f9",
        "surface": "#f9f9f9",
        "primary": "#000000",
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
};
