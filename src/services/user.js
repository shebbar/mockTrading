const { User, createUser, getAllUsers, getUser } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/config');

const login = async function (req, res, next) {
  let user = null;
  const { email, password } = req.body;
  
  if (email && password) {
    user = await getUser({email: email});
  }

  // If the user does not exist, send a "user not found" message
  if (!user) {
    res.status(401).json({ message: 'User not found' });
    return;
  }

  const storedHashedPassword = user.password;
  
  // Check if the entered password matches the stored hashed password
  bcrypt.compare(password, storedHashedPassword, function(err, isMatch) {
    if (err) {
      console.log("got a err");
      res.status(500).json({ message: err });
      return;
    }
    
    // If the passwords match, send a "success" message and log the user in
    if (isMatch) {
      //Create the token
      let payload = { id: user.id };
      let token = jwt.sign(payload, jwtConfig.JWT_SECRET);
      res.status(200).json({ message: 'Success', token: token });
      return;
    }
    // Otherwise, send an "invalid password" message
    else {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }
  });
};  

const signup = async function(req, res, next) {
  let { name, email, password, phone } = req.body;
  if (name && email && password && phone) {
    //check if email already exists
    let user = await getUser({email: email});
    if (user) {
      res.status(401).json({ message: 'Email already exists'});
      return;
    } else {
      //Hash the password, save in DB
      
      let user = await createUser({ name, email, 
                                    password: await bcrypt.hash(password, 10),
                                    phone });
      res.status(201).json({ message:  'Account created successfully!' });
      return;
    }
  } else {
    res.status(401).json({ message: 'All fields are mandatory, please check your request for missing values'});
    return;
  }
};

module.exports = { login, signup };