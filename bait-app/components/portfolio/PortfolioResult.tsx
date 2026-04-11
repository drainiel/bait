import React from "react";
import { View, StyleSheet } from "react-native";
import { colors, spacing } from "../../theme";
import { AllocationResult } from "../../types";
import Card from "../ui/Card";
import Text from "../ui/Text";
import Divider from "../ui/Divider";
import FlagList from "../analyzer/FlagList";
import AllocationItem from "./AllocationItem";
import { Image } from "expo-image";

const PUNK_COLORS = [
  "#6E6AE8", // Brand Primary
  "#FF00FF", // Neon Pink
  "#00FFFF", // Cyan
  "#39FF14", // Neon Green
  "#FFD700", // Yellow
  "#FF453A", // Red
  "#FF9F0A", // Orange
];

function generatePieChartSvg(allocations: AllocationResult["allocations"]): string {
  let paths = "";
  let currentAngle = 0;
  const radius = 50;
  const cx = 50;
  const cy = 50;

  allocations.forEach((alloc, i) => {
    const angle = (alloc.percentage / 100) * 360;
    if (angle >= 360) {
      paths += `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${PUNK_COLORS[i % PUNK_COLORS.length]}" />`;
      return;
    }
    
    // Start at -90 degrees (top)
    const startAngle = currentAngle - 90;
    const endAngle = currentAngle + angle - 90;
    
    const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
    
    const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180);

    const largeArcFlag = angle > 180 ? 1 : 0;

    paths += `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z" fill="${PUNK_COLORS[i % PUNK_COLORS.length]}" />`;
    currentAngle += angle;
  });

  const svg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">${paths}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

interface PortfolioResultProps {
  result: AllocationResult;
}

export default function PortfolioResult({ result }: PortfolioResultProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.gap}>
        <Text variant="label">Strategy</Text>
        <Text variant="body">{result.summary}</Text>
      </Card>

      <Card noPadding>
        <View style={styles.header}>
          <Text variant="label">Allocation</Text>
        </View>
        {result.allocations.map((alloc, i) => (
          <React.Fragment key={i}>
            <Divider />
            <AllocationItem
              asset={alloc.asset}
              percentage={alloc.percentage}
              rationale={alloc.rationale}
              examples={alloc.examples}
            />
          </React.Fragment>
        ))}
        <Divider />
        <View style={styles.chartContainer}>
          <Image 
            source={{ uri: generatePieChartSvg(result.allocations) }} 
            style={styles.pieChart} 
            contentFit="contain" 
            transition={300}
          />
          <View style={styles.chartLegend}>
            {result.allocations.map((alloc, i) => (
              <View key={i} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: PUNK_COLORS[i % PUNK_COLORS.length] }]} />
                <Text variant="caption">{alloc.asset} ({alloc.percentage}%)</Text>
              </View>
            ))}
          </View>
        </View>
      </Card>

      <Card style={styles.gap}>
        <Text variant="label">Monthly contribution</Text>
        <Text variant="title2">{result.monthlyContribution}</Text>
      </Card>

      <FlagList title="Key risks" flags={result.keyRisks} />

      <Card style={[styles.gap, styles.tipCard]}>
        <Text variant="label" color={colors.brand.primary}>
          BTM NEXT tip
        </Text>
        <Text variant="body">{result.btmTip}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  gap: {
    gap: spacing.sm,
  },
  header: {
    padding: spacing.lg,
  },
  tipCard: {
    backgroundColor: colors.brand.primaryDim,
  },
  chartContainer: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.lg,
  },
  pieChart: {
    width: 200,
    height: 200,
  },
  chartLegend: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
