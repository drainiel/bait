import React from "react";
import { StyleSheet } from "react-native";
import { theme, spacing } from "../../theme";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Badge from "../ui/Badge";
import Divider from "../ui/Divider";

interface VerdictCardProps {
  verdict: "BAIT" | "SUSPICIOUS" | "LEGIT";
  baitScore: number;
  summary: string;
}

const BADGE_VARIANT: Record<string, "bait" | "suspicious" | "legit"> = {
  BAIT: "bait",
  SUSPICIOUS: "suspicious",
  LEGIT: "legit",
};

export default function VerdictCard({
  verdict,
  baitScore,
  summary,
}: VerdictCardProps) {
  const vs = theme.verdictStyle(verdict);

  return (
    <Card style={[styles.card, { backgroundColor: vs.background }]}>
      <Badge label={verdict} variant={BADGE_VARIANT[verdict]} />
      <Text variant="hero" color={vs.color}>
        {baitScore}
      </Text>
      <Text variant="caption">/100 bait score</Text>
      <Divider />
      <Text variant="body">{summary}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
});
