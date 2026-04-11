import React, { useRef, useEffect } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../theme";
import { TranscriptEntry } from "../../types";
import Text from "../ui/Text";

interface TranscriptListProps {
  entries: TranscriptEntry[];
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export default function TranscriptList({ entries }: TranscriptListProps) {
  const listRef = useRef<FlatList<TranscriptEntry>>(null);

  useEffect(() => {
    if (entries.length > 0) {
      listRef.current?.scrollToEnd({ animated: true });
    }
  }, [entries.length]);

  return (
    <FlatList
      ref={listRef}
      data={entries}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => {
        const isUser = item.role === "user";
        return (
          <View
            style={[styles.entry, isUser ? styles.userEntry : styles.agentEntry]}
          >
            <View
              style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.agentBubble,
              ]}
            >
              <Text variant="body">{item.text}</Text>
            </View>
            <Text
              variant="caption"
              color={colors.text.tertiary}
              style={isUser ? styles.timeRight : styles.timeLeft}
            >
              {formatTime(item.timestamp)}
            </Text>
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  entry: {
    gap: spacing.xs,
  },
  userEntry: {
    alignItems: "flex-end",
  },
  agentEntry: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: spacing.md,
    borderRadius: radius.lg,
  },
  agentBubble: {
    backgroundColor: colors.bg.surface,
  },
  userBubble: {
    backgroundColor: colors.brand.primaryDim,
  },
  timeLeft: {
    alignSelf: "flex-start",
  },
  timeRight: {
    alignSelf: "flex-end",
  },
});
