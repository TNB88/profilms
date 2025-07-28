import fs from 'fs'
import path from 'path'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { filename, content } = req.body

    if (!filename || !content) {
      return res.status(400).json({ error: 'Missing filename or content' })
    }

    const filePath = path.join(process.cwd(), 'public', filename)
    fs.writeFileSync(filePath, content, 'utf8')

    const fileUrl = `https://${req.headers.host}/${filename}`
    return res.status(200).json({ url: fileUrl })
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
}
