const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

const multer = require("multer");
const upload = multer();

// Parse POST body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static HTML
app.use(express.static(path.join(__dirname, "public")));

// ===== ROUTES =====
/**
 * Page index
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/**
 * Mock GET API
 */
const users = require("./api/users");
app.get("/api/users", (rep, res) => {
  res.json(users);
});

// API GET products
const products = require("./api/products");
app.get("/api/products", products);

// Mock API POST
const apiLogin = require("./api/login");
app.post("/api/login", upload.none(), apiLogin);

// Mock API Error
app.get("/api/error", (req, res) => {
  res.status(500).json({ message: "Server error (mock)" });
});
// Start server
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
