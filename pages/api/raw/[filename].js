// Dùng chung memoryStore giữa 2 endpoint
import { memoryStore } from '../upload'

export default function handler(req, res) {
  const { filename } = req.query
  const content = memoryStore[filename]

  if (!content) {
    return res.status(404).send('File not found')
  }

  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
  res.status(200).send(content)
}
