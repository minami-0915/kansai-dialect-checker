const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


app.post('/api/check', async (req, res) => {
  const userText = req.body.text;

  const prompt = `
あなたは関西弁の専門家です。
以下の文章の関西弁度を0〜100点で評価し、不自然な箇所があれば指摘し、自然な関西弁に書き直してください。
結果は次の形式で返してください：

score: (数字)
comment: (コメント)
suggestion: (修正された文)

【入力文】
${userText}
`;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: "user", content: prompt }]
    });

    const resultText = response.data.choices[0].message.content;
    res.json({ result: resultText });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'API error' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
