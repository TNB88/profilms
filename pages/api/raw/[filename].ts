import type { NextApiRequest, NextApiResponse } from 'next'
import { redis } from '../../../lib/redis'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query
  if (typeof filename !== 'string') return res.status(400).end('Invalid filename')

  try {
    const content = await redis.get<string>(filename)
    if (!content) return res.status(404).end('Not Found')
    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
    res.status(200).send(content)
  } catch {
    res.status(500).end('Error reading file')
  }
}
