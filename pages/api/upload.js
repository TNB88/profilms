const { redis } = require('../../lib/redis')

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end('Method Not Allowed')
    return
  }

  const { filename, content } = req.body
  if (!filename || !content) {
    res.status(400).json({ error: 'Missing data' })
    return
  }

  try {
    await redis.set(filename, content, { ex: 3600 }) // TTL: 1h
    const encoded = encodeURIComponent(filename)
    const url = `https://${req.headers.host}/api/raw/${encoded}`
    res.status(200).json({ url })
  } catch (e) {
    res.status(500).json({ error: 'Upload failed' })
  }
}

