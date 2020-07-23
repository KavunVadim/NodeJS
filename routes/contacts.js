const express = require('express');
const router = express.Router();

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('../controller/contacts');

router.get('/contacts', listContacts);

router.get('/contacts/:contactId', getById);

router.post('/contacts', addContact);

router.delete('/contacts/:contactId', removeContact);

router.patch('/contacts/:contactId', updateContact);

module.exports = router;
