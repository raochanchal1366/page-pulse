import express from "express";
import cors from "cors";
import auditRouter from "./routes/audit.route.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// --- Global middleware ---
app.use(cors());          // allow the frontend (different origin in dev) to call this API
app.use(express.json());  // parse incoming JSON request bodies (e.g. { "url": "..." })

// --- Health check ---
// Confirms the server is alive and the request/response pipeline works.
// Useful locally, and later for uptime checks on the deployed instance.
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({
    message: "Page Pulse API is running 🚀",
    endpoint: "/api/audit",
    method: "POST",
  });
});

app.use("/api", auditRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Page Pulse server running on http://localhost:${PORT}`);
});