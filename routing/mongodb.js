var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    favicon         = require('serve-favicon'),
    path            = require('path'),
    expressApiDoc = require('express-api-docs');

// API routes
var routerTable = express.Router();

// Endpoints to ask mongodb
routerTable.route('/tvshows')
  .get(TVShowCtrl.findAllTVShows)
  .post(TVShowCtrl.addTVShow);

routerTable.route('/tvshows/:id')
  .get(TVShowCtrl.findById)
  .put(TVShowCtrl.updateTVShow)
  .delete(TVShowCtrl.deleteTVShow);

// Endpoints to ask ElasticSearch


// Add the routing table
app.use('/api', routerTable);
