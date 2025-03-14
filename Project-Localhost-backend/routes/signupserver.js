const express = require("express");
const db = require("../db"); // ✅ Ensure it correctly imports the db connection
const router = express.Router();

router.post("/", async (req, res) => {
    const { firstname, lastname, email, password, dateofbirth, hintQuestion, hintAnswer } = req.body;

    if (!firstname || !lastname || !email || !password || !dateofbirth || !hintQuestion || !hintAnswer) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    try {
        const formattedDate = new Date(dateofbirth).toISOString().split('T')[0];

        const [loginResult] = await db.query(
            "INSERT INTO UserLogin (Username, userpassword, HintQuestion, HintAnswer, Status) VALUES (?, ?, ?, ?, ?)",
            [email, password, hintQuestion, hintAnswer, "Active"]
        );

        const userLoginId = loginResult.insertId;

        await db.query(
            "INSERT INTO UserProfile (firstname, lastname, DOB, PrimaryEmail, UserLoginid) VALUES (?, ?, ?, ?, ?)",
            [firstname, lastname, formattedDate, email, userLoginId]
        );

        res.json({ success: true, message: "Signup successful" });

    } catch (error) {
        console.error("Error inserting data:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
