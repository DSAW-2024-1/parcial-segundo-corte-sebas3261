const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
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

app.get('/coin/:coinName', async (req, res) => {
  let coinName = req.params.coinName.toLowerCase();

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

app.get('/', (req, res) => {
  res.send('probando');
});

app.get('/users/:count', (req, res) => {
  const count = parseInt(req.params.count);
  const sort = req.query.sort || 'ASC';

  let sortedUsers;

  if (sort === 'ASC') {
    sortedUsers = users.slice(0, count);
  } else if (sort === 'DESC') {
    sortedUsers = users.slice().reverse().slice(0, count);
  } else {
    return res.status(400).send('El parámetro sort debe ser "ASC" o "DESC"');
  }

  res.json(sortedUsers);
});

app.use(bodyParser.json());

app.post('/usuarios', (req, res) => {
  const { nombre, apellido, correo } = req.body;
  if (!nombre || !apellido || !correo) {
    return res.status(400).json({ error: 'Los parámetros nombre, apellido y correo electrónico son obligatorios.' });
  }

  const ciudad = req.body.ciudad || 'Bogotá';
  const pais = req.body.pais || 'Colombia';

  const nuevoUsuario = {
    nombre,
    apellido,
    correo,
    ciudad,
    pais
  };

  res.status(201).json(nuevoUsuario);
});


app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`);
});
