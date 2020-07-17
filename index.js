const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();
const fs = require('fs').promises;

const PORT = 8000;

//--------------use-----------//;

app.use(express.json());
app.use(morgan('combined'));
app.use(
  cors({
    origin: `http://localhost:${PORT}`,
  }),
);

//--------------get, post, delete, patch-----------//

app.get('/contacts', async (req, res) => {
  try {
    const contactsText = await fs.readFile('db/contacts.json');
    const contacts = JSON.parse(contactsText);
    res.send({ contacts });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
});

app.get('/contacts/:contactId', async (req, res) => {
  try {
    const contactId = parseFloat(req.params.contactId);
    const contactsText = await fs.readFile('db/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsText);
    const contact = contacts.find(contact => contact.id === contactId);

    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.send({ contact });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
});

app.post('/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const id = Math.random();
    if (!name || !email || !phone) {
      return res.status(400).send({ message: 'missing required name field' });
    }
    const contactsText = await fs.readFile('db/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsText);
    const contact = { id, name, email, phone };

    contacts.push(contact);
    await fs.writeFile('db/contacts.json', JSON.stringify(contacts), 'utf-8');
    res.status(201).send({ contact });
  } catch (error) {
    console.error('Error', error);
    res.status(500).send(error);
  }
});

app.delete('/contacts/:contactId', async (req, res) => {
  try {
    const contactId = parseFloat(req.params.contactId, 10);
    const contactsText = await fs.readFile('db/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsText);
    const contactIndex = contacts.findIndex(
      contact => contact.id === contactId,
    );

    if (contactIndex === -1) {
      return res.status(404).send({ message: 'Not found' });
    }
    contacts.splice(contactIndex, 1);

    await fs.writeFile('db/contacts.json', JSON.stringify(contacts), 'utf-8');

    res.send({ message: 'contact deleted' });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
});

app.patch('/contacts/:contactId', async (req, res) => {
  try {
    const contactId = parseFloat(req.params.contactId);
    const contactsText = await fs.readFile('db/contacts.json', 'utf-8');
    const contacts = JSON.parse(contactsText);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).send({ message: 'missing fields' });
    }

    const contactIndex = contacts.findIndex(
      contact => contact.id === contactId,
    );

    if (contactIndex === -1) {
      return res.status(404).send({ message: 'Not found' });
    }

    contacts[contactIndex] = { ...contacts[contactIndex], name, email, phone };
    await fs.writeFile('db/contacts.json', JSON.stringify(contacts), 'utf-8');

    res.send();
  } catch (error) {
    console.error('Error', error);
    res.status(500).send(error);
  }
});

app.listen(PORT, err => {
  err && console.error('error', err);
  console.info('Operation complete');
});
