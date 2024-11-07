const dotenv = require('dotenv');
dotenv.config();

const dbConfig = {
  'DB': process.env.DB,
  'USER': process.env.DB_USER,
  'PASSWORD': process.env.DB_PASSWORD,
  'HOST': process.env.DB_HOST,
  'DIALECT': 'mysql'
};

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { dbConfig, JWT_SECRET };