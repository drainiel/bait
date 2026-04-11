import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import analyzeRouter from "./routes/analyze";
import portfolioRouter from "./routes/portfolio";
import elevenlabsRouter from "./routes/elevenlabs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

// Routes
app.use("/api/analyze", analyzeRouter);
app.use("/api/portfolio", portfolioRouter);
app.use("/api/elevenlabs", elevenlabsRouter);

app.listen(PORT, () => {
  console.log(`BAIT backend running on port ${PORT}`);
});
