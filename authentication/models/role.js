var Waterline = require('waterline');
var bcrypt = require('bcrypt');

var Role = Waterline.Collection.extend({
  identity: 'role',
  connection: 'authenticationConnection',

  attributes: {

    name: {
      type: 'string',
      required: true,
    },

    siteId: {
      type: 'integer',
      required: true
    },

    toJSON: function() {
      var obj = this.toObject();
      return obj;
    }
  },
});

module.exports = Role;
