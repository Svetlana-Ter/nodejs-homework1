const path = require('path');
const fs = require('fs').promises;
const shortid = require('shortid');
const id = shortid.generate();

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

function errorHandle(error) {
  console.log(error);
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    console.table(data.toString());
    return data;
  } catch (err) {
    errorHandle(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await listContacts();
    const contacts = JSON.parse(data.toString());
    const contact = contacts.find(item => item.id === Number(contactId));
    console.log(contact);
  } catch (err) {
    errorHandle(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await listContacts();
    const contacts = JSON.parse(data.toString());
    const filteredContacts = contacts.filter(item => item.id !== Number(contactId));
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
  } catch (err) {
    errorHandle(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await listContacts();
    const contacts = JSON.parse(data.toString());
    const contact = {
      id,
      name,
      email,
      phone,
    };
    const newContacts = [...contacts, contact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
  } catch (err) {
    errorHandle(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
