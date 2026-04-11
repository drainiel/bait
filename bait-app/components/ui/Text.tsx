import React from "react";
import {
  Text as RNText,
  StyleSheet,
  TextStyle,
  TextProps as RNTextProps,
} from "react-native";
import { typography, colors } from "../../theme";

type TextVariant =
  | "hero"
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "body"
  | "subhead"
  | "caption"
  | "label";

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  align?: "left" | "center" | "right";
  children: React.ReactNode;
}

const variantStyles: Record<TextVariant, TextStyle> = {
  hero: {
    fontSize: typography.size.hero,
    fontWeight: typography.weight.heavy,
    color: colors.text.primary,
  },
  largeTitle: {
    fontSize: typography.size.largeTitle,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  title1: {
    fontSize: typography.size.title1,
    fontWeight: typography.weight.bold,
    color: colors.text.primary,
  },
  title2: {
    fontSize: typography.size.title2,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  title3: {
    fontSize: typography.size.title3,
    fontWeight: typography.weight.semibold,
    color: colors.text.primary,
  },
  body: {
    fontSize: typography.size.body,
    fontWeight: typography.weight.regular,
    color: colors.text.primary,
  },
  subhead: {
    fontSize: typography.size.subhead,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
  caption: {
    fontSize: typography.size.caption,
    fontWeight: typography.weight.regular,
    color: colors.text.secondary,
  },
  label: {
    fontSize: typography.size.label,
    fontWeight: typography.weight.semibold,
    color: colors.text.tertiary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
};

export default function Text({
  variant = "body",
  color,
  align,
  style,
  children,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        variantStyles[variant],
        color ? { color } : undefined,
        align ? { textAlign: align } : undefined,
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
