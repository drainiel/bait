import React, { useState } from 'react';
import { ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { usePortfolio } from '../../hooks/usePortfolio';
import ScreenWrapper from '../../components/ui/ScreenWrapper';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import QuestionStep from '../../components/portfolio/QuestionStep';
import OptionSelector from '../../components/portfolio/OptionSelector';
import PortfolioResult from '../../components/portfolio/PortfolioResult';
import { colors, theme } from '../../theme';

const QUESTIONS = [
  {
    step: 0, question: "How old are you?",
    hint: "We use this to calibrate your investment horizon.",
    type: "numeric", key: "age" as const,
  },
  {
    step: 1, question: "What's your monthly income?",
    type: "select", key: "monthlyIncome" as const,
    options: [
      { value: "under1k", label: "Under €1,000" },
      { value: "1k-2k",   label: "€1,000 – €2,000" },
      { value: "2k-4k",   label: "€2,000 – €4,000" },
      { value: "over4k",  label: "Over €4,000" },
    ],
  },
  {
    step: 2, question: "What's your main financial goal?",
    type: "select", key: "goal" as const,
    options: [
      { value: "emergency_fund", label: "Emergency fund",     description: "3–6 months of expenses, accessible" },
      { value: "house",          label: "Buy a home",         description: "Save for a down payment" },
      { value: "retirement",     label: "Retirement",         description: "Long-term wealth for the future" },
      { value: "wealth",         label: "Grow wealth",        description: "Invest and compound over time" },
      { value: "travel",         label: "Travel / lifestyle", description: "Short-to-medium term savings" },
    ],
  },
  {
    step: 3, question: "How much risk can you handle?",
    type: "select", key: "riskTolerance" as const,
    options: [
      { value: "low",    label: "Low",    description: "Slow and steady. I don't want to lose money." },
      { value: "medium", label: "Medium", description: "Some ups and downs are fine for better returns." },
      { value: "high",   label: "High",   description: "I can handle big swings for bigger potential gains." },
    ],
  },
  {
    step: 4, question: "How many years can you invest?",
    hint: "Longer horizons allow more growth and risk tolerance.",
    type: "numeric", key: "timeHorizonYears" as const,
  },
];

function NumericInput({ value, onChangeText, placeholder }: {
  value: string; onChangeText: (v: string) => void; placeholder: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      style={[styles.input, focused && styles.inputFocused]}
      keyboardType="numeric"
      value={value}
      onChangeText={onChangeText}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={theme.input.placeholderColor}
      placeholder={placeholder}
    />
  );
}

export default function PortfolioScreen() {
  const { step, answers, setAnswer, next, back, submit, loading, result, error, reset } = usePortfolio();

  if (loading) {
    return (
      <ScreenWrapper centered scrollable={false}>
        <ActivityIndicator color={colors.brand.primary} size="large" />
        <Text variant="caption">Building your portfolio…</Text>
      </ScreenWrapper>
    );
  }

  if (result) {
    return (
      <ScreenWrapper>
        <PortfolioResult result={result} />
        <Button variant="ghost" label="Start over" onPress={reset} />
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper centered>
        <Text variant="body" color={colors.system.red}>{error}</Text>
        <Button variant="primary" label="Try again" onPress={reset} />
      </ScreenWrapper>
    );
  }

  const currentQ = QUESTIONS[step];

  return (
    <ScreenWrapper>
      <QuestionStep
        question={currentQ.question}
        hint={currentQ.hint}
        step={step}
        total={5}
        onNext={step === 4 ? submit : next}
        onBack={back}
        canNext={answers[currentQ.key] !== undefined && (answers[currentQ.key] as any) !== ""}
      >
        {currentQ.type === "select"
          ? <OptionSelector
              options={currentQ.options!}
              selected={(answers[currentQ.key] as string) ?? null}
              onSelect={(v) => setAnswer(currentQ.key, v)}
            />
          : <NumericInput
              value={String(answers[currentQ.key] ?? "")}
              onChangeText={(v) => {
                const cleaned = v.replace(/[^0-9]/g, '');
                setAnswer(currentQ.key, cleaned === '' ? '' : Number(cleaned));
              }}
              placeholder={step === 0 ? "e.g. 24" : "e.g. 10"}
            />
        }
      </QuestionStep>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.input.background,
    borderRadius: theme.input.borderRadius,
    padding: theme.input.padding,
    color: theme.input.color,
    fontSize: theme.input.fontSize,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputFocused: {
    borderColor: colors.brand.primary,
  },
});
