import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet } from "react-native";
import { colors, spacing, radius, animation } from "../../theme";
import { theme } from "../../theme";
import Text from "./Text";

interface ScoreBarProps {
  label: string;
  score: number;
  showValue?: boolean;
}

export default function ScoreBar({
  label,
  score,
  showValue = false,
}: ScoreBarProps) {
  const fillAnim = useRef(new Animated.Value(0)).current;
  const barColor = theme.scoreColor(score);

  useEffect(() => {
    Animated.timing(fillAnim, {
      toValue: score,
      duration: 600,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [score]);

  const fillWidth = fillAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="caption">{label}</Text>
        {showValue && (
          <Text variant="caption" color={barColor}>
            {score}
          </Text>
        )}
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            { width: fillWidth, backgroundColor: barColor },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  track: {
    height: 4,
    backgroundColor: colors.bg.elevated,
    borderRadius: radius.full,
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: radius.full,
  },
});
