const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  { nombre: 'Samuel', apellido: 'Acero García' },
  { nombre: 'Darek', apellido: 'Aljuri Martínez' },
  { nombre: 'Juan Felipe', apellido: 'Cepeda Uribe' },
  { nombre: 'Ana María', apellido: 'Chaves Pérez' },
  { nombre: 'Carlos David', apellido: 'Cruz Pavas' },
  { nombre: 'Diego Norberto', apellido: 'Díaz Algarín' },
  { nombre: 'Jorge Esteban', apellido: 'Díaz Bernal' },
  { nombre: 'David Esteban', apellido: 'Díaz Vargas' },
  { nombre: 'Juan José', apellido: 'Forero Peña' },
  { nombre: 'Santiago', apellido: 'Gutierrez De Piñeres Barbosa' },
  { nombre: 'Samuel Esteban', apellido: 'Lopez Huertas' },
  { nombre: 'Michael Steven', apellido: 'Medina Fernandez' },
  { nombre: 'Katherin Juliana', apellido: 'Moreno Carvajal' },
  { nombre: 'Juan Pablo', apellido: 'Moreno Patarroyo' },
  { nombre: 'Nicolás Esteban', apellido: 'Muñoz Sendoya' },
  { nombre: 'Santiago', apellido: 'Navarro Cuy' },
  { nombre: 'Juan Pablo', apellido: 'Parrado Morales' },
  { nombre: 'Daniel Santiago', apellido: 'Ramirez Chinchilla' },
  { nombre: 'Juan Pablo', apellido: 'Restrepo Coca' },
  { nombre: 'Gabriela', apellido: 'Reyes Gonzalez' },
  { nombre: 'Juan José', apellido: 'Rodriguez Falla' },
  { nombre: 'Valentina', apellido: 'Ruiz Torres' },
  { nombre: 'Mariana', apellido: 'Salas Gutierrez' },
  { nombre: 'Sebastian', apellido: 'Sanchez Sandoval' },
  { nombre: 'Josue David', apellido: 'Sarmiento Guarnizo' },
  { nombre: 'Santiago', apellido: 'Soler Prado' },
  { nombre: 'Maria Fernanda', apellido: 'Tamayo Lopez' },
  { nombre: 'Deivid Nicolas', apellido: 'Urrea Lara' },
  { nombre: 'Andrés', apellido: 'Azcona' }
];

app.get('/', (req, res) => {
  res.send('La API está viva');
});

app.get('/coin/:coinName', async (req, res) => {
  const coinName = req.params.coinName;

  try {
    const response = await axios.get(`https://api.coincap.io/v2/assets/${coinName}`);

    if (!response.data.data) {
      return res.send('El nombre de la moneda no fue encontrado en la base de datos');
    }

    const priceInUSD = response.data.data.priceUsd;
    res.send(`El precio en dólares de la moneda ${coinName} para el día de hoy es ${priceInUSD}`);
  } catch (error) {
    console.error('Error al consultar la API de CoinCap:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/users', (req, res) => {
  let count = parseInt(req.query.count) || users.length;
  const sort = req.query.sort || 'ASC';

  const sortedUsers = [...users].sort((a, b) => {
    if (sort === 'DESC') {
      return b.apellido.localeCompare(a.apellido);
    }
    return a.apellido.localeCompare(b.apellido);
  });

  const userList = sortedUsers.slice(0, count).map(user => ({
    nombre: user.nombre,
    apellido: user.apellido
  }));

  res.json(userList);
});

app.post('/users', (req, res) => {
  const { nombre, apellido, correo, ciudad = 'Bogotá', país = 'Colombia' } = req.body;

  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const nuevoUsuario = { nombre, apellido, correo, ciudad, país };
  res.status(201).json(nuevoUsuario);
});

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
