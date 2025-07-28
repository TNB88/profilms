const { redis } = require('../../../lib/redis')

module.exports = async function handler(req, res) {
  const { filename } = req.query
  if (typeof filename !== 'string') {
    res.status(400).end('Invalid filename')
    return
  }

  try {
    const content = await redis.get(filename)
    if (!content) {
      res.status(404).end('Not Found')
      return
    }

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl')
    res.status(200).send(content)
  } catch (e) {
    res.status(500).end('Error reading file')
  }
}

