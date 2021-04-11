const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.join(__dirname, './db/contacts.json');

function listContacts() {
  fs.readFile(contactsPath)
    .then(data => console.table(data.toString()))
    .catch(err => console.log(err));
}

function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      const contact = contacts.find(item => item.id === Number(contactId));
      console.log(contact);
    })
    .catch(err => console.log(err));
}

function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      const filteredContacts = contacts.filter(item => item.id !== Number(contactId));
      fs.writeFile(contactsPath, JSON.stringify(filteredContacts)).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then(data => {
      const contacts = JSON.parse(data.toString());
      const contact = {
        id: contacts.length + 1,
        name,
        email,
        phone,
      };
      const newContacts = [...contacts, contact];

      fs.writeFile(contactsPath, JSON.stringify(newContacts)).catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
