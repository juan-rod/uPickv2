var placesData = require('../controller/placesData'),
	mongoose = require('mongoose'),
	Places = mongoose.model('Places');

module.exports = function(app){
	app.get('/places',placesData.getPlaces);
	app.post('/places',placesData.postPlaces);
	app.delete('/places',placesData.deletePlaces);


	app.get('public/partials/:partialPath', function(req,res){
		res.render('partials/'+ req.params.partialPath);
	});

	app.get('/', function(req, res){
		res.render('index.html');
	});
}