const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) {
      return res.status(500).json({ reply: "No reply from Gemini" });
    }

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ reply: "Error contacting Gemini API" });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
