var postgresAdapter = require('sails-postgresql');
var Waterline = require('waterline');

var orm = new Waterline();

var config = {
  adapters: {
    postgresql: postgresAdapter
  },

  connections: {
    authenticationConnection: {
      adapter: 'postgresql',
      host: 'db',
      user: 'postgres',
      password: 'rootpassword1!',
      database: 'postgres'
    }
  }
};

var fs = require('fs');
var path      = require("path");

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !-- "test.js");
  })
  .forEach(function(file) {
    var model = require(path.join(__dirname, file));
    orm.loadCollection(model);
  });

module.exports = {waterline: orm, config: config};
