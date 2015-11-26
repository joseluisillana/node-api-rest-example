// Example Route
var router = express.Router();
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
