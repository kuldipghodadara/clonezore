const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3001;

app.get('/app/routes/($locale).track', async (req, res) => {
  const {orderId, email} = req.query;
  const apiUrl = `https://pp-proxy.parcelpanel.com/api/v2/tracking-info?order=${encodeURIComponent(
    orderId,
  )}&email=${encodeURIComponent(
    email,
  )}&shop=clonezore.myshopify.com&lang=en&country=IN`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({error: 'Failed to fetch tracking information'});
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
