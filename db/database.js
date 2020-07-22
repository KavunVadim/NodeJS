const mongoose = require('mongoose');

const USERNAME = 'vadim';
const PASSWORD = '539709';
const DATABASE_NAME = 'db-contacts';
const CONNECT_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.mvacr.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`;

console.log(CONNECT_URL);

class Database {
  constructor() {
    this.connection = null;
  }
  errorHandler(err) {
    console.error('Database connection error');
    console.error(err);
    process.exit(1);
  }

  async init() {
    try {
      this.connection = await mongoose.connect(CONNECT_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      });

      console.log('Database connection successful');
    } catch (err) {
      this.errorHandler(err);
    }
  }
}

module.exports = new Database();
