import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Divider from "../ui/Divider";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface OptionSelectorProps {
  options: Option[];
  selected: string | null;
  onSelect: (value: string) => void;
}

export default function OptionSelector({
  options,
  selected,
  onSelect,
}: OptionSelectorProps) {
  return (
    <Card noPadding>
      {options.map((opt, i) => {
        const isSelected = selected === opt.value;
        return (
          <React.Fragment key={opt.value}>
            {i > 0 && <Divider />}
            <TouchableOpacity
              onPress={() => onSelect(opt.value)}
              activeOpacity={0.7}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
            >
              <Text variant="body">{opt.label}</Text>
              {opt.description && (
                <Text variant="caption">{opt.description}</Text>
              )}
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </Card>
  );
}

const styles = StyleSheet.create({
  option: {
    padding: spacing.lg,
    gap: spacing.xs,
  },
  optionSelected: {
    backgroundColor: colors.brand.primaryDim,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand.primary,
  },
});
