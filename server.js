require('dotenv/config');
const express = require('express');
const { createReadStream } = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REPLICATE_TOKEN = process.env.REPLICATE_API_TOKEN;

if (!REPLICATE_TOKEN) {
  console.error('Missing REPLICATE_API_TOKEN in .env');
  process.exit(1);
}

app.use(express.json({ limit: '1mb' }));

// ── LLM proxy endpoint ──
app.post('/api/llm', async (req, res) => {
  const { prompt, system, max_tokens = 1024, temperature = 0.6 } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const reply = await fetch('https://api.replicate.com/v1/models/deepseek-ai/deepseek-v3/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify({
        input: {
          prompt: system ? `${system}\n\nUser: ${prompt}` : prompt,
          max_tokens,
          temperature,
          top_p: 1,
          presence_penalty: 0,
          frequency_penalty: 0
        }
      })
    });

    if (!reply.ok) {
      const errText = await reply.text();
      console.error('Replicate error:', reply.status, errText);
      return res.status(reply.status).json({ error: errText });
    }

    const data = await reply.json();
    // Replicate returns output as an array of string chunks
    const output = Array.isArray(data.output) ? data.output.join('') : (data.output || '');
    res.json({ output, status: data.status });
  } catch (err) {
    console.error('LLM proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

// ── Image generation proxy (Seedream 4) ──
app.post('/api/image', async (req, res) => {
  const { prompt, aspect_ratio = '4:3', max_images = 1 } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const reply = await fetch('https://api.replicate.com/v1/models/bytedance/seedream-4/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait'
      },
      body: JSON.stringify({
        input: {
          prompt,
          size: '2K',
          width: 2048,
          height: 2048,
          max_images: Math.min(Number(max_images) || 1, 4),
          image_input: [],
          aspect_ratio,
          enhance_prompt: true,
          sequential_image_generation: 'disabled'
        }
      })
    });

    if (!reply.ok) {
      const errText = await reply.text();
      console.error('Seedream error:', reply.status, errText);
      return res.status(reply.status).json({ error: errText });
    }

    const data = await reply.json();
    // output is an array of image URLs
    const images = Array.isArray(data.output) ? data.output : [];
    res.json({ images, status: data.status });
  } catch (err) {
    console.error('Image proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
});

// ── Static files ──
app.use(express.static(path.join(__dirname), {
  extensions: ['html']
}));

app.listen(PORT, () => {
  console.log(`Brand Kitchen running at http://localhost:${PORT}`);
});
