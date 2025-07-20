const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

const webhookUrl = 'https://discord.com/api/webhooks/1396580134881853440/lM-fV8jtmahJQJrj0UJb_lgipdoL_jUArMlfYGqqAB-QWK1sIdaQ_ui2iTk68UWpXh6w';

app.get('/', async (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <title>API Discord Webhook</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #1e1e2f;
          color: #f1f1f1;
          padding: 40px;
          line-height: 1.6;
        }
        h1 {
          color: #00bfff;
          border-bottom: 2px solid #00bfff;
          padding-bottom: 10px;
        }
        code, pre {
          background: #2c2f3f;
          padding: 5px 10px;
          border-radius: 5px;
          color: #00ff99;
          font-size: 14px;
        }
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          color: #00bfff;
          text-decoration: none;
          font-weight: bold;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <h1>API para enviar embeds para o Discord</h1>
      <p>Use o endpoint <code>/enviar</code> para enviar um embed.</p>
      <p>Envie um <strong>POST</strong> com os campos <code>titulo</code> e <code>descricao</code> no corpo da requisição.</p>
      <p><strong>Exemplo de corpo da requisição:</strong></p>
      <pre>{
  "titulo": "Título do Embed",
  "descricao": "Descrição do Embed"
}</pre>
      <p>Certifique-se de que o título e a descrição não estejam vazios.</p>
      <p>O embed será enviado para o canal do Discord configurado no webhook.</p>
      <p><strong>API rodando na porta ${port}.</strong></p>
      <p>Para mais informações, consulte a documentação da API no meu Discord.</p>
      <a href="https://discord.gg/5FnERU8Q" target="_blank">🔗 Junte-se ao meu Discord</a>
    </body>
    </html>
  `);

  try { 
    await axios.post(webhookUrl, {
      content: '🔔 Alguém acessou a página inicial da API!'
    });
  } catch (error) {
    console.error('Erro ao enviar mensagem de acesso:', error);
  }
});


app.post('/enviar', async (req, res) => {
  const { titulo, descricao } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ erro: 'Título e descrição são obrigatórios {titulo' });
  }

  try {
    await axios.post(webhookUrl, {
      embeds: [
        {
          title: titulo,
          description: descricao,
          color: 0x3498db, // Cor azul (em hexadecimal)
          footer: {
            text: 'Mensagem gerada pela API'
          },
          timestamp: new Date().toISOString()
        }
      ]
    });

    res.json({ status: 'Embed enviado com sucesso!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao enviar o embed' });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
