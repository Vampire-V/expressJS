const personModel = require('../models/person');

// Display list of all Authors.
exports.person_list = (req, res) => {
    personModel.find().find( (err,data) => {
        res.send('person list : ' + data);
    });
    // res.send('<H1>NOT IMPLEMENTED: Author list</H1>');
    // res.render('index', { title: 'Express' });
};

// Display detail page for a specific Author.
exports.person_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.person_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.person_create_post = (req, res) => {
    person = new personModel({
        name: req.body.name,
        username: req.body.username,
        password: req.body.pass,
        emailAddress: req.body.email,
        gender:req.body.gender,
        address: req.body.address
    })
    person.save(function (err, product) {
        if (err) err
        console.log(product);
        
      })
      res.redirect('/person')
    // res.send('NOT IMPLEMENTED: Author create POST');
};

// Display Author delete form on GET.
exports.person_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.person_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.person_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.person_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};