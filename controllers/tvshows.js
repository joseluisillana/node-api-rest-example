

//GET - Return all tvshows in the DB
exports.findAllTVShows = function(req, res){
  var mongoose = require('mongoose');
  var TVShow = mongoose.model('TVShow');
  TVShow.find(function(err, tvshows){
    if(err){
      res.send(500, err.message);
    }else{
      console.log('M.I.K.E - GET ' + req.url);
      res.status(200).jsonp(tvshows);
    }
  });
};


//GET - Return the tvshows with specified Id
exports.findById = function(req, res){
  var mongoose = require('mongoose');
  var TVShow = mongoose.model('TVShow');
  TVShow.findById(req.params.id, function(err, tvshow){
    if(err){
      res.send(500, err.message);
    }else{
      console.log('M.I.K.E - GET ' + req.url + req.params.id);
      res.status(200).jsonp(tvshow);
    }
  });
};

//POST - Insert a new TVShow in the DB
exports.addTVShow = function(req, res){
  var mongoose = require('mongoose');
  var TVShow = mongoose.model('TVShow');
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

//PUT - Update a TVShow in the DB
exports.updateTVShow = function(req, res){
  var mongoose = require('mongoose');
  var TVShow = mongoose.model('TVShow');
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

//DELETE - Delete a TVShow specified in the DB
exports.deleteTVShow = function(req, res){
  var mongoose = require('mongoose');
  var TVShow = mongoose.model('TVShow');
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
