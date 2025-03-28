const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const VERIFY_TOKEN = 'rambla25';

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Verificado por Facebook');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

app.post('/webhook', (req, res) => {
  console.log('📥 Evento recibido:', JSON.stringify(req.body, null, 2));

  // Aquí puedes reenviar el evento a Make
  axios.post('https://hook.eu2.make.com/hnwpxbvj1k8w4cl8xaipjlof7lh8qayd', req.body)
    .then(() => console.log('📤 Evento reenviado a Make'))
    .catch(err => console.error('❌ Error al reenviar a Make:', err));

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
