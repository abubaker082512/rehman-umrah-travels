module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url: reqUrl } = req;
  const urlObj = new URL(reqUrl, `http://${req.headers.host}`);
  let targetUrlBase64 = urlObj.searchParams.get('url');

  if (!targetUrlBase64) {
    return res.status(400).json({ message: 'URL parameter is required' });
  }

  try {
    // Decode base64 URL
    let targetUrl = Buffer.from(targetUrlBase64, 'base64').toString('utf-8');
    
    // Validate target URL
    if (!targetUrl.startsWith('http')) {
      return res.status(400).json({ message: 'Invalid target URL' });
    }

    // Fetch the target image from our secure Vercel environment
    const response = await fetch(targetUrl);
    if (!response.ok) {
      return res.status(response.status).json({ message: `Failed to fetch image: ${response.statusText}` });
    }

    const contentType = response.headers.get('content-type');
    const contentLength = response.headers.get('content-length');

    if (contentType) res.setHeader('Content-Type', contentType);
    if (contentLength) res.setHeader('Content-Length', contentLength);
    
    // Cache for 1 year in Vercel CDN edge servers
    res.setHeader('Cache-Control', 'public, max-age=31536000, s-maxage=31536000, immutable');

    // Convert response stream to buffer and send
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return res.status(200).send(buffer);
  } catch (err) {
    console.error('Image proxy error:', err);
    return res.status(500).json({ message: err.message });
  }
};
