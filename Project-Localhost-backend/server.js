require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db"); // ✅ Ensure this file exists
const loginRoutes = require("./routes/loginserver"); // ✅ Importing correctly
const signupRoutes = require("./routes/signupserver"); // ✅ Importing correctly
const profileRoutes = require('./routes/ProfileServer');
const writeupRoutes = require('./routes/writeupServer'); // ✅ Import the writeup routes
const postRoutes = require("./routes/postRoutes"); // Import post routes

const app = express();
app.use(bodyParser.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
}));

// ✅ Use login and signup routes
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);
app.use(profileRoutes);
app.use("/writeup", writeupRoutes); // ✅ Register the route
app.use(postRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
