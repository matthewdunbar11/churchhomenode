

const models = require('../models/test');

if(typeof(app) == 'undefined') {
  var app = {};




  before(function(next) {
    models.waterline.initialize(models.config, function(err, models) {
      if(global.models == null) {
        global.models = models;
      }

      app.models = global.models.collections;
      app.connections = global.models.connections;

      next();
    });

  });
}

beforeEach((next) => {
  let destroyCount = 0;

  Object.keys(app.models).forEach(function(key) {
      destroyCount++;
      app.models[key].destroy().exec(function() {
        destroyCount--;
        if(destroyCount == 0) {
          next();
        }
      })

  });

});


module.exports = { app: app };
