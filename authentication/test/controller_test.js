module.exports = function(app, controllerName) {
  var controller = require('../controllers/' + controllerName);

  return {
    controller: controller,
    method: function(methodName, body, callback) {
      controller[methodName]({
        body: body,
        app: app
      }, {
        json: function(obj) {
          callback({
            send: null,
            json: obj,
            status: null
          });
        },
        send: function(obj) {
          callback({
            send: obj,
            json: null,
            status: null
          });
        },
        status: function(obj) {
          callback({
            send: null,
            json: null,
            status: obj
          })
        }
      });
    }

  };
}
