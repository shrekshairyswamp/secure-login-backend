const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3000;

// Replace with your actual frontend URL (Netlify domain)
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

// Root route to avoid “Not Found”
app.get("/", (req, res) => {
  res.send("Backend server is running!");
});

// Login route
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
  console.log(✅ Server is running on port ${PORT});
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:<db_password>@beststudyguide.q4krgkm.mongodb.net/?retryWrites=true&w=majority&appName=BestStudyGuide";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
