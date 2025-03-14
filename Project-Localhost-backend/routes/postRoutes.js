const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../db"); // Database connection
const router = express.Router();

// ⚡ Configure Multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save images in uploads/ directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// ✅ Create a new post (with optional image)
router.post("/posts", upload.single("image"), async (req, res) => {
    const { userLoginId, content } = req.body; // Change to userLoginId
    const image_url = req.file ? `/uploads/${req.file.filename}` : null; // Save image path

    if (!userLoginId || !content) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        const [result] = await db.query(
            "INSERT INTO posts (userLoginId, content, image_url) VALUES (?, ?, ?)",
            [userLoginId, content, image_url]
        );        

        res.json({ success: true, message: "Post created", post_id: result.insertId });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ Get all posts (sorted by latest)
router.get("/posts", async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.content, p.created_at, p.likes, p.dislikes, p.image_url,
                u.userProfileid, u.firstname, u.lastname, u.ProfilePicture
            FROM posts p
            JOIN userprofile u ON p.userProfileid = u.userProfileid
            ORDER BY p.created_at DESC
        `);

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
