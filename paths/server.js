'use strict';

// Constants
const PORT = 8070;
const app = require('./app')

const mongoose = require('mongoose');
mongoose.connect('mongodb://questions_db/questions');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  app.listen(PORT);
  console.log('Running on http://localhost:' + PORT);
});
