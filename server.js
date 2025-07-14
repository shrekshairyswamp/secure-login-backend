

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const PORT = process.env.PORT || 3000;

const FRONTEND_URL = "https://beststudyguide.netlify.app";

app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());

// MongoDB URI with password URL-encoded (replace admin if needed)
const uri =
  "mongodb+srv://admin:jfiVarQC%24T%21CQT2@beststudyguide.q4krgkm.mongodb.net/?retryWrites=true&w=majority&appName=BestStudyGuide";

const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

let usersCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("BestStudyGuideDB"); // your DB name
    usersCollection = db.collection("users"); // your users collection
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectDB();

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required." });
  }

  try {
    const user = await usersCollection.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid username or password." });
    }

    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

