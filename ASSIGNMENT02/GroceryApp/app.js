require('dotenv').config(); // To Load environment variables from .env file

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose");
var session = require("express-session");
var passport = require("passport");
var flash = require('connect-flash'); 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var groceryRouter = require('./routes/grocery'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session and flash middleware setup (before passport initialization)
const MongoStore = require('connect-mongo');
app.use(session({
  secret: 'your_secret_key', 
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: process.env.CONNECTION_STRING_MONGODB,
    collectionName: 'sessions',
  })
}));

// To Initialize flash middleware
app.use(flash()); 
app.use((req, res, next) => {
  res.locals.messages = req.flash(); 
  next();
});

require('./configs/passport'); 

app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING_MONGODB)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/grocery', groceryRouter); 

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

module.exports = app;
