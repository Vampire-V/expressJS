const peopleModel = require('../models/people');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




// Display list of all Authors.
exports.people_list = (req, res) => {
    peopleModel.find().find((err, data) => {
        res.send('person list : ' + data);
    });
};

// Handle Author create on POST.
exports.people_create_post = (req, res, next) => {
    peopleModel.find({
            username: req.body.name
        })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                });
            } else {
                const user = new peopleModel({
                    name: req.body.name,
                    username: req.body.username,
                    password: req.body.pass,
                    email: req.body.email,
                    gender: req.body.gender,
                    address: req.body.address,
                    password: hash
                });
                user.save().then(result => {
                        // res.locals.messages = req.flash();
                        res.render('index', {
                            title: 'myApp'
                        });
                        console.log(result);
                        // res.render('index');
                        // res.status(201).json({
                        //     message: user
                        // });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        });
};




exports.people_Login_post = (req, res, next) => {
    peopleModel.findOne({
            username: req.body.uname
        })
        .exec()
        .then(user => {

            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.psw, user.password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    console.log(result);

                    var token = jwt.sign({
                        username: user.username,
                        password: user.password
                    }, 'secret', {
                        expiresIn: "1h"
                    });

                    return res.redirect('/');
                    // return res.status(200).json({
                    //     message: "Auth successful",
                    //     token: token
                    // });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.people_Login_get = (req, res, next) => {
    res.render('Login', {
        title: 'Express'
    });
}

