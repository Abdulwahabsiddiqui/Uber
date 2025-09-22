const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const CaptainModel = require('../models/captain.model');
const BlacklistTokken = require('../models/blacklisttokken.model');

const extractToken = (req) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.split(' ')[1];
  if (req.cookies && req.cookies.token) return req.cookies.token;
  return null;
};

module.exports.user = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: 'Authorization token missing' });

    const blacklisted = await BlacklistTokken.isBlacklisted(token);
    if (blacklisted) return res.status(401).json({ error: 'Token revoked' });

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await UserModel.findById(payload.id).select('-password');
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports.captain = async (req, res, next) => {
  try {
    const token = extractToken(req);
    if (!token) return res.status(401).json({ error: 'Authorization token missing' });

    const blacklisted = await BlacklistTokken.isBlacklisted(token);
    if (blacklisted) return res.status(401).json({ error: 'Token revoked' });

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const captain = await CaptainModel.findById(payload.id).select('-password');
    if (!captain) return res.status(401).json({ error: 'Invalid token' });

    req.captain = captain;
    req.token = token;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};