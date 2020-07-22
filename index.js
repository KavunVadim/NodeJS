const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');

const database = require('./db/database');
const contacts = require('./routes/contacts');

async function main() {
  await database.init();

  app.use(express.json());
  app.use(cors());
  app.use(morgan('combined'));
  app.use(contacts);

  app.use((req, res) => {
    res.status(404).send({ message: 'Page not found' });
  });

  app.listen(3006, err => {
    err && console.error('error', err);
    console.info('Operation complete');
  });
}

main().catch(console.error);
