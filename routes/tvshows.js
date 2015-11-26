/**!
 * Collection of functions for dealing with tvshows collection stored on MongoDB
 */
 var mongoose = require('mongoose');
 var TVShow = mongoose.model('TVShow');
/**
 * Retrieves All TVShows in the Database
 *
 * Examples:
 *
 *    GET /tvshows
 *
 * Response:
 *
 * Returns the data associated with a tvshows as an object, as in:
 *
 *     {
 *        _id:"565490baaaa20bd929000001",
 *        year:2004,
 *        country:"USA",
 *        poster:"http://ia.media-imdb.com/image_.jpg",
 *        seasons:1,
 *        genre:"Sci-Fi",
 *        summary:"The survivors of a plane crash are forced to live with each other on a remote island...",
 *        __v:0
 *     }
 *
 * Errors:
 *  - `500` with a database error
 *
 * Error Response:
 *
 * @param The standard HTTP request object
 * @param The standard HTTP response object
 */
 exports.findAllTVShows = function(req, res){
   TVShow.find(function(err, tvshows){
     if(err){
       res.send(500, err.message);
     }else{
       console.log('M.I.K.E - GET /tvshows');
       res.status(200).jsonp(tvshows);
     }
   });
 };

 /**
  * Retrieves a TVShow with specified ID in the Database
  *
  * Examples:
  *
  *    GET /tvshows/:id
  *
  * Response:
  *
  * Returns the data associated with a tvshow as an object, as in:
  *
  *     {
  *        _id:"565490baaaa20bd929000001",
  *        year:2004,
  *        country:"USA",
  *        poster:"http://ia.media-imdb.com/image_.jpg",
  *        seasons:1,
  *        genre:"Sci-Fi",
  *        summary:"The survivors of a plane crash are forced to live with each other on a remote island...",
  *        __v:0
  *     }
  *
  * Errors:
  *  - `500` with a database error
  *
  * Error Response:
  *
  * @param The standard HTTP request object
  * @param The standard HTTP response object
  */
 exports.findById = function(req, res){
   TVShow.findById(req.params.id, function(err, tvshow){
     if(err){
       res.send(500, err.message);
     }else{
       console.log('M.I.K.E - GET /tvshow/' + req.params.id);
       res.status(200).jsonp(tvshow);
     }
   });
 };

/**
 * Creates a TVShow via a `POST` call.
 * If the status code is not given, 200 is assumed.
 * Examples:
 *
 *    POST /tvshows/
 *
 * Body:
 *
 * The body of the `POST` call should contain a user's account as a JSON
 * document, as in:
 *
 *     {
 *       "title": "LOST",
 *        "year": 2004,
 *        "country": "USA",
 *        "poster": "http://ia.media-imdb.com/image.jpg",
 *        "seasons": 6,
 *        "genre": "Sci-Fi",
 *        "summary": "The survivors of a plane ...."
 *     }
 *
 * Response:
 *
 *  Returns the added TVShow's information with an additional `id`
 *  value.
 *
 * Errors:
 *
 *  - `500` with a database error
 *
 * @param request The standard http request
 * @param response The standard http response
 */
 exports.addTVShow = function(req, res){
   console.log('M.I.K.E - POST');
   console.log(req.body);

   var tvshow = new TVShow({
     title: req.body.title,
     year: req.body.year,
     country: req.body.country,
     poster: req.body.poster,
     seasons: req.body.seasons,
     genre: req.body.genre,
     summary: req.body.summary
   });

   tvshow.save(function(err,tvshow){
     if (err){
       console.log('M.I.K.E - ERROR Saving on DB');
       return res.status(500).send(err.message);
     }else{
       console.log('M.I.K.E - OK Saving on DB');
       res.status(200).jsonp(tvshow);
     }
   });
 };

/**
 * Deletes a TVShow's information. Similar to the `GET` request, either
 * the ID value must be specified.
 *
 * Examples:
 *
 *    DELETE /tvshows/23857202328382
 *
 * Response:
 *
 *  Returns the TVShow information associated with the document that was
 *  successfully deleted.
 *
 * Errors:
 *
 *  - `500` with a database error
 *
 * @param request The standard http request
 * @param response The standard http response
 */
exports.deleteTVShow = function(req, res){
   TVShow.findById(req.params.id, function(err, tvshow){
     tvshow.remove(function(err){
       if (err){
         return res.status(500).send(err.message);
       }else{
         res.status(200).send();
       }
     })
   });
 };

/**
 * Updates a TVShow's information. Similar to the `GET` request,
 * the TVShow is referenced by an ID value.
 *
 * Examples:
 *
 *    PUT /tvshows/23857202328382
 *
 * Body:
 *
 * The body of the `PUT` should contain updated values for the user's
 * account as a JSON document, as in:
 *
 *     {
 *       "title": "LOST",
 *        "year": 2004,
 *        "country": "USA",
 *        "poster": "http://ia.media-imdb.com/image.jpg",
 *        "seasons": 6,
 *        "genre": "Sci-Fi",
 *        "summary": "The survivors of a plane ...."
 *     }
 *
 * Notice that all the information must be given, not just updated
 * values.
 *
 * Response:
 *
 * Returns the added TVShow's information with an additional `id` value.
 *
 * Errors:
 *  - `500` with a database error.
 *
 * @param request The standard http request
 * @param response The standard http response
 */
 exports.updateTVShow = function(req, res){
   TVShow.findById(req.params.id, function(err, tvshow){
     console.log("M.I.K.E - Updating : " + req.params.id + " with title: " + tvshow.title);
     console.log("M.I.K.E - New Data: " + req.body);
     tvshow.title = req.body.title;
     tvshow.year = req.body.year;
     tvshow.country = req.body.country;
     tvshow.poster = req.body.poster;
     tvshow.seasons = req.body.seasons;
     tvshow.genre = req.body.genre;
     tvshow.summary = req.body.summary;

     tvshow.save(function(err){
       if (err){
         console.log("M.I.K.E - ERROR Updating : " + req.params.id);
         return res.status(500).send(err.message);
       }else{
         console.log("M.I.K.E - OK Updating : " + req.params.id);
         res.status(200).jsonp(tvshow);
       }
     });

   });
 };
