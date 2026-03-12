const { base16Tailwind } = require("@donovanglover/base16-tailwind");
const { themesByFamily } = require("./styles/themes/themes");

const allThemes = Object.values(themesByFamily)
  .flat()
  .map((t) => t.value);

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["min-h-0", ...allThemes],
  // safelist: ["min-h-0"],
  plugins: [base16Tailwind],
};
