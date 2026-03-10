export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return res.status(500).json({ error: 'Missing REPLICATE_API_TOKEN' });

  const { prompt, system, max_tokens = 1024, temperature = 0.6 } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const reply = await fetch('https://api.replicate.com/v1/models/deepseek-ai/deepseek-v3/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
      return res.status(reply.status).json({ error: errText });
    }

    const data = await reply.json();
    const output = Array.isArray(data.output) ? data.output.join('') : (data.output || '');
    res.json({ output, status: data.status });
  } catch (err) {
    console.error('LLM proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
}
