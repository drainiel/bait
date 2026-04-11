import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import Text from "../ui/Text";

interface AllocationItemProps {
  asset: string;
  percentage: number;
  rationale: string;
  examples: string[];
}

export default function AllocationItem({
  asset,
  percentage,
  rationale,
  examples,
}: AllocationItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <Text variant="body" style={styles.bold}>
          {asset}
        </Text>
        <Text variant="caption">{rationale}</Text>
        <Text variant="caption" color={colors.text.tertiary}>
          {examples.join(", ")}
        </Text>
      </View>
      <Text variant="title2" color={colors.brand.primary}>
        {percentage}%
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  left: {
    flex: 1,
    gap: spacing.xs,
    marginRight: spacing.md,
  },
  bold: {
    fontWeight: "700",
  },
});
