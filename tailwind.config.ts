import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/page",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#1d0d33",
          "100": "#35185c",
          "200": "4d2485",
          "300": "#6532ad",
          "400": "7e40d5",
          "500": "9650fa",
          "600": "aa71fb",
          "700": "be93fc",
          "800": "d2b4fd",
          "900": "e6d5fe",
          "1000": "faf6ff",
          "1200": "f714f9",
        },
        secondary: {},
        tertiary: {},
        error: {},
        neutral: {},
      },
    },
  },
  plugins: [],
};
export default config;
