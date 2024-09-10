import { fontFamily as _fontFamily } from "tailwindcss/defaultTheme";

export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      sans: ["Inter var", ..._fontFamily.sans],
      mono: ["Plus Jakarta Sans", ..._fontFamily.mono],
    },
    colors: {
      "custom-light": "#003145",
      "custom-dark": "#002A3B",
      "custom-green": "#44924C",
    },
  },
};
export const plugins = [];
