import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "../../theme";
import Text from "../ui/Text";
import Button from "../ui/Button";
import StepIndicator from "./StepIndicator";

interface QuestionStepProps {
  question: string;
  hint?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack: () => void;
  canNext: boolean;
  step: number;
  total: number;
}

export default function QuestionStep({
  question,
  hint,
  children,
  onNext,
  onBack,
  canNext,
  step,
  total,
}: QuestionStepProps) {
  return (
    <View style={styles.container}>
      <StepIndicator total={total} current={step} />
      <Text variant="title1">{question}</Text>
      {hint && <Text variant="subhead">{hint}</Text>}
      <View style={styles.content}>{children}</View>
      <View style={styles.buttons}>
        {step > 0 && (
          <Button label="Back" variant="ghost" onPress={onBack} />
        )}
        <View style={styles.nextWrap}>
          <Button
            label={step === total - 1 ? "Generate portfolio" : "Next →"}
            variant="primary"
            onPress={onNext}
            disabled={!canNext}
            fullWidth
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
  },
  content: {
    gap: spacing.md,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  nextWrap: {
    flex: 1,
  },
});
