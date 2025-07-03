
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/novedades', (req, res) => {
    res.sendFile(__dirname + '/views/novedades.html');
});
app.get('/api/noticias-salud', async (req, res) => {
  try {
    const resp = await axios.get('https://newsdata.io/api/1/news', {
      params: {
        apikey: 'pub_394e30a78b274c2e95f9d422b4a78a45',
        category: 'health',
        language: 'es'
      }
    });
    res.json(resp.data);
  } catch(e) {
    console.error(e);
    res.status(500).json({error: 'Error al traer noticias'});
  }
});


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
