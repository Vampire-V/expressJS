const express = require('express');
const router = express.Router();

const person_controller = require('../controllers/personCtr');

//person get all
router.get('/person', person_controller.person_list);
router.post('/register/person',person_controller.person_create_post);


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


//rout contact
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Express' });
});
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Express' });
});
router.get('/shoping-cart', (req, res, next) => {
  res.render('shoping-cart', { title: 'Express' });
});
router.get('/blog', (req, res, next) => {
  res.render('blog', { title: 'Express' });
});
router.get('/blog-detail', (req, res, next) => {
  res.render('blog-detail', { title: 'Express' });
});

//product router
router.get('/product', (req, res, next) => {
  res.render('product', { title: 'Express' });
});



module.exports = router;
