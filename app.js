var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    favicon         = require('serve-favicon'),
    path            = require('path'),
    expressApiDoc = require('express-api-docs');

var logger = require('morgan');
var cookieParser = require('cookie-parser');

// The elasticsearch component
var elasticsearch = require("elasticsearch");
// The elasticsearch client
var elasticSearchClient = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

// Connection to DB
mongoose.connect('mongodb://10.211.55.112:27017/tvshows', function(err, res) {
  /*
  Connection ready state
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
  */
  var connectionStatus = mongoose.connection.readyState;

  if(err){
    console.log("Error connecting to the database.");
    throw err;
  } else if (connectionStatus > 0 && connectionStatus < 3){
    console.log('Connected to the Database');
  }else {
    console.log("Not connected to the database");
  }
});


// Favicon, Logging and cookies control
//app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(favicon(__dirname + '/public/favicon.ico'));

// Logging para peticiones, interceptación de metodos
app.use(logger('dev'));

// Parseo de cookies
app.use(cookieParser());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/tvshow')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

// Momento para meter los enrutamientos por separado
/*var elasticsearch_routes = require('./routing/elasticSearch');
var misc_routes = require('./routing/misc');
var mongodb_routes = require('./routing/mongodb');
*/


// Example Route
/*var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});

router.get('/pingElastic',function(req,res){
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

app.use(router);*/

//// API routes
var router = express.Router();
var routesTVShow = require('./router');
routesTVShow.setupTVShows('/api',app);

// Start server
app.listen(3000, function() {
  var connectionStatus = mongoose.connection.readyState;
  if(connectionStatus > 1 && connectionStatus < 3){
    console.log("M.I.K.E - Monitoring IT Key Engine\nAPI RESTful.");
    console.log("WARNING - Running without connection to MongoDB.\nURL: http://localhost:3000");
  } else {
    console.log("M.I.K.E - Monitoring IT Key Engine\nAPI RESTful.");
    console.log("Node server running.\nURL: http://localhost:3000");
  }
});
