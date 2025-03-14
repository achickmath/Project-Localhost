const express = require("express");
const db = require("../db"); // ✅ Ensure it correctly imports the db connection
const router = express.Router();

// Endpoint to add a new writeup
router.post("/add", async (req, res) => {
    const { title, category, content, userLoginId } = req.body;

    console.log("🟢 Received request:", { title, category, content, userLoginId });

    if (!title || !category || !content || !userLoginId) {
        console.log("❌ Missing fields in request");
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const [result] = await db.query(
            "INSERT INTO userwriteups (Title, Category, Content, Date, UserLoginid) VALUES (?, ?, ?, CURDATE(), ?)",
            [title, category, content, userLoginId]
        );

        console.log("✅ Writeup inserted successfully:", result);
        res.json({ success: true, message: "Writeup added successfully", writeupId: result.insertId });
    } catch (error) {
        console.error("❌ Database error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// Endpoint to fetch user writeups for profile
router.get("/user/:userLoginId", async (req, res) => {
    const { userLoginId } = req.params;

    console.log("🟢 Fetching writeups for user:", userLoginId);

    try {
        const [writeups] = await db.query(
            "SELECT Title, Date, Content, Category FROM userwriteups WHERE UserLoginid = ? ORDER BY Date DESC",
            [userLoginId]
        );

        console.log("📨 Sending writeups:", writeups);

        if (!writeups || writeups.length === 0) {
            return res.json({ success: true, writeups: [] }); // ✅ Avoid returning undefined
        }

        res.json({ success: true, writeups });
    } catch (error) {
        console.error("❌ Error fetching user writeups:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
