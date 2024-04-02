import type { ThemeTypes } from "@/types/themeTypes/ThemeType";

const DarkTheme: ThemeTypes = {
  name: "DarkTheme",
  dark: true,
  variables: {
    "border-color": "#eeeeee",
    "carousel-control-size": 10,
  },
  colors: {
    primary: "#A278FF",
    secondary: "#49BEFF",
    info: "#539BFF",
    success: "#0aad90",
    accent: "#FFAB91",
    warning: "#FFAE1F",
    error: "#c96c53",
    muted: "#A6B1C0",
    lightprimary: "#90a4ae",
    lightsecondary: "#17191D",
    lightsuccess: "#192022",
    lighterror: "#2C2F33",
    lightwarning: "#2F3338",
    textPrimary: "#D7DAE0",
    textSecondary: "#D7DAE0",
    borderColorLight: "#e5eaef",
    borderColor: "#3C3F41",
    inputBorder: "#FFF",
    containerBg: "#2C2F33",
    hoverColor: "#23272A",
    surface: "#2C2F33",
    "on-surface-variant": "#2C2F33",
    grey100: "#2C2F33",
    grey200: "#23272A",
  },
};
export { DarkTheme };
