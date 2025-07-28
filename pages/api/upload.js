import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed')

  const { filename, content } = req.body
  if (!filename || !content) return res.status(400).json({ error: 'Missing data' })

  try {
    await redis.set(filename, content, { ex: 3600 }) // TTL: 1h
    const encoded = encodeURIComponent(filename)
    const url = `https://${req.headers.host}/api/raw/${encoded}`
    return res.status(200).json({ url })
  } catch (e) {
    return res.status(500).json({ error: 'Upload failed' })
  }
}
