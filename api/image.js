export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const token = process.env.REPLICATE_API_TOKEN;
  if (!token) return res.status(500).json({ error: 'Missing REPLICATE_API_TOKEN' });

  const { prompt, aspect_ratio = '4:3', max_images = 1 } = req.body;
  if (!prompt) return res.status(400).json({ error: 'prompt is required' });

  try {
    const reply = await fetch('https://api.replicate.com/v1/models/bytedance/seedream-4/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
      return res.status(reply.status).json({ error: errText });
    }

    const data = await reply.json();
    const images = Array.isArray(data.output) ? data.output : [];
    res.json({ images, status: data.status });
  } catch (err) {
    console.error('Image proxy error:', err);
    res.status(500).json({ error: 'Internal proxy error' });
  }
}
