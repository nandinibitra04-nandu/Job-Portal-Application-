const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


/* ================= REGISTER ================= */

const register = async (req, res) => {

  try {

    console.log("REGISTER DATA:", req.body);

    const { name, email, password } = req.body;

    /* Check Existing User */

    const existingUser = await User.findOne({ email });

    if(existingUser){

      return res.status(400).json({
        message: 'User already exists'
      });

    }

    /* Encrypt Password */

    const hashedPassword = await bcrypt.hash(password, 10);

    /* Save User */

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    console.log("USER SAVED:", user);

    res.status(201).json({
      message: 'Registration Successful',
      user
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};



/* ================= LOGIN ================= */

const login = async (req, res) => {

  try {

    console.log("LOGIN DATA:", req.body);

    const { email, password } = req.body;

    /* Find User */

    const user = await User.findOne({ email });

    console.log("FOUND USER:", user);

    /* User Not Found */

    if (!user) {

      return res.status(400).json({
        message: 'User not found'
      });

    }

    /* Compare Password */

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid Credentials'
      });

    }

    /* Create Token */

    const token = jwt.sign(
      { id: user._id },
      'secretkey',
      { expiresIn: '1d' }
    );

    /* Success */

    res.json({
      message: 'Login Successful',
      token
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};


module.exports = {
  register,
  login
};