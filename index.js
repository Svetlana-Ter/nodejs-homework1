const { listContacts, getContactById, removeContact, addContact } = require('./contacts');
// 1st variant - module yargs
// const argv = require('yargs').argv;
// node index.js --action="add" --name="Mango" --email="mango@gmail.com" --phone="322-22-22" вводим в командной строке

// 2nd variant - commander
// node index.js -a add -n Mango -e mango@gmail.com -p 322-22-22 вводим в командной строке
const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      listContacts();
      break;

    case 'get':
      getContactById(id);
      break;

    case 'add':
      addContact(name, email, phone);
      break;

    case 'remove':
      removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
