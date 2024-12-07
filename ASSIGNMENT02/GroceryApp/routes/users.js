const bcrypt = require('bcrypt'); 
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

// Register page
router.get('/register', function(req, res) {
  res.render('register');
});

// To Register new user
router.post('/register', async function(req, res) {
  try {
    const { username, email, password } = req.body;

    // To Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/users/register');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // For saving the user with the hashed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    req.flash('success', 'Registration successful. Please log in.');
    res.redirect('/users/login');
  } 
  catch (error) {
    console.error("Registration Error: ", error.message);  // Log the actual error
    req.flash('error', `There was an error during registration: ${error.message}`);
    res.redirect('/users/register');
  }
  
});


// Login page
router.get('/login', function(req, res) {
  res.render('login');
});

// Login user
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Login failed: Incorrect email');
      req.flash('error', 'Invalid email or password');
      return res.redirect('/users/login');
    }

    // Compare the entered password with the hashed password stored in the DB
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('Login failed: Incorrect password');
      req.flash('error', 'Invalid email or password');
      return res.redirect('/users/login');
    }

    // If the password is correct, log in the user
    req.login(user, (err) => {
      if (err) {
        console.log('Error during login:', err);
        return next(err);
      }
      return res.redirect('/');  // Redirect to the home page (or another page)
    });
  } catch (error) {
    console.error('Login Error:', error); // Log the error
    req.flash('error', 'There was an error during login. Please try again.');
    return res.redirect('/users/login');
  }
});





module.exports = router;