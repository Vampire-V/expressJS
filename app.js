const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const validator = require('express-validator');
const User = require('./models/people');
const csrf = require('csurf');
const LocalStrategy = require('passport-local').Strategy;

const mongoDB = 'mongodb://pipat1234:pipat1234@ds257838.mlab.com:57838/mydb';

var index = require('./routes/index');
var users = require('./routes/users');

const app = express();

mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('connected', console.error.bind(console, 'MongoDB connection'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// require('./config/passport');
//config
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function (req, username, password, done) {
  console.log("ลงทะเบียน");
 
  User.findOne({'username': username}, function (err, user) {
    console.log("ค้นหา");
    
      if (err) {
        console.log("Error");
        
          return done(err);
      }
      if (user) {
        console.log("ไม่ Error");
          return done(null, false, {message: 'Username is already in use.'});
      }
      var newUser = new User();
      newUser.username = username;
      newUser.password = newUser.encryptPassword(password);
      newUser.name = req.body.name;
      newUser.email = req.body.email;
      newUser.address = req.body.address;
      newUser.gender = req.body.gender;
      console.log("กำลังบันทึก");
      
      newUser.save(function(err, result) {
        console.log("กำลังบันทึก2");
        console.log(newUser);
        // console.log(req.body);
        
         if (err) {
          console.log("กำลังบันทึก Error");
             return done(err);
         }
         console.log("บันทึก success");
         return done(null, newUser);
      });
  });
}));


passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, username, password, done) {
  console.log("aaaaaaaaaa");
  
  User.findOne({'username': username}, function (err, user) {
    console.log("ค้นหา");
    
      if (err) {
        console.log("เออเรอ");
          return done(err);
      }
      if (!user) {
        console.log("ไม่มี");
          return done(null, false, {message: 'No user found.'});
      }
      if (!user.validPassword(password)) {
        console.log("พาสไม่ถูก");
          return done(null, false, {message: 'Wrong password.'});
      }
      console.log("เจอ");
      return done(null, user);
  });
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  //เช็คการเข้าใช้งาน
  res.locals.login = req.isAuthenticated();
  console.log(res.locals.login);
  
  next();
});

//  Connect all our routes to our application
app.use('/', index);
app.use('/', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;