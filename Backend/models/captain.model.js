const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  vehicleDetails: { type: String },
  licenseNumber: { type: String },
  WebSocketId: { type: String },
});

// Only hash when password modified and not already a bcrypt hash
captainSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  // if already a bcrypt hash, skip
  if (typeof this.password === 'string' && /^\$2[ayb]\$/.test(this.password)) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

captainSchema.methods.comparePassword = async function (plain) {
  if (!this.password) return false;
  return bcrypt.compare(plain, this.password);
};

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
};

module.exports = mongoose.model('Captain', captainSchema);