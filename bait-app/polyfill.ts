if (typeof global.DOMException === 'undefined') {
  global.DOMException = Error as any;
}

// Register WebRTC polyfills before any ElevenLabs/LiveKit code evaluates
const { registerGlobals } = require('@livekit/react-native');
registerGlobals();