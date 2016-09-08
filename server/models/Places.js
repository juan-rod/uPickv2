var mongoose = require('mongoose');

	var PlacesSchema = mongoose.Schema({
	    name: {type: String, required: true},
	    address: {type: String, required: true, unique: true},
	    phone_number: {type: Number, required: true},
	    rating: {type: String, required: false},
	    location: {type: [Number], required: true}, // [Long, Lat]
	    type: {type: String, required: true},
	    review: {type: String, required: false},
	    website:{type: String, required: false},
	    open:{type:Boolean, required: true}
	});

	var Places = mongoose.model('Places',PlacesSchema);

function createDefaultPlaces() {
	Places.find({}).exec(function(err,collection) {
		if(collection.length === 0) {
			Places.create({name: "Jimmy's Barn", address: "123 JBarn Road", phone_number: "5555555555",rating:"4",location:"Nashville,TN",type:"Burgers",review:"Great!",website:"jimmybarn.com",open:"true"});
			Places.create({name: "Pizza Palace", address: "123 Pizza Lane", phone_number: "5555555555",rating:"4",location:"Austin,TX",type:"Pizza",review:"Good!",website:"",open:"true"});
			Places.create({name: "Qui", address: "123 Qui Qui Blvd", phone_number: "5555555555",rating:"1",location:"NYC, NY",type:"Chinese",review:"Alright!",website:"",open:"false"});
		}
	})
}

exports.createDefaultPlaces = createDefaultPlaces;
