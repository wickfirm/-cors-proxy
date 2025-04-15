const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

(async () => {
  try {
    const res = await fetch('http://fig-server.ddns.net:7412/api/shopify/46492');
    const data = await res.text();
    console.log('Fetch successful:', data);
  } catch (err) {
    console.error('Fetch error:', err);
  }
})();
