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
    },
  },
  plugins: [import("@tailwindcss/typography")],
};
