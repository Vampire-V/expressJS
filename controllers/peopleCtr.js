const peopleModel = require('../models/people');

// Display list of all Authors.
exports.people_list = (req, res) => {
    peopleModel.find().find((err, data) => {
        res.send('person list : ' + data);
    });
    // res.send('<H1>NOT IMPLEMENTED: Author list</H1>');
    // res.render('index', { title: 'Express' });
};

// Display detail page for a specific Author.
exports.people_detail = (req, res) => {
    res.send('NOT IMPLEMENTED: Author detail: ' + req.params.id);
};

// Display Author create form on GET.
exports.people_create_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author create GET');
};

// Handle Author create on POST.
exports.people_create_post = (req, res) => {
    if (req.body.name &&
        req.body.username &&
        req.body.pass &&
        req.body.email &&
        req.body.gender &&
        req.body.address ) {
        people = new peopleModel({
            name: req.body.name,
            username: req.body.username,
            password: req.body.pass,
            emailAddress: req.body.email,
            gender: req.body.gender,
            address: req.body.address
        })
        peopleModel.create(people, function (err, user) {
            if (err) {
                return next(err)
            } else {
                return res.redirect('/people');
            }
        });
        // res.send('NOT IMPLEMENTED: Author create POST');
    }
};

// Display Author delete form on GET.
exports.people_delete_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

// Handle Author delete on POST.
exports.people_delete_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

// Display Author update form on GET.
exports.people_update_get = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update GET');
};

// Handle Author update on POST.
exports.people_update_post = (req, res) => {
    res.send('NOT IMPLEMENTED: Author update POST');
};

exports.people_Login_get = (req, people, password, done) => {
    peopleModel.findOne({
        username: req.body.uname
    }, (err, peopleModel) => {
        if (err) {
            res.send('error');
        }
        if (!peopleModel) {
            return done(null, false, {
                errMsg: 'User does not exist, please' +
                    ' <a class="errMsg" href="/signup">signup</a>'
            });
        }
        if (!peopleModel.validPassword(password)) {
            return done(null, false, {
                errMsg: 'Invalid password try again'
            });
        }
        return done(null, peopleModel);
    });

};