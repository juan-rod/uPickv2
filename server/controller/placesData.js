var Places = require('mongoose').model('Places');
	

exports.getPlaces = function(req,res) {
	Places.find({}).exec(function(err,collection) {
		res.send(collection);
	})
};
exports.postPlaces = function(req,res){
	var places = new Places(req.body);
	// var newPlaces = new Places(req.body);
	 console.log("places in placesData.js :", places);
    places.save(function(err){
    if(err){
        res.send(err);
      }else{
      // if no errors, responds with JSON of all places
      res.json(places);
    }
    });
}
exports.deletePlaces = function(req,res){
    Places.deleteMany({},function(err,results){
      if(err){
        res.send(err);
      }else{
        res.json(results);
      }
    })
}
