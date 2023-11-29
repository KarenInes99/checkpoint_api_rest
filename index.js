const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();


const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté a MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion:', err.message);
  });

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
