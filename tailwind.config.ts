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
        sideImg: "url('/assets/img/signUpImg.svg')",
      },
      colors: {
        primary: {
          "50": "#1d0d33",
          "100": "#35185c",
          "200": "#4d2485",
          "300": "#6532ad",
          "400": "#7e40d5",
          "500": "#9650fa",
          "600": "#aa71fb",
          "700": "#be93fc",
          "800": "#d2b4fd",
          "900": "#e6d5fe",
          "1000": "#faf6ff",
          "1200": "#f7f4f9",
        },
        secondary: {
          "50": "#130C33",
          "100": "#22175B",
          "200": "#332382",
          "300": "#4430A8",
          "400": "#563ECC",
          "500": "#684DF0",
          "600": "#856FF3",
          "700": "#A191F6",
          "800": "#BEB3F9",
          "900": "#DBD4FB",
          "1000": "#F8F6FE",
        },
        tertiary: {
          "50": "#121531",
          "100": "#212658",
          "200": "#30387D",
          "300": "#414BA2",
          "400": "#535EC6",
          "500": "#6572E9",
          "600": "#828DED",
          "700": "#A0A8F1",
          "800": "#BDC2F6",
          "900": "#DADDFA",
          "1000": "#F7F8FE",
        },
        error: {
          "50": "#410E0B",
          "100": "#601410",
          "200": "#8C1D18",
          "300": "#B3261E",
          "400": "#DC362E",
          "500": "#E46962",
          "600": "#EC928E",
          "700": "#F2B8B5",
          "800": "#F9DEDC",
          "900": "#FCEEEE",
          "1000": "#FFFBF9",
        },
        neutral: {
          "50": "#101828",
          "100": "#1d2939",
          "200": "#344054",
          "300": "#475467",
          "400": "#667085",
          "500": "#98a2b3",
          "600": "#d0d5dd",
          "700": "#e4e7ec",
          "800": "#f2f4f7",
          "900": "#f9fafb",
          "1000": "#fcfcfd",
        },
      },
      fontFamily: {
        sans: ["Noto Sans"],
      },
      fontSize: {
        heading1: [
          "64px",
          {
            letterSpacing: "-1.5px",
            fontWeight: "500",
          },
        ],
        heading2: [
          "56px",
          {
            letterSpacing: "-0.5px",
            fontWeight: "500",
          },
        ],
        heading3: [
          "48px",
          {
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        heading4: [
          "42px",
          {
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        heading5: [
          "32px",
          {
            letterSpacing: "0px",
            fontWeight: "500",
          },
        ],
        "heading6-B": [
          "24px",
          {
            letterSpacing: "0.15px",
            fontWeight: "700",
          },
        ],
        "heading6-M": [
          "24px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "sub-title1-B": [
          "20px",
          {
            letterSpacing: "0.15px",
            fontWeight: "700",
          },
        ],
        "sub-title1-M": [
          "20px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "sub-title2-B": [
          "18px",
          {
            letterSpacing: "0.15px",
            fontWeight: "700",
          },
        ],
        "sub-title2-M": [
          "18px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "sub-title2-R": [
          "18px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        "sub-title3-B": [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "700",
          },
        ],
        "sub-title3-M": [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "sub-title4-M": [
          "14px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        body1: [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        body2: [
          "14px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        body3: [
          "12px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        caption1: [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        caption2: [
          "12px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        caption3: [
          "10px",
          {
            letterSpacing: "0.15px",
            fontWeight: "400",
          },
        ],
        label1: [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        label2: [
          "12px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "Button-L": [
          "20px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "Button-M": [
          "18px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "Button-S": [
          "16px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
        "Button-ES": [
          "12px",
          {
            letterSpacing: "0.15px",
            fontWeight: "500",
          },
        ],
      },

      placeholderColor: {
        nature: "#98a2b3",
      },
      width: {
        "155": "38.75rem",

        "120": "30rem",
        "100": "34.563rem",
        "92": "27.375rem",
        "78": "19rem",
        "77.5": "18.9rem",
        "77": "18.75rem",
        "76": "18.5rem",
        "54": "13.5rem",
        "50": "12.438rem",
        "42": "10.25rem",
        "38": "9.375rem",
        "30": "7.438rem",
        "29": "7.25rem",
        "25": "6.25rem",
      },
      height: {
        "140": "36.625rem",
        "13": "3.25rem",
        "7.5": "1.875rem",
        "": "53.75rem",
        "29": "7.25rem",
        "700": "43.75rem",
        "90%": "90%",
        "25": "6.25rem",
        "15": "3.75rem",
        "90dvh": "90dvh",
      },
      gap: {
        "29": "7.25rem",
        17: "4.5rem",
        13: "3.875rem",
        600: "37.5rem",
      },
      padding: {
        sign: "6.875rem 0rem",
        13: "3.25rem",
        44: "10.688rem",
        70: "17.5rem",
        100: "24.688rem",
        30: "7.4rem",
        23: "5.75rem",
        25: "6.25rem",
        "%": "20%",
      },
      borderRadius: {
        max: "3.75rem",
        60: "3.75rem",
      },
      borderWidth: {
        1: "0.063rem",
      },
      screens: {
        "3xl": "1850px",
        mxl: "1650px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
