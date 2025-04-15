const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
app.use(cors());

const API_KEY = 'MYSECRETKEY123987@#!'; // 🔐 Change this to your actual key

// ✅ API key validation middleware
app.use('/proxy', (req, res, next) => {
  const providedKey = req.query.apiKey;
  if (providedKey !== API_KEY) {
    return res.status(403).send('Forbidden: Invalid API key');
  }
  next();
});

// 🌐 Proxy route
app.get('/proxy', async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing ?url= parameter');

  try {
    const response = await fetch(targetUrl);
    const contentType = response.headers.get('content-type') || 'text/plain';
    const body = await response.text();

    // ✅ Prevent caching
    res.set('Cache-Control', 'no-store');
    res.set('Content-Type', contentType).send(body);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Error fetching target URL: ' + err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`CORS Proxy running on port ${PORT}`));
