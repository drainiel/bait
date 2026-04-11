import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../theme";

interface StepIndicatorProps {
  total: number;
  current: number;
}

function Dot({ active }: { active: boolean }) {
  const widthAnim = useRef(new Animated.Value(active ? 20 : 6)).current;

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: active ? 20 : 6,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [active]);

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          width: widthAnim,
          height: 6,
          backgroundColor: active
            ? colors.brand.primary
            : colors.bg.elevated,
        },
      ]}
    />
  );
}

export default function StepIndicator({ total, current }: StepIndicatorProps) {
  return (
    <View style={styles.container}>
      {Array.from({ length: total }, (_, i) => (
        <Dot key={i} active={i === current} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.sm,
  },
  dot: {
    borderRadius: radius.full,
  },
});
