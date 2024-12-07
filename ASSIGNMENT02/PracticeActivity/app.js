require('dotenv').config(); // Load environment variables from .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groceryRouter = require('./routes/grocery'); // Route for CRUD operations

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport session setup
const MongoStore = require('connect-mongo');  // Correctly import connect-mongo
app.use(session({
  secret: 'your_secret_key', // Use a strong secret in production
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.CONNECTION_STRING_MONGODB,  // Use the environment variable
    collectionName: 'sessions',  // Optional: specify the sessions collection name
  })
}));

require('./configs/passport'); // Ensure this points to your passport configuration file

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING_MONGODB, {  // Use the environment variable for MongoDB connection
  
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB connection error: ", err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grocery', groceryRouter); // Use grocery routes for CRUD operations

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

const flash = require('connect-flash');
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});


module.exports = app;
