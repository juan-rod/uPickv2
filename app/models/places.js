// Pulls Mongoose dependency for creating schemas
var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

// Creates a Places Schema. This will be the basis of how user data is stored in the db
var PlacesSchema = new Schema({
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

// Indexes this schema in 2dsphere format (critical for running proximity searches)
PlacesSchema.index({location: '2dsphere'});

// Exports the PlacesSchema for use elsewhere. 
module.exports = mongoose.model('PlacesSchema', PlacesSchema);
