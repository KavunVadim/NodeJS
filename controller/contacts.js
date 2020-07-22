const ContactModel = require('../models/ContactModel');

exports.listContacts = async (req, res) => {
  try {
    const contacts = await ContactModel.find({});

    res.send({ contacts });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactModel.findById({ _id: contactId });

    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }

    res.send({ contact });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
};

exports.addContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const contact = await ContactModel.create({ name, email, phone });

    res.status(201).send({ contact });
  } catch (error) {
    console.error('Error', error);
    res.status(500).send(error);
  }
};

exports.removeContact = async (req, res) => {
  try {
    const { contactId } = req.params;

    const contact = await ContactModel.deleteById({ _id: contactId });

    res.send({ message: 'contact deleted' });
  } catch (error) {
    console.error('Error !!!', error);
    res.status(500).send({ message: 'internal server error' });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;

    const contact = await ContactModel.findById({ _id: contactId });

    if (!contact) {
      return res.status(404).send({ message: 'Not found' });
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;

    await contact.save();

    res.status(204).send();
  } catch (error) {
    console.error('Error', error);
    res.status(500).send(error);
  }
};
