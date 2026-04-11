import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import { AgentPhase } from "../../types";
import Text from "./Text";

interface AgentRowProps {
  label: string;
  phase: AgentPhase;
}

const DOT_COLORS: Record<AgentPhase, string> = {
  idle: colors.text.tertiary,
  running: colors.system.orange,
  done: colors.system.green,
  error: colors.system.red,
};

export default function AgentRow({ label, phase }: AgentRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View
          style={[styles.dot, { backgroundColor: DOT_COLORS[phase] }]}
        />
        <Text variant="caption">{label}</Text>
      </View>
      <View style={styles.right}>
        {phase === "running" && (
          <ActivityIndicator size="small" color={colors.system.orange} />
        )}
        {phase === "done" && (
          <Text variant="caption" color={colors.system.green}>
            ✓
          </Text>
        )}
        {phase === "error" && (
          <Text variant="caption" color={colors.system.red}>
            ✕
          </Text>
        )}
        {phase === "idle" && (
          <Text variant="caption" color={colors.text.tertiary}>
            —
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  right: {
    width: 24,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
