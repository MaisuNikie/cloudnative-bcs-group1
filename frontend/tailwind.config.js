/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--bg-1)",
        secondary: "var(--bg-2)",

        "tx-primary": "var(--text-1)",
        "tx-secondary": "var(--text-2)",

        "accent-primary": "var(--accent-1)",
        "accent-secondary": "var(--accent-2)",

        "code-loading": "var(code-loading)",
        "code-error": "var(--code-error)",
        "code-success": "var(--code-success)"
      },
    },
  },
  plugins: [],
};
