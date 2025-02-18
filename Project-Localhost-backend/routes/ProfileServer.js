const express = require("express");
const db = require("../db");
const router = express.Router();

// ✅ Fetch user profile by user ID
router.get("/profile/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT firstName, lastName, PrimaryEmail AS email, Bio, Gender, SecondaryEmail, Team FROM UserProfile WHERE UserLoginid = ?",
      [userId]
    );

    if (rows.length > 0) {
      const user = rows[0];

      res.json({
        success: true,
        user: {
          firstName: user.firstName || "User",
          lastName: user.lastName || "",
          email: user.email || "",
          bio: user.Bio || "No bio added.",
          gender: user.Gender || "Not specified",
          secondaryEmail: user.SecondaryEmail || "Not added",
          team: user.Team || "Red",
        },
      });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update user profile
router.post("/profile/update", async (req, res) => {
  const { userId, bio, gender, secondaryEmail, team } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    const updateQuery = `
      UPDATE UserProfile 
      SET Bio = ?, Gender = ?, SecondaryEmail = ?, Team = ? 
      WHERE UserLoginid = ?;
    `;

    await db.query(updateQuery, [bio, gender, secondaryEmail, team, userId]);

    console.log("✅ Profile updated successfully for User ID:", userId);
    res.json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
    console.error("❌ Profile update error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Fetch User Projects
router.get("/projects/user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM userprojects WHERE UserLoginid = ?", [userId]);
    res.json({ success: true, projects: rows });
  } catch (error) {
    console.error("❌ Error fetching user projects:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Add Project
router.post("/projects/add", async (req, res) => {
  const { userLoginId, title, description, tags } = req.body;

  console.log("🟢 Received project data:", req.body); // ✅ Debugging log

  if (!userLoginId || !title) {
    console.log("❌ Missing required fields.");
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO userprojects (UserLoginid, Title, Description, Tags) VALUES (?, ?, ?, ?)",
      [userLoginId, title, description, tags]
    );

    console.log("✅ New project added with ID:", result.insertId);
    res.json({ success: true, message: "Project added successfully." });
  } catch (error) {
    console.error("❌ Error inserting project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});


// ✅ Edit an Existing Project
router.post("/projects/edit", async (req, res) => {
  const { projectId, title, description, tags } = req.body;

  console.log("🟢 Received Edit Request:", req.body); // ✅ Debugging Log

  if (!projectId || !title) {
    console.log("❌ Missing required fields.");
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    await db.query(
      "UPDATE userprojects SET Title = ?, Description = ?, Tags = ? WHERE Projectid = ?",
      [title, description, tags, projectId]
    );

    console.log("✅ Project updated for Project ID:", projectId);
    res.json({ success: true, message: "Project updated successfully." });
  } catch (error) {
    console.error("❌ Error updating project:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.get("/writeup/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT UserWriteupid, Title, Content, Category, Date FROM userwriteups WHERE UserLoginid = ?", 
      [userId]
    );

    console.log("🟢 Writeups Sent to Frontend:", rows); // ✅ Debugging log
    res.json({ success: true, writeups: rows });

  } catch (error) {
    console.error("❌ Error fetching user writeups:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/writeup/:id", async (req, res) => {
  const writeupId = req.params.id;

  try {
    const [rows] = await db.query(
      "SELECT uw.*, ul.Username AS Author FROM userwriteups uw JOIN UserLogin ul ON uw.UserLoginid = ul.UserLoginid WHERE uw.UserWriteUpid = ?",
      [writeupId]
    );

    if (rows.length > 0) {
      let writeup = rows[0];

      // ✅ Ensure Upvotes & Downvotes are returned as numbers
      writeup.Upvotes = Number(writeup.Upvotes) || 0;
      writeup.Downvotes = Number(writeup.Downvotes) || 0;

      res.json({ success: true, writeup });
    } else {
      res.status(404).json({ success: false, message: "Writeup not found" });
    }
  } catch (error) {
    console.error("❌ Error fetching writeup:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/writeups", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT uw.UserWriteUpid, uw.Title, uw.Date, uw.Category, uw.Content, uw.Upvotes, ul.Username AS Author FROM userwriteups uw JOIN UserLogin ul ON uw.UserLoginid = ul.UserLoginid ORDER BY uw.UserWriteUpid DESC"
    );

    console.log("🟢 All Writeups Sent:", rows); // ✅ Debugging log
    res.json({ success: true, writeups: rows });
  } catch (error) {
    console.error("❌ Error fetching writeups:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/favorites/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.query(
      "SELECT uw.UserWriteUpid, uw.Title, uw.Date, uw.Category, uw.Content, uw.Upvotes, ul.Username AS Author FROM userfavorites uf JOIN userwriteups uw ON uf.UserWriteUpid = uw.UserWriteUpid JOIN UserLogin ul ON uw.UserLoginid = ul.UserLoginid WHERE uf.UserLoginid = ?",
      [userId]
    );

    console.log("🟢 User Favorites Sent:", rows);
    res.json({ success: true, favorites: rows });
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/favorites/toggle", async (req, res) => {
  const { userId, writeupId } = req.body;

  try {
    // Check if already favorited
    const [exists] = await db.query("SELECT * FROM userfavorites WHERE UserLoginid = ? AND UserWriteUpid = ?", [userId, writeupId]);

    if (exists.length > 0) {
      // Remove from favorites
      await db.query("DELETE FROM userfavorites WHERE UserLoginid = ? AND UserWriteUpid = ?", [userId, writeupId]);
      res.json({ success: true, message: "Removed from favorites" });
    } else {
      // Add to favorites
      await db.query("INSERT INTO userfavorites (UserLoginid, UserWriteUpid) VALUES (?, ?)", [userId, writeupId]);
      res.json({ success: true, message: "Added to favorites" });
    }
  } catch (error) {
    console.error("❌ Error updating favorites:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/writeup/vote", async (req, res) => {
  const { writeupId, userId, type } = req.body; // "upvote" or "downvote"

  if (!writeupId || !userId || !["upvote", "downvote"].includes(type)) {
    return res.status(400).json({ success: false, message: "Invalid request" });
  }

  try {
    // Get current votes
    const [rows] = await db.query(
      "SELECT Upvotes, Downvotes FROM userwriteups WHERE UserWriteUpid = ?",
      [writeupId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Writeup not found" });
    }

    let { Upvotes, Downvotes } = rows[0];

    // Toggle logic:
    if (type === "upvote") {
      if (Upvotes > 0) {
        Upvotes -= 1; // Clicking again removes upvote
      } else {
        Upvotes += 1; // Adds upvote
        Downvotes = Math.max(Downvotes - 1, 0); // Remove downvote if it exists
      }
    } else if (type === "downvote") {
      if (Downvotes > 0) {
        Downvotes -= 1; // Clicking again removes downvote
      } else {
        Downvotes += 1; // Adds downvote
        Upvotes = Math.max(Upvotes - 1, 0); // Remove upvote if it exists
      }
    }

    // Update votes in DB
    await db.query(
      "UPDATE userwriteups SET Upvotes = ?, Downvotes = ? WHERE UserWriteUpid = ?",
      [Upvotes, Downvotes, writeupId]
    );

    console.log(`🟢 Updated Votes: Upvotes=${Upvotes}, Downvotes=${Downvotes}`);
    res.json({ success: true, Upvotes, Downvotes });
  } catch (error) {
    console.error("❌ Error updating votes:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



module.exports = router;
