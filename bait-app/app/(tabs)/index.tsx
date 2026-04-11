import React from 'react';
import { useAnalyze } from '../../hooks/useAnalyze';
import ScreenWrapper from '../../components/ui/ScreenWrapper';
import InputCard from '../../components/analyzer/InputCard';
import AgentSwarm from '../../components/analyzer/AgentSwarm';
import VerdictCard from '../../components/analyzer/VerdictCard';
import ScoreBreakdown from '../../components/analyzer/ScoreBreakdown';
import FlagList from '../../components/analyzer/FlagList';
import WhatToDoCard from '../../components/analyzer/WhatToDoCard';
import Button from '../../components/ui/Button';
import Text from '../../components/ui/Text';
import { colors } from '../../theme';
import { View } from 'react-native';
import { Image } from 'expo-image';

export default function AnalyzerScreen() {
  const { input, setInput, loading, agentStatus, result, error, analyze, reset } = useAnalyze();

  if (loading) {
    return (
      <ScreenWrapper scrollable={false}>
        <InputCard value={input} onChangeText={setInput} onSubmit={analyze} loading={true} />
        <AgentSwarm status={agentStatus} />
      </ScreenWrapper>
    );
  }

  if (result) {
    return (
      <ScreenWrapper>
        <VerdictCard verdict={result.verdict.verdict} baitScore={result.verdict.baitScore} summary={result.verdict.summary} />
        <ScoreBreakdown scores={result.verdict.scores} />
        <FlagList title="Top red flags" flags={result.verdict.topReasons} />
        <WhatToDoCard text={result.verdict.whatToDo} />
        <Button variant="ghost" label="Analyze another" onPress={reset} />
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

  return (
    <ScreenWrapper>
      <View style={{ alignItems: 'center', marginTop: 40, marginBottom: 40 }}>
        <Image
          source={require('../../assets/images/logo.svg')}
          style={{ width: 80, height: 80, marginBottom: 8 }}
          contentFit="contain"
        />
        <Text variant="title1" color={colors.brand.primary} style={{ textTransform: 'uppercase' }}>bait </Text>
        <Text variant="body" style={{ fontWeight: 'bold' }} color={colors.brand.primary}>Behavioral Analysis & Investment Tutor</Text>
      </View>
      <InputCard value={input} onChangeText={setInput} onSubmit={analyze} loading={false} />
    </ScreenWrapper>
  );
}
