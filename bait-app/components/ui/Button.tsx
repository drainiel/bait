import React from "react";
import { TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import { colors, spacing, radius, typography } from "../../theme";
import Text from "./Text";

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "ghost";
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  size?: "default" | "large";
}

export default function Button({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  fullWidth = false,
  size = "default",
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      style={[
        styles.base,
        size === "large" && styles.large,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "ghost" && styles.ghost,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" ? colors.text.inverse : colors.text.primary
          }
        />
      ) : (
        <Text
          variant="body"
          color={
            variant === "primary"
              ? colors.text.inverse
              : variant === "ghost"
                ? colors.text.secondary
                : colors.text.primary
          }
          style={styles.label}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
  },
  large: {
    minHeight: 56,
  },
  primary: {
    backgroundColor: colors.brand.primary,
  },
  secondary: {
    backgroundColor: colors.bg.surface,
    borderWidth: 0.5,
    borderColor: colors.border.strong,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  fullWidth: {
    width: "100%",
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontWeight: typography.weight.semibold,
  },
});
