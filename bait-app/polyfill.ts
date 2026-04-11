if (typeof global.DOMException === 'undefined') {
  global.DOMException = Error as any;
}

// Register WebRTC polyfills before any ElevenLabs/LiveKit code evaluates
const { registerGlobals } = require('@livekit/react-native');
registerGlobals();

// Metro can't resolve the "react-native" condition in @elevenlabs/react-native's
// exports field, so it loads the web entry instead of index.react-native.js.
// We manually import the RN entry to force the correct session setup strategy
// (WebRTC-based instead of browser AudioContext/AudioWorklet).
require('@elevenlabs/react-native/dist/index.react-native.js');

// Patch getSupportedConstraints if the polyfill left it out
if (
  typeof navigator !== 'undefined' &&
  navigator.mediaDevices &&
  typeof navigator.mediaDevices.getSupportedConstraints !== 'function'
) {
  (navigator.mediaDevices as any).getSupportedConstraints = () => ({
    autoGainControl: true,
    channelCount: true,
    echoCancellation: true,
    noiseSuppression: true,
    sampleRate: true,
    sampleSize: true,
    deviceId: true,
    groupId: true,
    width: true,
    height: true,
    frameRate: true,
    facingMode: true,
  });
}
