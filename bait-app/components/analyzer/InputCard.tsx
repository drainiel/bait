import React, { useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { theme, spacing } from "../../theme";
import { colors } from "../../theme/tokens";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Button from "../ui/Button";

interface InputCardProps {
  value: string;
  onChangeText: (v: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function InputCard({
  value,
  onChangeText,
  onSubmit,
  loading,
}: InputCardProps) {
  const [focused, setFocused] = useState(false);

  return (
    <Card style={styles.card}>
      <Text variant="title2">Paste a link or text</Text>
      <Text variant="caption">
        YouTube, TikTok, Instagram, articles, or raw text
      </Text>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Paste a URL or financial content..."
        placeholderTextColor={theme.input.placeholderColor}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        editable={!loading}
      />
      <Button
        label="Analyze →"
        onPress={onSubmit}
        variant="primary"
        fullWidth
        loading={loading}
        disabled={!value.trim()}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  input: {
    backgroundColor: theme.input.background,
    borderRadius: theme.input.borderRadius,
    padding: theme.input.padding,
    color: theme.input.color,
    fontSize: theme.input.fontSize,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputFocused: {
    borderColor: colors.brand.primary,
  },
});
