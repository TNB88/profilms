import { memoryStore } from './store'

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { filename, content } = req.body
    if (!filename || !content) {
      return res.status(400).json({ error: 'Missing filename or content' })
    }

    memoryStore[filename] = content

    return res.status(200).json({
      url: `${req.headers.host.startsWith('localhost') ? 'http://' : 'https://'}${req.headers.host}/api/raw/${encodeURIComponent(filename)}`
    })
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
