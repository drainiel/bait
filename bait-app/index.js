// This custom entry point ensures WebRTC polyfills are registered
// BEFORE expo-router loads any app code (including ElevenLabs).
import './polyfill';
import 'expo-router/entry';
