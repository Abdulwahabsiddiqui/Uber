const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password too short'),
  ],
  userController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  userController.login
);

// protected routes use auth.user
router.post('/logout', auth.user, userController.logout);
router.get('/profile', auth.user, userController.profile);

module.exports = router;