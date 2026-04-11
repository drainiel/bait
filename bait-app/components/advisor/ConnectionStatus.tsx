import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import Text from "../ui/Text";
import Button from "../ui/Button";

interface ConnectionStatusProps {
  status: "idle" | "connecting" | "connected" | "error";
  onRetry: () => void;
}

export default function ConnectionStatus({
  status,
  onRetry,
}: ConnectionStatusProps) {
  if (status === "idle") return null;

  if (status === "connecting") {
    return (
      <View style={styles.row}>
        <ActivityIndicator size="small" color={colors.text.secondary} />
        <Text variant="caption">Connecting…</Text>
      </View>
    );
  }

  if (status === "connected") {
    return (
      <View style={styles.row}>
        <View style={styles.liveDot} />
        <Text variant="caption" color={colors.system.green}>
          Live
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.errorContainer}>
      <Text variant="caption" color={colors.system.red}>
        Connection failed
      </Text>
      <Button label="Retry" variant="ghost" onPress={onRetry} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.system.green,
  },
  errorContainer: {
    alignItems: "center",
    gap: spacing.sm,
  },
});
