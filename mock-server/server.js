const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 3000;

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
 * Mock API
 */
app.get("/api/users", (rep, res) => {
  res.json([
    { id: 1, name: "Java Android" },
    { id: 2, name: "Node JS" },
    { id: 3, name: "Swift UIKit" },
  ]);
});
// Start server
app.listen(PORT, () => {
  console.log(`Mock server running at http://localhost:${PORT}`);
});
