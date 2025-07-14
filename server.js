const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "https://beststudyguide.netlify.app", // ✅ Replace with your actual Netlify frontend URL
}));
app.use(express.json());

const users = [
  { username: "personwea2", hash: bcrypt.hashSync("gilbert1234", 10) },
  { username: "admin", hash: bcrypt.hashSync("gilbert1234", 10) },
  { username: "chronic", hash: bcrypt.hashSync("chronic1234", 10) },
  { username: "bigace", hash: bcrypt.hashSync("bigace1234", 10) }
];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = bcrypt.compareSync(password, user.hash);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
