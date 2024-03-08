/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "#0f0f0f",
        secondaryBg: "#ffffff1a",
        tertiaryBg: "#121212",
        primaryText: "#fff",
        secondaryText: "#aaaaaa",
        hoverBg: "#ffffff1a",
        secondaryHoverBg: "#ffffff3b",
        border: "#353535",
      },
    },
  },
  plugins: [],
};
