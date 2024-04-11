const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Endpoint para la ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola desde tu API!');
});

// Nuevo endpoint para /api/saludo
app.get('/api/saludo', (req, res) => {
  res.json({ mensaje: '¡Hola desde el nuevo endpoint de saludo!' });
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
