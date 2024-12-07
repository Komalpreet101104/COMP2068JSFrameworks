var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');

// Register page
router.get('/register', function(req, res) {
  res.render('register');
});

// Register new user
router.post('/register', async function(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already in use');
      return res.redirect('/users/register');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    req.flash('success', 'Registration successful. Please log in.');
    res.redirect('/users/login');
  } catch (error) {
    console.error(error);
    req.flash('error', 'There was an error during registration. Please try again.');
    res.redirect('/users/register');
  }
});


// Login page
router.get('/login', function(req, res) {
  res.render('login');
});

// Login user
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('error', info.message);
      return res.redirect('/users/login');
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});



module.exports = router;
