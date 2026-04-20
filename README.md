# Behavioral Analysis & Investment Tutor

BAIT is a mobile application for analyzing content credibility. It pairs an Expo/React Native client with a Node.js backend that runs a pipeline of LLM-driven agents (claim extraction, bias detection, source credibility, final verdict) and exposes a voice interface via ElevenLabs and LiveKit.

## Tech Stack

**Mobile app (`bait-app/`)**
- Expo SDK 54 / React Native 0.81 (React 19)
- Expo Router 6 for file-based navigation
- TypeScript
- LiveKit React Native + WebRTC for real-time audio
- ElevenLabs React Native SDK for conversational voice
- Expo native tabs (bottom tabs)
- React Native Reanimated / Gesture Handler

**Backend (`bait-backend/`)**
- Node.js + Express 5
- TypeScript (run via `tsx`)
- Groq SDK and OpenAI SDK for LLM inference
- Cheerio + Axios for web scraping
- ElevenLabs API integration (proxied through the backend)
- CORS, dotenv

## Prerequisites

- Node.js 20+ and npm
- Git
- For mobile builds:
  - iOS: macOS with Xcode 15+ and CocoaPods
- Expo Go app (optional, for quick device testing)
- API keys:
  - `GROQ_API_KEY`
  - `OPENAI_API_KEY`
  - `ELEVENLABS_API_KEY` and `ELEVENLABS_AGENT_ID`

## Installation

Clone the repo and install dependencies for each workspace:

```bash
git clone <repo-url> bait
cd bait

# Backend
cd bait-backend
npm install

# Mobile app
cd ../bait-app
npm install
```

Create `bait-backend/.env`:

```env
PORT=3001
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
ELEVENLABS_API_KEY=your_elevenlabs_key
ELEVENLABS_AGENT_ID=your_agent_id
```

For iOS, install native pods:

```bash
cd bait-app/ios && pod install && cd -
```

## Running Locally

Start the backend (default port `3001`):

```bash
cd bait-backend
npm run dev
```

Health check: `GET http://localhost:3001/health`.

In a second terminal, start the mobile app:

```bash
cd bait-app
npm start           # Expo dev server
# or target a platform directly:
npm run ios
npm run android
npm run web
```

If the app needs to reach the backend from a physical device, point it at your machine's LAN IP rather than `localhost` and ensure both are on the same network.

## Project Layout

```
bait/
├── bait-app/        # Expo / React Native client
│   ├── app/         # expo-router screens
│   ├── components/
│   ├── hooks/
│   └── theme/
└── bait-backend/    # Express API
    └── src/
        ├── agents/  # claim extraction, bias, credibility, verdict
        ├── routes/  # /api/analyze, /api/portfolio, /api/elevenlabs
        └── utils/
```
