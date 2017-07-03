'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
// App
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  var header = req.header('Authorization');
  if(typeof header != 'undefined') {
    var token = header.split(" ")[1];
  }
  else {
    var token = null;
  }
  var decoded = jwt.verify(token, 'asdf', function(err, decoded) {
    if(typeof decoded != 'undefined' && decoded.hasOwnProperty('id')) {
      req.userId = decoded.id;
    }
    else {
      req.userId = null;
    }

    next();
  });


});

app.use('/questions', require('./routes'));

app.get('/', function (req, res) {
  res.send('Hello world\n');
});

module.exports = app;
