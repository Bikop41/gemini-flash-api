const express = require('express');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Load environment variables
dotenv.config();

// Inisialisasi Express app
const app = express();
app.use(express.json());

// Inisialisasi Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Setup multer untuk file upload
const upload = multer({ dest: 'uploads/' });

// Endpoint untuk text input
app.post('/generate-text', async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json({ output: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Port server
const PORT = 3000;

// Jalankan server
app.listen(PORT, () => {
  console.log(`Gemini API server is running at http://localhost:${PORT}`);
});