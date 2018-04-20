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
        console.log(req.session.cart);
        // res.redirect('/shop');
    });
});


router.get('/shop',  (req, res, next) => {
    Product.find( (err, docs) => {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
}
        res.render('product', {title: 'Shopping Cart', products: docs});
    });
});


router.post('/addProduct',(req,res,next) => {
    if (req.body.title &&
        req.body.price &&
        req.body.size &&
        req.body.color &&
        req.body.quantity &&
        req.body.proType) {
        productData = new Product({
            title: req.body.title,
            img: {
                part1: req.files[0].path,
                part2: req.files[1].path,
                part3: req.files[2].path,
            },
            price: req.body.price,
            size: req.body.size,
            color: req.body.color,
            quantity: req.body.quantity,
            proType: req.body.proType,
            description: req.body.description
        })
        console.log(productData);
        
        Product.create(productData, function (err, user) {
            console.log("กำลังบันทึก");
            
            if (err) {
                console.log("เออเรอ");
                return next(err)
            } else {
                console.log("บันทึกแล้ว");
                return res.redirect('/shop');
            }
        });
        // res.send('NOT IMPLEMENTED: Author create POST');
    }
});
router.get('/add' ,product_controller.product_create_get);

module.exports = router;


