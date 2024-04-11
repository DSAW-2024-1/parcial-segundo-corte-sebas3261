const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('¡Hola desde tu API de prueba en Vercel!');
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
