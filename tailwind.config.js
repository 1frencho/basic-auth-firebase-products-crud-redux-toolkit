/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgLight: "var(--bgLight)",
        myPrimary: "var(--myPrimary)",
        myPrimaryDark: "var(--myPrimaryDark)",
        mySecondary: "var(--mySecondary)",
        mySecondaryDark: "var(--mySecondaryDark)",
      },
    },
  },
  plugins: [],
};
