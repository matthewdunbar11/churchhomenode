const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
var userController = {};

userController.home = function(req, res) {
  res.render('index', { user: req.user });
}

userController.doRegister = function(req, res) {
  User.register(new User({ username: req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.send(err);
    }

    passport.authenticate('local')(req, res, function() {
      res.send('OK');
    })
  });
};



var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'asdf';

userController.doLogin = function(req, res) {
  if(req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }

  var user = User.find({username: username});
  if(!user) {
    res.status(401).json({mesage:"user not found"});
  }
  console.log(user[0].password);
  console.log(req.body.password);
  if(user[0].password === req.body.password) {
    var payload = {id: user[0].id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({message: "ok", token: token});
  }
  else {
    res.status(401).json({mesage:"unable to authenticate"});
  }
}
/*userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function() {
    res.send('OK');
  });
}
*/
userController.logout = function(req, res) {
  req.logout();
  res.send('OK');
}

module.exports = userController;
