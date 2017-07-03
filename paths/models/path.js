var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pathSchema = new Schema({
  prompt:  String,
  answers: [{ text: String }]
});


let path = mongoose.model('Path', pathSchema);

module.exports = path;
