// routes/ctfpoolServer.js
const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/ctfpool", async (req, res) => {
    const { userId, name, email, specialty } = req.body;
    console.log("📦 Incoming payload:", req.body);

    if (!userId || !name || !email || !specialty) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
  
    try {
      // Check if user already in pool
      const [existing] = await db.query("SELECT * FROM CTFPool WHERE userId = ?", [userId]);
      if (existing.length > 0) {
        return res.status(400).json({ success: false, message: "You are already in the pool." });
      }
  
      // Insert new entry
      await db.query(
        "INSERT INTO CTFPool (userId, name, email, specialty) VALUES (?, ?, ?, ?)",
        [userId, name, email, specialty]
      );
  
      res.json({ success: true, message: "User added to CTF pool" });
    } catch (error) {
      console.error("Error inserting into CTFPool:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

  router.post("/ctfpool/match", async (req, res) => {
  const { userId, name, email, specialty, lookingFor, teamSize } = req.body;

  if (!userId || !name || !email || !specialty || !lookingFor || !Array.isArray(lookingFor)) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    // Step 1: Add user to pool if not already there
    const [existing] = await db.query("SELECT * FROM CTFPool WHERE userId = ?", [userId]);
    if (existing.length === 0) {
      await db.query(
        "INSERT INTO CTFPool (userId, name, email, specialty) VALUES (?, ?, ?, ?)",
        [userId, name, email, specialty]
      );
    }

    // Step 2: Fetch matching teammates
    const placeholders = lookingFor.map(() => "?").join(",");
    const [results] = await db.query(
      `
      SELECT * FROM CTFPool
      WHERE userId != ? AND specialty IN (${placeholders})
      ORDER BY RAND()
      LIMIT ?
      `,
      [userId, ...lookingFor, teamSize]
    );

    return res.json({ success: true, teammates: results });
  } catch (error) {
    console.error("Error in /ctfpool/match:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

  
module.exports = router;
