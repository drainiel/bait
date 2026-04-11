import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Divider from "../ui/Divider";

interface FlagListProps {
  flags: string[];
  title: string;
}

export default function FlagList({ flags, title }: FlagListProps) {
  if (flags.length === 0) return null;

  return (
    <Card noPadding>
      <View style={styles.header}>
        <Text variant="label">{title}</Text>
      </View>
      {flags.map((flag, i) => (
        <React.Fragment key={i}>
          <Divider />
          <View style={styles.row}>
            <Text variant="caption" color={colors.verdict.bait}>
              {flag}
            </Text>
          </View>
        </React.Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
  },
  row: {
    padding: spacing.lg,
  },
});
