var express = require('express');
var router = express.Router();

// Home Route
router.get('/', function (req, res, next) {
  res.render('home', { title: 'Home' });
});

// About Me Route
router.get('/aboutme', function (req, res, next) {
  res.render('aboutme', { title: 'About Me' });
});

// Projects Route
router.get('/projects', function (req, res, next) {
  res.render('projects', { title: 'Projects' });
});

// Contact Me Route
router.get('/contactme', function (req, res, next) {
  res.render('contactme', { title: 'Contact Me' });
});

// Error Route
router.use(function (req, res, next) {
  res.status(404).render('error', { title: '404 - Page Not Found' });
});

module.exports = router;
