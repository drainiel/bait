import React from "react";
import { StyleSheet } from "react-native";
import { spacing } from "../../theme";
import Card from "../ui/Card";
import Text from "../ui/Text";
import ScoreBar from "../ui/ScoreBar";

interface ScoreBreakdownProps {
  scores: {
    credibility: number;
    claimAccuracy: number;
    bias: number;
    transparency: number;
  };
}

export default function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <Card style={styles.card}>
      <Text variant="label">Breakdown</Text>
      <ScoreBar label="Credibility" score={scores.credibility} showValue />
      <ScoreBar label="Claim accuracy" score={scores.claimAccuracy} showValue />
      <ScoreBar label="Bias" score={scores.bias} showValue />
      <ScoreBar label="Transparency" score={scores.transparency} showValue />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
});
