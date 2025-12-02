const express = require('express');
const app = express();
const PORT = 8080;

// Environment variable for Challenge 5
const env = process.env.APP_ENV || 'local';

app.get('/', (req, res) => {
  res.send(`Hello from Kubernetes! Environment: ${env}`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});