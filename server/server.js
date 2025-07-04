import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3500;

// Setup __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to db.json
const dbPath = path.join(__dirname, "../db.json");

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from frontend (dist)
const distPath = path.join(__dirname, "../dist");
app.use(express.static(distPath));

// Read reviews from db.json
const getReviews = async () => {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).reviews || [];
};

// Write reviews to db.json
const saveReviews = async (reviews) => {
  const data = JSON.stringify({ reviews }, null, 2);
  await fs.writeFile(dbPath, data, "utf-8");
};

// API routes
app.get("/api/reviews", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to read reviews" });
  }
});

app.post("/api/reviews", async (req, res) => {
  try {
    const newReview = req.body;
    const reviews = await getReviews();
    reviews.push(newReview);
    await saveReviews(reviews);
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" });
  }
});

// Fallback for SPA: serve index.html for unknown routes
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
