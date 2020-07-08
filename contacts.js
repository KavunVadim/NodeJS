const fs = require('fs');
const path = require('path');
const contactsPath = path.join(__dirname, './db/contacts.json');
const util = require('util');

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

exports.listContacts = () => {
  readFile(contactsPath, 'utf-8', (err, content) => {
    const parsedContent = JSON.parse(content);
    if (err) throw err;
    console.table(parsedContent);
  });
};

exports.getContactById = async id => {
  const contactsDb = await readFile(contactsPath, 'utf-8');
  const parsedContent = JSON.parse(contactsDb);
  const findContact = parsedContent.find(contact => contact.id === id);
  if (!findContact) {
    return console.log('Contact not find');
  }
  return console.log('find Contact', findContact);
};

exports.removeContact = async id => {
  const contactsDb = await readFile(contactsPath, 'utf-8');
  const parsedContent = JSON.parse(contactsDb);
  const deleteContact = parsedContent.filter(contact => contact.id != id);
  const newContacts = JSON.stringify(deleteContact);
  writeFile(contactsPath, newContacts);
  console.table(deleteContact);
  return console.log('remove contact');
};

exports.addContact = async (name, email, phone) => {
  const contactsDb = await readFile(contactsPath, 'utf-8');
  const parsedContent = JSON.parse(contactsDb);
  const id = parsedContent.length + 1;
  const newContact = { id, name, email, phone };
  const addContact = [...parsedContent, newContact];
  await writeFile(contactsPath, JSON.stringify(addContact));
  return console.table(addContact);
};
