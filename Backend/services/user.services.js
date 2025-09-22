const bcrypt = require('bcrypt');
const UserModel = require('../models/user.model');

// Register
module.exports.createUser = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    const err = new Error('All fields are required');
    err.status = 400;
    throw err;
  }

  const exists = await UserModel.findOne({ email });
  if (exists) {
    const err = new Error('Email already exists');
    err.status = 409;
    throw err;
  }

  const user = new UserModel({ name, email, password });
  await user.save();

  const token = user.generateAuthToken();
  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};

// Login
module.exports.loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const user = await UserModel.findOne({ email }).select('+password');
  if (!user) {
    const err = new Error('Invalid user');
    err.status = 401;
    throw err;
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const err = new Error('Invalid password');
    err.status = 401;
    throw err;
  }

  const token = user.generateAuthToken();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
