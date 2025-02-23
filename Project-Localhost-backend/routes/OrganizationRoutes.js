const express = require("express");
const db = require("../db");
const router = express.Router();

// ✅ Fetch User's Organization
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log(`🟢 Fetching organization for User ID: ${userId}`);

    const [rows] = await db.query(
      `SELECT om.OrganizationID, o.Name, o.OrganizationEmail 
       FROM organization_members om 
       JOIN organizations o ON om.OrganizationID = o.OrganizationID 
       WHERE om.UserLoginID = ?`,
      [userId]
    );

    console.log("🟢 Organization Query Result:", rows);

    if (rows.length > 0) {
      res.json({ success: true, organization: rows[0] });
    } else {
      res.json({ success: false, message: "User is not in any organization." });
    }
  } catch (error) {
    console.error("❌ Error fetching organization:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Join Organization (Using Email or Join Code)
router.post("/join", async (req, res) => {
  const { userLoginId, email, joinCode } = req.body;

  if (!userLoginId || (!email && !joinCode)) {
    console.log("❌ Missing required fields:", { userLoginId, email, joinCode });
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  try {
    console.log(`🟢 Join Request - UserID: ${userLoginId}, Email: ${email}, JoinCode: ${joinCode}`);

    // Find organization by email or join code
    const [orgRows] = await db.query(
      "SELECT * FROM organizations WHERE OrganizationEmail = ? OR JoinCode = ?",
      [email, joinCode]
    );

    console.log("🟢 Organization Query Result:", orgRows);

    if (orgRows.length === 0) {
      console.log("❌ Organization not found.");
      return res.status(404).json({ success: false, message: "Organization not found." });
    }

    const organization = orgRows[0];

    // Check if user is already in this organization
    const [existingMember] = await db.query(
      "SELECT * FROM organization_members WHERE UserLoginID = ? AND OrganizationID = ?",
      [userLoginId, organization.OrganizationID]
    );

    console.log("🟢 Existing Membership Query Result:", existingMember);

    if (existingMember.length > 0) {
      console.log("❌ Already in this organization.");
      return res.status(400).json({ success: false, message: "Already in this organization." });
    }

    // Add user to organization
    const [insertResult] = await db.query(
      "INSERT INTO organization_members (UserLoginID, OrganizationID, OrganizationEmail) VALUES (?, ?, ?)",
      [userLoginId, organization.OrganizationID, organization.OrganizationEmail]
    );

    console.log("✅ User successfully added to organization:", insertResult);

    res.json({ success: true, organization });
  } catch (error) {
    console.error("❌ Error joining organization:", error);
    res.status(500).json({ success: false, message: "Internal server error", error: error.message });
  }
});

// ✅ Leave Organization
router.post("/leave", async (req, res) => {
  const { userLoginId } = req.body;

  if (!userLoginId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    console.log(`🟢 Leaving organization for User ID: ${userLoginId}`);

    // Remove user from organization
    const [result] = await db.query(
      "DELETE FROM organization_members WHERE UserLoginID = ?",
      [userLoginId]
    );

    console.log("🟢 Leave Organization Query Result:", result);

    if (result.affectedRows > 0) {
      res.json({ success: true, message: "Successfully left organization." });
    } else {
      res.status(400).json({ success: false, message: "User not in any organization." });
    }
  } catch (error) {
    console.error("❌ Error leaving organization:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
