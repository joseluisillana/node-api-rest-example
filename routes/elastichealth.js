/**!
 * Collection of functions for dealing with elastic search cluster's health
 */

/**
 * Retrieves information by doing a ping to the cluster
 *
 * Examples:
 *
 *    GET /pingElastic
 *
 * Response:
 *
 * Returns information about the action.
 *
 * Errors:
 *  - `500` if it can't be possible to do the ping.
 *
 * Error Response:
 *
 * @param The standard HTTP request object
 * @param The standard HTTP response object
 */
exports.getElasticSearchHealth = function(req, res){

  // The elasticsearch component
  var elasticsearch = require("elasticsearch");
  // The elasticsearch client
  var elasticSearchClient = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

  elasticSearchClient.ping({
    requestTimeout: 30000,
    // undocumented params are appended to the query string
    hello: "elasticsearch"
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
      res.status(500).send('elasticsearch cluster is down!');
    } else {
      console.log('M.I.K.E - All is well');
      res.status(200).send('All is well');
    }
  });
};
