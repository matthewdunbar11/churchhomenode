'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const passport = require('passport')
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const jwtParser = require('./middleware/jwt_parser');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findOne({ id: id } , function (err, user) {
        done(err, user);
    });
});


passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    req.app.models.user.findOne({ email: email }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      bcrypt.compare(password, user.password, function (err, res) {
          if (!res)
            return done(null, false, {
              message: 'Invalid Password'
            });
          var returnUser = {
            email: user.email,
            createdAt: user.createdAt,
            id: user.id
          };
          return done(null, returnUser, {
            message: 'Logged In Successfully'
          });
        });
    });
  }
));


// Constants
const PORT = 8080;

// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jwtParser);
app.use(passport.initialize());
app.use(passport.session());
app.use('/', require('./routes'));

const User = require('./models/user');

var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'asdf';

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findOne({ email: email }, function (err, user) {
    var user = User.find({id: jwt_payload.id});
    if(user) {
      next(null, user);
    }
    else {
      next(null, false);
    }
  });

}));

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

module.exports = app;
