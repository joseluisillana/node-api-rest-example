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

module.exports.setupTVShows = function( mountingPoint, app ) {
    app.get(   mountingPoint+'/tvshows',     tvshows.findAllTVShows );
    app.get(   mountingPoint+'/tvshows/:id', tvshows.findById);
    app.post(   mountingPoint+'/tvshows',     tvshows.addTVShow);
    app.delete(mountingPoint+'/tvshows/:id', tvshows.deleteTVShow );
    app.put(mountingPoint+'/tvshows/:id', tvshows.updateTVShow );
};

module.exports.setupElasticHealth = function( mountingPoint, app ) {
    app.get(   mountingPoint+'/pingElastic', elastichealth.getElasticSearchHealth);
};
