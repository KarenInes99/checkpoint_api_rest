const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connecté à MongoDB');
  })
  .catch((err) => {
    console.error('Erreur de connexion à MongoDB:', err.message);
  });

// RETOURNER TOUS LES UTILISATEURS
app.get('/utilisateurs', async (req, res) => {
  try {
    const utilisateurs = await User.find();
    res.json(utilisateurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AJOUTER UN NOUVEL UTILISATEUR À LA BASE DE DONNÉES
app.post('/utilisateurs', async (req, res) => {
  try {
    const { username, email } = req.body;
    const nouvelUtilisateur = await User.create({ username, email });
    res.status(201).json(nouvelUtilisateur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// MODIFIER UN UTILISATEUR PAR ID
app.put('/utilisateurs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    const utilisateurModifie = await User.findByIdAndUpdate(id, { username, email }, { new: true });
    res.json(utilisateurModifie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// SUPPRIMER UN UTILISATEUR PAR ID
app.delete('/utilisateurs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const utilisateurSupprime = await User.findByIdAndDelete(id);
    res.json({ message: 'Utilisateur supprimé', utilisateurSupprime });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Le serveur écoute sur le port ${PORT}`);
});
