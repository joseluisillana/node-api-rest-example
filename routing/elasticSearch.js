var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    favicon         = require('serve-favicon'),
    path            = require('path'),
    expressApiDoc = require('express-api-docs');


// Example Route
var routerElastic = express.Router();

routerElastic.get('/pingElastic',function(req,res){
  elasticSearchClient.ping({
    requestTimeout: 30000,
    // undocumented params are appended to the query string
    hello: "elasticsearch"
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
      res.status(500).send('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
      res.status(200).send('All is well');
    }
  });
});

app.use(routerElastic);
