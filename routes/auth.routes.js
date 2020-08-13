const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const router = Router();

// api/register
router.post('/register', [
  check('email', 'Email incorrect !').isEmail(),
  check('password', 'Password is incorrect, min 6 symbols').isLength({ min: 6 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Incorrect data when you try Register',
      });
    }

    const { email, password } = req.body;

    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(400).json({ message: 'This user already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email, password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: 'User has been created ! :)' });
  } catch (e) {
    res.status(500).json({ message: 'Something wrong....:D Try again !' });
  }
});
// api/login
router.post('/login',
  [
    check('email', 'Enter the correct email').normalizeEmail().isEmail(),
    check('password', 'Enter the correct password').exists(),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect data when you Login',
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found ! KEK ;)' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Password incorrect, try again !' });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecretCode'),
        { expiresIn: '1h' },
      );

      res.json({ token, userId: user.id });
    } catch (e) {
      res.status(500).json({ message: 'Something wrong....:D Try again !' });
    }
  });

module.exports = router;
