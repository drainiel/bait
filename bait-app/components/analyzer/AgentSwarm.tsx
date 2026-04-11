import React from "react";
import { View, StyleSheet } from "react-native";
import { spacing } from "../../theme";
import { AgentStatus } from "../../types";
import Card from "../ui/Card";
import Text from "../ui/Text";
import AgentRow from "../ui/AgentRow";
import Divider from "../ui/Divider";

interface AgentSwarmProps {
  status: AgentStatus;
}

const AGENTS: { key: keyof AgentStatus; label: string }[] = [
  { key: "credibility", label: "Credibility check" },
  { key: "claims", label: "Claim extraction" },
  { key: "bias", label: "Bias detection" },
  { key: "verdict", label: "Verdict synthesis" },
];

export default function AgentSwarm({ status }: AgentSwarmProps) {
  return (
    <Card noPadding>
      <View style={styles.header}>
        <Text variant="label">Agent swarm</Text>
      </View>
      <Divider />
      {AGENTS.map((agent, i) => (
        <React.Fragment key={agent.key}>
          {i > 0 && <Divider />}
          <AgentRow label={agent.label} phase={status[agent.key]} />
        </React.Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: spacing.lg,
  },
});
