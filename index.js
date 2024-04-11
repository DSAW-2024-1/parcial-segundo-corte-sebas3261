const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hola, mundo!' });
});

module.exports.handler = serverless(app);
