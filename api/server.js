const express = require('express');
const axios = require('axios');
const serverless = require('serverless-http');
const app = express();

const webhookUrl = process.env.WEBHOOK_URL;

app.use(express.json());

app.get('/', async (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <h1>API para enviar embeds para o Discord</h1>
    <p>Use <code>/enviar</code> com POST para enviar o embed.</p>
  `);

  try {
    await axios.post(webhookUrl, {
      content: '🚀 Acessaram a API via Vercel!'
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem ao webhook:', error);
  }
});

app.post('/enviar', async (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: 'Título e descrição obrigatórios.' });
  }

  try {
    await axios.post(webhookUrl, {
      embeds: [
        {
          title: titulo,
          description: descricao,
          color: 0x3498db,
          footer: { text: 'Enviado pela API da Vercel' },
          timestamp: new Date().toISOString()
        }
      ]
    });

    res.json({ status: 'Embed enviado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao enviar embed' });
  }
});

// Exporta para Vercel
module.exports = app;
module.exports.handler = serverless(app);
