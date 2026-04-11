import React from "react";
import { StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import Card from "../ui/Card";
import Text from "../ui/Text";

interface WhatToDoCardProps {
  text: string;
}

export default function WhatToDoCard({ text }: WhatToDoCardProps) {
  return (
    <Card style={styles.card}>
      <Text variant="label" color={colors.verdict.legit}>
        What to do
      </Text>
      <Text variant="body">{text}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.verdict.legitDim,
    gap: spacing.sm,
  },
});
