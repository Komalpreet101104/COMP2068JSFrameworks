const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Assuming you have a User model

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id); // Store the user ID in the session
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user); // Retrieve user by ID from DB
  });
});

// Local Strategy for username/password authentication
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Use email for login
      passwordField: 'password', // Use password field
    },
    (email, password, done) => {
      // Find user by email
      User.findOne({ email: email }, (err, user) => {
        if (err) return done(err);

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Compare password with the hashed password stored in DB
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return done(err);

          if (isMatch) {
            return done(null, user); // Successful authentication
          } else {
            return done(null, false, { message: 'Incorrect password.' });
          }
        });
      });
    }
  )
);

module.exports = passport;
