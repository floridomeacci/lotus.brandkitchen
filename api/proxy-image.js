export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = req.query.url;
  if (!url || !url.startsWith('https://replicate.delivery/')) {
    return res.status(400).json({ error: 'Invalid image URL' });
  }

  try {
    const reply = await fetch(url);
    if (!reply.ok) return res.status(reply.status).end();

    res.setHeader('Content-Type', reply.headers.get('content-type') || 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    const buffer = Buffer.from(await reply.arrayBuffer());
    res.send(buffer);
  } catch {
    res.status(502).json({ error: 'Failed to fetch image' });
  }
}
