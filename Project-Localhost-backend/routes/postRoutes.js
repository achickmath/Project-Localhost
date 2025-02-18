const express = require("express");
const db = require("../db"); // Import database connection
const router = express.Router();

// ✅ 1. Create a new post
router.post("/posts", async (req, res) => {
    const { userProfileid, content } = req.body;

    if (!userProfileid || !content) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        const [result] = await db.query(
            "INSERT INTO Posts (userProfileid, content) VALUES (?, ?)",
            [userProfileid, content]
        );

        res.json({ success: true, message: "Post created", post_id: result.insertId });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ 2. Get all posts with user details
router.get("/posts", async (req, res) => {
    try {
        const [posts] = await db.query(`
            SELECT 
                p.post_id, p.content, p.created_at, p.likes, p.dislikes,
                u.userProfileid, u.firstname, u.lastname, u.ProfilePicture
            FROM Posts p
            JOIN UserProfile u ON p.userProfileid = u.userProfileid
            ORDER BY p.created_at DESC
        `);

        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ 3. Add a comment to a post
router.post("/comments", async (req, res) => {
    const { post_id, userProfileid, comment } = req.body;

    if (!post_id || !userProfileid || !comment) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        await db.query(
            "INSERT INTO Comments (post_id, userProfileid, comment) VALUES (?, ?, ?)",
            [post_id, userProfileid, comment]
        );

        res.json({ success: true, message: "Comment added" });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// ✅ 4. Like/Dislike a post
router.post("/likes", async (req, res) => {
    const { post_id, userProfileid, type } = req.body;

    if (!post_id || !userProfileid || !type || !["like", "dislike"].includes(type)) {
        return res.status(400).json({ success: false, message: "Invalid request" });
    }

    try {
        await db.query(
            "INSERT INTO Likes (post_id, userProfileid, type) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE type=?",
            [post_id, userProfileid, type, type]
        );

        // Update like/dislike counts in Posts table
        const updateQuery = type === "like"
            ? "UPDATE Posts SET likes = likes + 1 WHERE post_id = ?"
            : "UPDATE Posts SET dislikes = dislikes + 1 WHERE post_id = ?";
        
        await db.query(updateQuery, [post_id]);

        res.json({ success: true, message: `Post ${type}d successfully` });
    } catch (error) {
        console.error("Error updating likes:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

module.exports = router;
