/**
 * Routes all API requests to particular functions.
 * This file would be referenced by the `app.js` file, as:
 *
 *      var app    = express.createServer();
 *      var routes = require('./router');
 *
 * And called:
 *
 *      routes.setup(app);
 */
var tvshows = require('./routes/tvshows');
var elastichealth = require('./routes/elastichealth');
var index = require('./routes/index');

module.exports.setupTVShows = function( app ) {
    app.get( '/tvshows',     tvshows.findAllTVShows );
    app.get( '/tvshows/:id', tvshows.findById);
    app.post( '/tvshows',     tvshows.addTVShow);
    app.delete('/tvshows/:id', tvshows.deleteTVShow );
    app.put('/tvshows/:id', tvshows.updateTVShow );
};

module.exports.setupElasticHealth = function( app ) {
    app.get(   '/pingElastic', elastichealth.getElasticSearchHealth);
};

module.exports.setupIndex = function(app){
  app.get( '/',            index.index );
};
