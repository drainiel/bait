import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAdvisor } from '../../hooks/useAdvisor';
import ScreenWrapper from '../../components/ui/ScreenWrapper';
import Text from '../../components/ui/Text';
import Button from '../../components/ui/Button';
import ConnectionStatus from '../../components/advisor/ConnectionStatus';
import Waveform from '../../components/advisor/Waveform';
import TranscriptList from '../../components/advisor/TranscriptList';
import { spacing } from '../../theme';

export default function AdvisorScreen() {
  const { status, isSpeaking, transcript, startSession, endSession, error } = useAdvisor();

  const isConnected = status === 'connected';
  const isConnecting = status === 'connecting';

  const handleToggle = () => {
    if (isConnected) {
      endSession();
    } else {
      startSession();
    }
  };

  return (
    <ScreenWrapper scrollable={false}>
      <Text variant="largeTitle">Advisor</Text>
      <Text variant="caption">Your BTM NEXT financial mentor</Text>
      <ConnectionStatus status={status} onRetry={startSession} />
      <View style={styles.waveformContainer}>
        <Waveform isActive={isSpeaking} />
      </View>
      <Button
        label={isConnecting ? 'Connecting...' : isConnected ? 'End Session' : 'Start Session'}
        onPress={handleToggle}
        variant={isConnected ? 'secondary' : 'primary'}
        loading={isConnecting}
        disabled={isConnecting}
      />
      <TranscriptList entries={transcript} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  waveformContainer: {
    marginVertical: spacing.xl,
  },
});
