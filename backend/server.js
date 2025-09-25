// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import OpenAI from 'openai';

const app = express();
app.use(cors());
app.use(express.json());

// Configurar OpenAI con tu API key de Environment Variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Endpoint para el chat
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    // Llamada a OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }]
    });

    // Devolver la respuesta al frontend
    res.json({ reply: response.choices[0].message.content });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Algo salió mal con OpenAI' });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
