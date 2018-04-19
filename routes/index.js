const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const Product = require('../models/product');
const Cart = require('../models/cart');

var storage = multer.diskStorage({
	destination:(req,file,cb) => {
		cb(null,'public/images/upload');
	},
	filename: (req,file,cb) => {
		cb(null,Date.now() + file.originalname);
	}
});
var upload = multer({ storage:storage });

const people_controller = require('../controllers/peopleCtr');
const product_controller = require('../controllers/productCtr');


router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});


/* GET home page. */
router.get('/', (req,res,next) => {
  res.render('index',{title:'Express'});

});


/**
 * Router Product
 * 
 */
router.get('/add-to-cart/:id', function (req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart.items : {});
    
    Product.findById(productId, function (err, product) {
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});


router.get('/shop',  (req, res, next) => {
    Product.find( (err, docs) => {
        res.render('product', {title: 'Shopping Cart', products: docs});
    });
});



router.get('/add' ,product_controller.product_create_get);

module.exports = router;


