
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json({ limit: '1mb' }));

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('GEMINI_API_KEY is missing in .env');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'BD Legal Assistant API is running'
  });
});

app.post('/api/ai/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (
      typeof question !== 'string' ||
      !question.trim() ||
      question.length > 10000
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid question.'
      });
    }

    let timeoutId;

    try {
      const response = await Promise.race([
        ai.models.generateContent({
         
model: 'gemini-3.7-flash',

          contents: question,
   config: {
  thinkingConfig: {
    thinkingLevel: 'low'
  },
  systemInstruction: `
You are BD Legal Assistant, an AI legal information assistant
focused on Bangladesh.

- Answer in the same language as the user.
- Explain legal concepts in simple language.
- Never invent laws, legal sections or court decisions.
- If you cannot verify a legal provision, say so.
- Do not guarantee legal outcomes.
- Recommend checking official laws at:
  https://bdlaws.minlaw.gov.bd/
- Always include a legal information disclaimer.
- For urgent matters, recommend a qualified lawyer.
  `,
  maxOutputTokens: 1500
}
        }),

        new Promise((_, reject) => {
          timeoutId = setTimeout(() => {
            reject(new Error('Request timeout after 30 seconds'));
          }, 30000);
        })
      ]);

      res.json({
        success: true,
        answer: response.text || 'No response generated.'
      });

    } finally {
      clearTimeout(timeoutId);
    }

  } catch (error) {
    console.error('Gemini API Error:', error);

    res.status(error.status === 503 ? 503 : 500).json({
      success: false,
      message: error.message || 'AI service is temporarily unavailable.',
      errorStatus: error.status || null
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `BD Legal Assistant API running at http://localhost:${PORT}`
  );
});
