import express from "express";
import dotenv from "dotenv";

import connectToDb from "./config/connectToDb.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Base route
app.get("/", (req, res) => {
  res.json({ message: "API is running!" });
});

// Handle 404 (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Server listener
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server running on port ${PORT}`);
});