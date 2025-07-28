import { memoryStore } from '../store'

export default function handler(req, res) {
  const { filename } = req.query
  const content = memoryStore[filename]

  if (!content) {
    return res.status(404).send('File not found in memory')
  }

  res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
  res.status(200).send(content)
}
