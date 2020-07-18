const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
} = require('./contacts.js');

//--PORT--//

const PORT = 3005;

//--------------use-----------//

app.use(express.json());
app.use(morgan('combined'));
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  }),
);

//--------------get, post, delete, patch-----------//

app.get('/contacts', listContacts);

app.get('/contacts/:contactId', getById);

app.post('/contacts', addContact);

app.delete('/contacts/:contactId', removeContact);

app.patch('/contacts/:contactId', updateContact);

app.listen(PORT, err => {
  err && console.error('error', err);
  console.info('Operation complete');
});
