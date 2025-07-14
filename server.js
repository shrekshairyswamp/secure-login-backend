const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual Netlify frontend URL
const FRONTEND_URL = "https://beststudyguide.netlify.app";

app.use(cors({
  origin: FRONTEND_URL,
}));
app.use(express.json());

// Example users with hashed passwords
const users = [
  { username: "personwea2", hash: bcrypt.hashSync("gilbert1234", 10) },
  { username: "admin", hash: bcrypt.hashSync("gilbert1234", 10) },
  { username: "chronic", hash: bcrypt.hashSync("chronic1234", 10) },
  { username: "bigace", hash: bcrypt.hashSync("bigace1234", 10) }
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  const user = users.find(u => u.username === username);
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  const validPassword = bcrypt.compareSync(password, user.hash);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid username or password." });
  }

  // Successful login
  res.json({ message: "Login successful" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
