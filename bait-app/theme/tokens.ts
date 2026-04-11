export const colors = {
  bg: {
    base: "#000000",
    surface: "#1C1C1E",
    elevated: "#2C2C2E",
    overlay: "#FFFFFF0A",
  },
  brand: {
    primary: "#8C93FF",
    primaryDim: "#171717",
  },
  verdict: {
    bait: "#FF453A",
    baitDim: "#FF453A18",
    suspicious: "#FF9F0A",
    suspiciousDim: "#FF9F0A18",
    legit: "#30D158",
    legitDim: "#30D15818",
  },
  text: {
    primary: "#FFFFFF",
    secondary: "#8E8E93",
    tertiary: "#48484A",
    inverse: "#000000",
  },
  border: {
    default: "#FFFFFF12",
    subtle: "#FFFFFF08",
    strong: "#FFFFFF20",
  },
  score: {
    high: "#30D158",
    mid: "#FF9F0A",
    low: "#FF453A",
  },
  system: {
    red: "#FF453A",
    orange: "#FF9F0A",
    green: "#30D158",
    blue: "#0A84FF",
    gray: "#8E8E93",
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 20,
  full: 999,
} as const;

export const typography = {
  size: {
    label: 11,
    caption: 13,
    subhead: 15,
    body: 17,
    title3: 20,
    title2: 22,
    title1: 28,
    largeTitle: 34,
    hero: 48,
  },
  weight: {
    regular: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
    heavy: "800" as const,
  },
} as const;

export const animation = {
  fast: 150,
  normal: 250,
  slow: 400,
} as const;
