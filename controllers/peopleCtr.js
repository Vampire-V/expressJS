const peopleModel = require('../models/people');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.people_register_get = (req, res, next) => {
    res.render('register',{title:'Express'});
    // res.render('index',{title:'Express'});
};


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
                bcrypt.hash(req.body.pass, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
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

exports.people_Login_get = (req,res,next) => {
    res.render('Login',{title:'Express'});
}



// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const peopleModel = require('../models/people');


// router.post("/login", (req, res, next) => {
//     peopleModel.find({
//             email: req.body.email
//         })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(401).json({
//                     message: "Auth failed"
//                 });
//             }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                 if (err) {
//                     return res.status(401).json({
//                         message: "Auth failed"
//                     });
//                 }
//                 if (result) {
//                     const token = jwt.sign({
//                             email: user[0].email,
//                             userId: user[0]._id
//                         },
//                         process.env.JWT_KEY, {
//                             expiresIn: "1h"
//                         }
//                     );
//                     return res.status(200).json({
//                         message: "Auth successful",
//                         token: token
//                     });
//                 }
//                 res.status(401).json({
//                     message: "Auth failed"
//                 });
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// router.delete("/:userId", (req, res, next) => {
//     peopleModel.remove({
//             _id: req.params.userId
//         })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "User deleted"
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });

// module.exports = router;