const Product = require('../models/product');


// Display list of all Authors.
exports.product_list = (req, res) => {
    Product.find().find((err, data) => {
        console.log(data.img);
        res.render('product', { data: data,title: 'Express' });
        // res.render('/', { data: data,title: 'Express' });
    });
    // res.send('<H1>NOT IMPLEMENTED: Author list</H1>');
    // res.render('index', { title: 'Express' });
};

// Display detail page for a specific Author.
exports.product_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.product_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create GET');
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

exports.product_Login_get = (req, person, password, done) => {
    User.findOne({
        username: req.body.uname
    }, (err, user) => {
        if (err) {
            res.send('error');
        }
        if (!user) {
            return done(null, false, {
                errMsg: 'User does not exist, please' +
                    ' <a class="errMsg" href="/signup">signup</a>'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                errMsg: 'Invalid password try again'
            });
        }
        return done(null, user);
    });

};