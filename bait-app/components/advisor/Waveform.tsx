import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../theme";

interface WaveformProps {
  isActive: boolean;
}

const BAR_HEIGHTS = [24, 40, 56, 40, 24];
const STAGGER_DELAYS = [0, 80, 160, 80, 0];

export default function Waveform({ isActive }: WaveformProps) {
  const scaleValues = useRef(
    BAR_HEIGHTS.map(() => new Animated.Value(0.15))
  ).current;
  const animationsRef = useRef<Animated.CompositeAnimation[]>([]);

  useEffect(() => {
    if (isActive) {
      animationsRef.current = scaleValues.map((val, i) => {
        const anim = Animated.loop(
          Animated.sequence([
            Animated.timing(val, {
              toValue: 1.0,
              duration: 400,
              delay: STAGGER_DELAYS[i],
              useNativeDriver: true,
            }),
            Animated.timing(val, {
              toValue: 0.15,
              duration: 400,
              useNativeDriver: true,
            }),
          ])
        );
        anim.start();
        return anim;
      });
    } else {
      animationsRef.current.forEach((a) => a.stop());
      scaleValues.forEach((val) => {
        Animated.timing(val, {
          toValue: 0.15,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }

    return () => {
      animationsRef.current.forEach((a) => a.stop());
    };
  }, [isActive]);

  return (
    <View style={styles.container}>
      {BAR_HEIGHTS.map((height, i) => (
        <Animated.View
          key={i}
          style={[
            styles.bar,
            {
              height,
              transform: [{ scaleY: scaleValues[i] }],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  bar: {
    width: 3,
    borderRadius: radius.full,
    backgroundColor: colors.brand.primary,
  },
});
