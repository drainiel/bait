import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { theme } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  noPadding?: boolean;
}

export default function Card({ children, style, noPadding }: CardProps) {
  return (
    <View style={[styles.card, noPadding && styles.noPadding, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.card.background,
    borderRadius: theme.card.borderRadius,
    padding: theme.card.padding,
  },
  noPadding: {
    padding: 0,
  },
});
