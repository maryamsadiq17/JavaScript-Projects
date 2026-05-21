const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Inside your app.post('/api/chat', ...) change these two things:

// 1. Change the URL to Groq's endpoint
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}` // Your Groq key works here
    },
    body: JSON.stringify({
            // Change the model name to Groq's active supported model
            model: 'llama-3.3-70b-versatile', 
            messages: [{ role: 'user', content: userMessage }]
        })
});
    const data = await response.json();

    console.log("--- OpenAI API Debug Info ---");
    console.log("Full API Response Data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      const openAiError =
        data.error?.message || "OpenAI API returned an error.";
      console.error("OpenAI API error:", data);
      return res.status(response.status).json({
        error: openAiError,
        type: data.error?.type,
        code: data.error?.code,
      });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Unexpected OpenAI response shape:", data);
      return res.status(502).json({
        error: "Unexpected response from OpenAI.",
      });
    }

    // Send back just the text answer to our frontend
    res.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Something went wrong on the server.",
      details: error.message,
    });
  }
});

// Change 3000 to 5000
app.listen(5000, () =>
  console.log("Secure server running on http://localhost:5000"),
);
