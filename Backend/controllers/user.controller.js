const userService = require('../services/user.services');
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
    console.log('req.body =', req.body); // debug
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user, token } = await userService.createUser(req.body);
        return res.status(201).json({ user, token });
    } catch (err) {
        return next(err);
    }
};

module.exports.login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { user, token } = await userService.loginUser(req.body);
        return res.status(200).json({ user, token });
    } catch (err) {
        // if service provided status use it
        if (err.status) return res.status(err.status).json({ error: err.message });
        return next(err);
    }
};

// logout: blacklist current token and clear cookie
module.exports.logout = async (req, res, next) => {
    try {
        const token = req.token || (req.cookies && req.cookies.token);
        if (!token) return res.status(400).json({ error: 'No token provided' });

        // try to get expiry from token payload; fallback to 1 day
        const decoded = jwt.decode(token);
        let expiresAt;
        if (decoded && decoded.exp) {
            expiresAt = new Date(decoded.exp * 1000);
        } else {
            expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
        }

        // store in blacklist collection (will auto-expire via model TTL index)
        await BlacklistTokken.create({ token, expiresAt });

        // clear cookie on client
        res.clearCookie('token', COOKIE_OPTIONS);
        return res.status(200).json({ message: 'Logged out' });
    } catch (err) {
        next(err);
    }
};

// --- added profile handler ---
module.exports.profile = async (req, res, next) => {
    // req.user is set by auth middleware
    try {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' });
        return res.status(200).json({ user: req.user });
    } catch (err) {
        next(err);
    }
};