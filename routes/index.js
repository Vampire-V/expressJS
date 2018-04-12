const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});
router.get('/h2', (req, res, next) => {
  res.render('home-02', { title: 'Express' });
});
router.get('/h3', (req, res, next) => {
  res.render('home-03', { title: 'Express' });
});

//product router
router.get('/product', (req, res, next) => {
  res.render('product', { title: 'Express' });
});



module.exports = router;
