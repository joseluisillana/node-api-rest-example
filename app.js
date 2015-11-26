var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

var logger = require('morgan');
var cookieParser = require('cookie-parser');

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
    console.log('Connected to Database');
  }else {
    console.log("Not connected to the database");
  }
});

// Favicon, Logging and cookies control
//app.use(favicon());
app.use(logger('dev'));
app.use(cookieParser());

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models     = require('./models/tvshow')(app, mongoose);
var TVShowCtrl = require('./controllers/tvshows');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
});
app.use(router);

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
