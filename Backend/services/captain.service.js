const bcrypt = require('bcrypt');
const CaptainModel = require('../models/captain.model');

// Register captain (similar to user service)
const registerCaptain = async ({ name, email, password, ...rest }) => {
  if (!name || !email || !password) {
    const err = new Error('Name, email and password are required');
    err.status = 400;
    throw err;
  }

  const exists = await CaptainModel.findOne({ email });
  if (exists) {
    const err = new Error('Email already exists');
    err.status = 409;
    throw err;
  }

  // Do not double-hash here if model has pre('save') hook.
  const captain = new CaptainModel({ name, email, password, ...rest });
  const savedCaptain = await captain.save();
  console.log("✅ Captain saved to DB:", savedCaptain);

  const token = (typeof savedCaptain.generateAuthToken === 'function')
    ? savedCaptain.generateAuthToken()
    : null;

  return {
    captain: {
      id: savedCaptain._id,
      name: savedCaptain.name,
      email: savedCaptain.email,
      ...rest && { ...rest },
    },
    token,
  };
};

// Login captain
const loginCaptain = async ({ email, password }) => {
  if (!email || !password) {
    const err = new Error('Email and password are required');
    err.status = 400;
    throw err;
  }

  const captain = await CaptainModel.findOne({ email }).select('+password');
  if (!captain || !captain.password) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  // Prefer model method if provided
  let isMatch = false;
  if (typeof captain.comparePassword === 'function') {
    isMatch = await captain.comparePassword(password);
  } else {
    isMatch = await bcrypt.compare(password, captain.password);
  }

  if (!isMatch) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  const token = (typeof captain.generateAuthToken === 'function')
    ? captain.generateAuthToken()
    : null;

  return {
    captain: {
      id: captain._id,
      name: captain.name,
      email: captain.email,
    },
    token,
  };
};

module.exports = {
  registerCaptain,
  loginCaptain,
};
