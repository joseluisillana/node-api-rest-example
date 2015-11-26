var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    favicon         = require('serve-favicon'),
    path            = require('path'),
    expressApiDoc = require('express-api-docs');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});

app.use(router);
