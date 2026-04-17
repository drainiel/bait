const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable "exports" field resolution so @elevenlabs/react-native resolves
// its "react-native" condition (index.react-native.js) instead of the
// default web entry. Without this, the SDK uses browser-only code paths
// that crash on missing WebRTC globals.
config.resolver.unstable_conditionNames = [
  'react-native',
  'require',
  'import',
];

module.exports = config;
