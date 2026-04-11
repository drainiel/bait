import "../polyfill";
import { useState, useCallback, useRef } from "react";
import { useConversation } from "@elevenlabs/react-native";
import { API_BASE } from "../constants/api";
import { TranscriptEntry } from "../types";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

export function useAdvisor() {
  const [status, setStatus] = useState<ConnectionStatus>("idle");
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [error, setError] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const conversation = useConversation({
    onConnect: () => {
      setStatus("connected");
    },
    onDisconnect: () => {
      setStatus("idle");
      setIsSpeaking(false);
    },
    onMessage: (message: { source: string; message: string }) => {
      setTranscript((prev) => [
        ...prev,
        {
          role: message.source === "user" ? "user" : "agent",
          text: message.message,
          timestamp: Date.now(),
        },
      ]);
    },
    onError: (message: string) => {
      console.error("ElevenLabs error:", message);
      setError(message || "Voice connection error");
      setStatus("error");
    },
  });

  const startSession = useCallback(async () => {
    try {
      setStatus("connecting");
      setError("");
      setTranscript([]);

      const res = await fetch(`${API_BASE}/elevenlabs/conversation-token`);
      if (!res.ok) {
        throw new Error("Failed to get conversation token");
      }

      const { conversationToken, agentId } = await res.json();

      // Use WebRTC connection (conversationToken) instead of WebSocket (signedUrl).
      // signedUrl forces WebSocket which relies on browser-only APIs
      // (AudioWorklet, HTMLAudioElement, document) that don't exist in React Native.
      await conversation.startSession({ conversationToken, agentId });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connection failed");
      setStatus("error");
    }
  }, [conversation]);

  const endSession = useCallback(() => {
    conversation.endSession();
    setStatus("idle");
    setIsSpeaking(false);
  }, [conversation]);

  // Track speaking state from conversation status
  const speaking = conversation.isSpeaking ?? isSpeaking;

  return {
    status,
    isSpeaking: speaking,
    transcript,
    startSession,
    endSession,
    error,
  };
}
