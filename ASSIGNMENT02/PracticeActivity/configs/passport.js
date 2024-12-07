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
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Compare password with the hashed password stored in DB
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (isMatch) {
          return done(null, user); // User authenticated
        } else {
          return done(null, false, { message: 'Incorrect password.' });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);


module.exports = passport;
