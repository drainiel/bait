import { colors, spacing, radius, typography } from "./tokens";

export const theme = {
  colors,
  spacing,
  radius,
  typography,

  screen: {
    background: colors.bg.base,
    paddingH: spacing.lg,
    cardGap: spacing.md,
  },

  card: {
    background: colors.bg.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },

  input: {
    background: colors.bg.elevated,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text.primary,
    placeholderColor: colors.text.tertiary,
    fontSize: typography.size.body,
  },

  verdictStyle: (v: "BAIT" | "SUSPICIOUS" | "LEGIT") =>
    ({
      BAIT: {
        color: colors.verdict.bait,
        background: colors.verdict.baitDim,
      },
      SUSPICIOUS: {
        color: colors.verdict.suspicious,
        background: colors.verdict.suspiciousDim,
      },
      LEGIT: {
        color: colors.verdict.legit,
        background: colors.verdict.legitDim,
      },
    })[v],

  scoreColor: (score: number) => {
    if (score >= 65) return colors.score.high;
    if (score >= 35) return colors.score.mid;
    return colors.score.low;
  },
} as const;
