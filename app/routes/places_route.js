// Dependencies
var mongoose = require('mongoose');
var Place = require('../models/places.js');


// Open app routes
module.exports = function(app){

//   var corsOptions = {
//   origin: 'localhost:3000'
// };

  // GET Routes
  // ---------------------------------------
  // Retrieve records for all places in the db


  app.get('/places', function(req,res){
    // Uses Mongoose schema to run the search (empty conditions)
    var query = Place.find({});
    query.exec(function(err, places){
      
      if(err){
        res.send(err);
      }else{
      // if no errors, responds with JSON of all places
      res.json(places);
    }
    });
  });

  // POST Routes
  // ---------------------------------------
  // Provides a method for saving new places in the db

  app.post('/places', function(req, res){

    // Creates a new place based on the Mongoose schema
    // and add the post to body
var places = Place(req.body);

    var newplace = new Place(req.body);
    console.log("newplace", newplace);
    newplace.save(function(err){
    if(err){
        res.send(err);
      }else{
      // if no errors, responds with JSON of all places
      res.json(places);
    }
    });
  });

  // Retrieves JSON records for all places who meet a certain set of query conditions
app.post('/placesquery', function(req, res){

    // Grab all of the query parameters from the body.
    var lat             = req.body.latitude;
    var long            = req.body.longitude;
    var distance        = req.body.distance;
    var name            = req.body.name;
    // var address         = req.body.address;
    // var phone_number    = req.body.phone_number;
    // var maxRating       = req.body.maxRating;
    // var minRating       = req.body.minRating;
    // var type            = req.body.type;
    // var review          = req.body.review;
    // var webiste         = req.body.webiste;
  

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = Place.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});
    }

   
    if(name){
        query = query.where('name').equals(name);
    }
    
   //  if(address){
   //      query = query.where('address').equals(rating);
   //  }
    
   //  if(phone_number){
   //      query = query.where('phone_number').equals(rating);
   //  }
   // // ...include filter by Max Rating
    // if(maxrating){
    //     query = query.where('rating').gte(maxRating);
    // }

    // // ...include filter by Min Rating
    // if(minRating){
    //     query = query.where('rating').lte(minRating);
    // }

   //  // ...include filter by type
   //  if(type){
   //      query = query.where('type').equals(type);
   //  }

   //  // ...include filter by review
   //  if(review){
   //      query = query.where('review').equals(review);
   //  }

   //  // ...include filter by website
   //  if(webiste){
   //      query = query.where('website').equals(website);
   //  }

    // Execute Query and Return the Query Results
    query.exec(function(err, places){
        if(err)
            res.send(err);

        // If no errors, respond with a JSON of all places that meet the criteria
        res.json(places);
    });
});

/////UPDATE Routes
//-------------------------------------------------
// app.put('/places/:id', function(req, res, next) {  
//     var id = {_id: req.params.id};
//     var update = {name: req.body.name, type: req.body.type};
//     var options = {new: true};

//     Place.findOneAndUpdate(id, update, options, function(err, data){
//         if (err) {
//             res.json(err.message);
//         }
//         else {
//             res.json(data);
//         }
//     });
// });

/////DELETE Routes


//-------------------------------------------------
  app.delete('/places/:id', function(req, res, next) {  

    Place.findOneAndRemove(req.params.id, function(err, data){

        if (err) {
            res.json(err.message);
        }
        // else if (data.length===0) {
        //     res.json({message: 'An item with that id does not exist in this database.'});
        // }
        else {
            res.json({message: 'Success. Item deleted.'});
        }
    });
});





};