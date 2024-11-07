const { Sequelize } = require("sequelize");
const db = require('./db');

const User = db.sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  phone: {
    type: Sequelize.STRING,
  },
});
// create table with user model
User.sync()
  .then(() => console.log('User table sync done'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

// create some helper functions to work on the database
const createUser = async ({ name, email, password, phone }) => {
  console.log("passed password is " + password);
  return await User.create({ name, email, password, phone });
};

const getAllUsers = async () => {
  return await User.findAll();
};

const getUser = async obj => {
  return await User.findOne({
    where: obj,
  });
};

module.exports = { User, createUser, getAllUsers, getUser };