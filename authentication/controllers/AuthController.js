const passport = require('passport');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');

const ExtractJwt = passportJWT.ExtractJwt;
var userController = {};

userController.home = function(req, res) {
  res.render('index', { user: req.user });
}

userController.doRegister = function(req, res) {
  req.app.models.user.create({email: req.body.username, password: req.body.password}).exec(function(err, user) {
      if(err) {
        return res.send(err);
      }

      passport.authenticate('local')(req, res, function() {
        res.send('OK');
      });
  })

};



var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeader();
jwtOptions.secretOrKey = 'asdf';

userController.doLogin = function(req, res) {
  passport.authenticate('local', function(err, user, info) {
      if ((err) || (!user)) {
          return res.status(401).json({message:"unable to authenticate"});
      }
      req.logIn(user, function(err) {
          if (err) res.send(err);
          if(user) {
            var expires = new Date();
            expires.setHours(expires.getHours() + 4);

            var payload = {
              id: user.id,
              exp: Math.trunc(expires.getTime() / 1000)
            };

            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            res.json({
              token: token,
            });
          }
          else {
            res.status(401).json({message:"unable to authenticate"});
          }
      });

  })(req,res);

  /*
  if(req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }
  var query = User.findOne({username: username});

  query.findOne(function(err, user) {
    if(!user) {
      res.status(401).json({mesage:"unable to authenticate"});
    }

    user.authenticate(req.body.password, function(err, user, passwordErr) {
        if(user) {
          var expires = new Date();
          expires.setHours(expires.getHours() + 4);

          var payload = {
            id: user.id,
            exp: expires.getTime() / 1000
          };

          var token = jwt.sign(payload, jwtOptions.secretOrKey);

          res.json({
            token: token,

          });
        }
        else {
          res.status(401).json({message:"unable to authenticate"});
        }
    });

  });*/

}

userController.logout = function(req, res) {
  req.logout();
  res.send('OK');
}

module.exports = userController;
