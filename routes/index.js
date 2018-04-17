const express = require('express');
const router = express.Router();
const multer = require('multer');
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

//people  router
router.get('/people', people_controller.people_list);

router.post('/register/people',people_controller.people_create_post);


/* GET home page. */
router.get('/', product_controller.product_list);

router.get('/h2', product_controller.product_list);
router.get('/h3',product_controller.product_list);


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
// router.get('/product', (req, res, next) => {
//   res.render('product', { title: 'Express' });
// });
router.get('/addProduct', (req, res, next) => {
  res.render('Addproduct', { title: 'Express' });
});

// 
router.post('/addProduct',upload.any(),product_controller.product_create_post);
router.get('/product', product_controller.product_list);



module.exports = router;
