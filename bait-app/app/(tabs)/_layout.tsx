import React from 'react';
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      // Changes the active (selected) color for both the icon and label
      tintColor="#8C93FF"

      // Specifically defines the icon colors for both states
      iconColor={{
        default: '#FFFFFF', // Unselected icon color
        selected: '#8C93FF' // Selected icon color
      }}

      // Controls the unselected label text color
      labelStyle={{
        color: '#FFFFFF'
      }}
    >
      <NativeTabs.Trigger name="index">
        <Icon sf="magnifyingglass" />
        <Label>Analyze</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="advisor">
        <Icon sf="mic.fill" />
        <Label>Advisor</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="portfolio">
        <Icon sf="chart.pie.fill" />
        <Label>Portfolio</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}