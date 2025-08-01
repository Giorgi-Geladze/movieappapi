const bcrypt = require('bcryptjs');
const jwt    = require('../utils/jwt');
const User   = require('../models/user');



async function register(req, res, next) {
  try {
    const { username, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already in use' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashed, role });

    const token = jwt.sign({ id: user._id, role: user.role });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

async function login(req, res, next) {

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};


// სამომავლოდ გამოსაყენებელი ფუნქცია ტოკენის refresh-ისთვის
// optional: implement refresh if using refresh tokens
async function refreshToken(req, res) {
  res.status(501).json({ message: 'Not implemented' });
};

module.exports = {register, login, refreshToken}