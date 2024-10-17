const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', { title: 'Home', cssFile: 'home' });
});

router.get('/aboutme', (req, res) => {
  res.render('aboutme', { title: 'About Me', cssFile: 'aboutme' });
});

router.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects', cssFile: 'projects' });
});

router.get('/contactme', (req, res) => {
  res.render('contactme', { title: 'Contact Me', cssFile: 'contactme' });
});

module.exports = router;


