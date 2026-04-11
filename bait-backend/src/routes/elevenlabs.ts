import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

// Returns a conversation token for WebRTC connections (React Native compatible).
// Signed URLs only support WebSocket, which requires browser-only APIs.
router.get("/signed-url", async (_req: Request, res: Response) => {
  try {
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!agentId || !apiKey) {
      res.status(500).json({ error: "ElevenLabs not configured" });
      return;
    }

    const response = await axios.get(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    res.json({ signedUrl: response.data.signed_url });
  } catch (error) {
    console.error("ElevenLabs signed URL error:", error);
    res.status(500).json({ error: "Failed to get signed URL" });
  }
});

// Returns a conversation token for WebRTC connections (React Native compatible).
router.get("/conversation-token", async (_req: Request, res: Response) => {
  try {
    const agentId = process.env.ELEVENLABS_AGENT_ID;
    const apiKey = process.env.ELEVENLABS_API_KEY;

    if (!agentId || !apiKey) {
      res.status(500).json({ error: "ElevenLabs not configured" });
      return;
    }

    const response = await axios.get(
      `https://api.elevenlabs.io/v1/convai/conversation/token?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
      }
    );

    res.json({
      conversationToken: response.data.token,
      agentId,
    });
  } catch (error) {
    console.error("ElevenLabs conversation token error:", error);
    res.status(500).json({ error: "Failed to get conversation token" });
  }
});

export default router;
