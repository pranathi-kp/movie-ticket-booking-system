const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const signup = async (req, res) => {
    const { username, email, password, isAdmin } = req.body;
  
    try {
      const user = await User.create({ username, email, password, isAdmin }); 
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
      res.json({ token, user });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ error: 'User could not be created' });
    }
  };

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  const user = await User.findOne({ where: { email } });

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET);
  res.json({ token, user });
};



module.exports = { signup, login };
