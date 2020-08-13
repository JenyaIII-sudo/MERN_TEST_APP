const { Router } = require('express');
const User = require('../models/users');

const router = Router();

// api/register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      res.status(400).json({ message: 'This user already exists' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something wrong....:D Try again !' });
  }
});
// api/login
router.post('/login', async (req, res) => {

});

module.exports = router;
