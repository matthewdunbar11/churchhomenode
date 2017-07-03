var express = require('express');
var router = express.Router();
var paths = require("../controllers/PathsController.js");



// route for status action
router.get('/status', paths.status);

module.exports = router;
