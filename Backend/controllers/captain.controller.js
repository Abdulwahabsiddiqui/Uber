const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const BlacklistTokken = require('../models/blacklisttokken.model');

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000, // 1 day
};

module.exports.register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { captain, token } = await captainService.registerCaptain(req.body);
    if (token) res.cookie('token', token, COOKIE_OPTIONS);
    return res.status(201).json({ captain, token });
  } catch (err) {
    return next(err);
  }
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { captain, token } = await captainService.loginCaptain(req.body);
    if (token) res.cookie('token', token, COOKIE_OPTIONS);
    return res.status(200).json({ captain, token });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    return next(err);
  }
};

module.exports.logout = async (req, res, next) => {
  try {
    const token = req.token || (req.cookies && req.cookies.token);
    if (!token) return res.status(400).json({ error: 'No token provided' });

    const decoded = jwt.decode(token);
    let expiresAt;
    if (decoded && decoded.exp) expiresAt = new Date(decoded.exp * 1000);
    else expiresAt = new Date(Date.now() + COOKIE_OPTIONS.maxAge);

    await BlacklistTokken.create({ token, expiresAt });
    res.clearCookie('token', COOKIE_OPTIONS);
    return res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    return next(err);
  }
};

module.exports.profile = async (req, res, next) => {
  try {
    const profile = req.captain || req.user;
    if (!profile) return res.status(401).json({ error: 'Unauthorized' });
    return res.status(200).json({ captain: profile });
  } catch (err) {
    return next(err);
  }
};
