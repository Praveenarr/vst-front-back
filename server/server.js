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

// ---------- Reviews Utilities ----------
const getReviews = async () => {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).reviews || [];
};

const saveReviews = async (reviews) => {
  const data = await fs.readFile(dbPath, "utf-8");
  const json = JSON.parse(data);
  json.reviews = reviews;
  await fs.writeFile(dbPath, JSON.stringify(json, null, 2), "utf-8");
};

// ---------- Payments Utilities ----------
const getPayments = async () => {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data).payments || [];
};

const savePayments = async (payments) => {
  const data = await fs.readFile(dbPath, "utf-8");
  const json = JSON.parse(data);
  json.payments = payments;
  await fs.writeFile(dbPath, JSON.stringify(json, null, 2), "utf-8");
};

// ---------- Reviews API ----------
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

// ---------- Payments API ----------
app.get("/payments", async (req, res) => {
  try {
    const { transactionId } = req.query;
    if (!transactionId) {
      return res.status(400).json({ error: "Missing transactionId" });
    }

    const payments = await getPayments();
    const match = payments.filter((p) => p.transactionId === transactionId);

    res.json(match);
  } catch (err) {
    console.error("Error reading payments:", err);
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

app.post("/payments", async (req, res) => {
  try {
    const newPayment = req.body;
    const payments = await getPayments();
    payments.push(newPayment);
    await savePayments(payments);
    res.status(201).json(newPayment);
  } catch (err) {
    console.error("Error saving payment:", err);
    res.status(500).json({ error: "Failed to save payment" });
  }
});

// ---------- SPA Fallback ----------
app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ---------- Start Server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
