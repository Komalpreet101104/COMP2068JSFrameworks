var express = require('express');
var router = express.Router();
var Grocery = require('../models/grocery');
var passport = require('passport');

// View groceries
router.get('/', async (req, res) => {
  if (!req.isAuthenticated()) return res.redirect('/users/login');
  try {
    const groceries = await Grocery.find();
    res.render('grocery/index', { groceries });
  } catch (err) {
    console.log(err);
    res.send('Error fetching groceries');
  }
});


// Add grocery
router.get('/add', function(req, res) {
  res.render('grocery/add');
});

router.post('/add', async function(req, res) {
  const { name, quantity, price } = req.body;
  const grocery = new Grocery({ name, quantity, price });
  await grocery.save();
  res.redirect('/grocery');
});

//edit grocery
router.get('/edit/:id', async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);
    res.render('grocery/edit', { grocery });
  } catch (err) {
    console.log(err);
    res.send('Error fetching grocery for edit');
  }
});

router.post('/edit/:id', async (req, res) => {
  try {
    const { name, quantity, price } = req.body;
    await Grocery.findByIdAndUpdate(req.params.id, { name, quantity, price });
    res.redirect('/grocery');
  } catch (err) {
    console.log(err);
    res.send('Error updating grocery');
  }
});


router.get('/delete/:id', async (req, res) => {
  try {
    await Grocery.findByIdAndDelete(req.params.id);
    res.redirect('/grocery');
  } catch (err) {
    console.log(err);
    res.send('Error deleting grocery');
  }
});


module.exports = router;
