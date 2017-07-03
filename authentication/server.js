'use strict';

// Constants
const PORT = 8080;
const app = require('./app')
const models = require('./models');
models.waterline.initialize(models.config, function(err, models) {
  if(err) throw err;
  app.models = models.collections;
  app.connections = models.connections;

  app.listen(PORT);
  console.log('Running on http://localhost:' + PORT);
});
