const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const router = express.Router();

// ── POST /api/register ──────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Name, email and password are required." });
  }

  try {
    // Check for existing user
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ? LIMIT 1", [email]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "adopter";

    await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, userRole]
    );

    res.json({ success: true, message: "User registered successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed." });
  }
});

// ── POST /api/login ─────────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required." });
  }

  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials." });
    }

    // Remove password before sending
    const { password: _pwd, ...safeUser } = user;
    res.json({ success: true, message: "Login successful.", user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed." });
  }
});

module.exports = router;
