var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// In routes/index.js (or app.js)

router.get('/', (req, res) => {
  // Define categories with name and image URL
  const categories = [
    { name: 'Fruits', image: '/images/fruits.jpg' },
    { name: 'Vegetables', image: '/images/vegetables.jpg' },
    { name: 'Dairy', image: '/images/dairy.jpg' },
    { name: 'Bakery', image: '/images/bakery.jpg' }
  ];

  // Render the index page with the categories data
  res.render('index', { categories });
});


module.exports = router;
