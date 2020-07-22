const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    validate: email => {
      if (!email.includes('@')) {
        throw new Error('Wring format');
      }
    },
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  subscription: String,
  password: String,
  token: String,
});

module.exports = mongoose.model('Contact', ContactSchema);
