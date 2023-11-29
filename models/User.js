const mongoose = require('mongoose');

// Schéma du modèle d'utilisateur
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

});

// Création du modèle User à partir du schéma
const User = mongoose.model('User', userSchema);

module.exports = User;
