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
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user with the hashed password
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.redirect('/users/login'); // Redirect to the login page after registration
  } catch (error) {
    console.error(error);
    res.send('Error during registration'); // Display error in case of failure
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
