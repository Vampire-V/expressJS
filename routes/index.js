const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const pepleModel = require('../models/people');
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









/* GET home page. */
router.get('/', (req,res,next) => {
  res.render('index',{title:'Express'});

});


/**
 * Router Product
 * 
 */
router.get('/shop', product_controller.product_list_get);

router.get('/add',product_controller.product_create_get);

module.exports = router;
