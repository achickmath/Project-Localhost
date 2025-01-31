const express = require("express");
const router = express.Router();
const db = require("../db"); // Now correctly using promise-based connection

router.post("/", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // ✅ JOIN UserLogin and UserProfile to fetch firstName and lastName
      const [results] = await db.query(
        `SELECT 
           ul.UserLoginid, 
           ul.Username, 
           up.firstName, 
           up.lastName 
         FROM UserLogin ul 
         JOIN UserProfile up ON ul.UserLoginid = up.UserLoginid
         WHERE ul.Username = ? AND ul.userpassword = ?`,
        [username, password]
      );
  
      if (results.length > 0) {
        const user = results[0];
  
        res.json({
          success: true,
          token: "dummy_token",
          userLoginId: user.UserLoginid,  // ✅ Correct key name
          user: {
              firstName: user.firstName,
              lastName: user.lastName
          }
      });
      
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
module.exports = router;
