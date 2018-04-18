const Product = require('../models/product');


// Display list of all Authors.
exports.product_list_get = (req,res,next) => {
    Product.find().find((err, data) => {
        res.render('product', { data: data,title: 'Express' });
    });
};

// Display detail page for a specific Author.
exports.product_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.product_create_get = (req,res,next) => {
    res.render('Addproduct', { title: 'Express' });
};

// Handle Author create on POST.
exports.product_create_post = (req,res,next) => {

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
        Product.create(productData, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/getproduct');
            }
        });
        // res.send('NOT IMPLEMENTED: Author create POST');
    }
};

// Display Author delete form on GET.
exports.product_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.product_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.product_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.product_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};

