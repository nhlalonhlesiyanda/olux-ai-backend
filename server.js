const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { OpenAI } = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/ask", async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are Olux AI, a helpful assistant." },
        { role: "user", content: prompt }
      ]
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (err) {
    console.error("AI Error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI error" });
  }
});

app.listen(3000, () => console.log("✅ Olux AI backend running on port 3000"));
