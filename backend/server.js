const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { checkCodeForBugs } = require("./bugChecker");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: "100kb" }));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running ✅" });
});

// Bug check route
app.post("/api/check-bugs", async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || code.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Please send some code to check!",
      });
    }

    if (!language || language.trim() === "") {
      return res.status(400).json({
        success: false,
        error: "Please select a programming language!",
      });
    }

    console.log(`\n🔍 Checking ${language} code for bugs...`);

    const result = await checkCodeForBugs(code, language);

    res.json({
      success: true,
      result: result,
    });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({
      success: false,
      error: error.message || "Something went wrong. Try again.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running on http://localhost:${PORT}`);
});