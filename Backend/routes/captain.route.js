const express = require('express');
const router = express.Router();
const captainController = require('../controllers/captain.controller');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password too short'),
  ],
  captainController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  captainController.login
);

// protected routes use auth.captain
router.post('/logout', auth.captain, captainController.logout);
router.get('/profile', auth.captain, captainController.profile);

module.exports = router;