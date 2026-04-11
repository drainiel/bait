import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../theme";
import Text from "./Text";

type BadgeVariant = "bait" | "suspicious" | "legit" | "neutral" | "brand";

interface BadgeProps {
  label: string;
  variant: BadgeVariant;
}

const VARIANT_STYLES: Record<BadgeVariant, { bg: string; text: string }> = {
  bait: { bg: colors.verdict.baitDim, text: colors.verdict.bait },
  suspicious: {
    bg: colors.verdict.suspiciousDim,
    text: colors.verdict.suspicious,
  },
  legit: { bg: colors.verdict.legitDim, text: colors.verdict.legit },
  neutral: { bg: colors.bg.elevated, text: colors.text.secondary },
  brand: { bg: colors.brand.primaryDim, text: colors.brand.primary },
};

export default function Badge({ label, variant }: BadgeProps) {
  const v = VARIANT_STYLES[variant];
  return (
    <View style={[styles.badge, { backgroundColor: v.bg }]}>
      <Text variant="label" color={v.text}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
});
