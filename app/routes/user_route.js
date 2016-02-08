// Dependencies
var mongoose = require('mongoose');
var User = require('../models/users.js');


// Open app routes
module.exports = function(app){


  // GET Routes
  // ---------------------------------------
  // Retrieve records for all users in the db

  app.get('/users', function(req,res){
    // Uses Mongoose schema to run the search (empty conditions)
    var query = User.find({});
    query.exec(function(err, users){
      
      if(err){
        res.send(err);
      }else{
      // if no errors, responds with JSON of all users
      res.json(users);
    }
    });
  });

  // POST Routes
  // ---------------------------------------
  // Provides a method for saving new users in the db

  app.post('/users', function(req, res){

    // Creates a new user based on the Mongoose schema
    // and add the post to body

    var newuser = new User(req.body);
    console.log("newuser", newuser);
    newuser.save(function(err){
    if(err){
        res.send(err);
      }else{
      // if no errors, responds with JSON of all users
      res.json(users);
    }
    });
  });

  // Retrieves JSON records for all users who meet a certain set of query conditions
app.post('/query/', function(req, res){

    // Grab all of the query parameters from the body.
    var lat             = req.body.latitude;
    var long            = req.body.longitude;
    var distance        = req.body.distance;
    var male            = req.body.male;
    var female          = req.body.female;
    var other           = req.body.other;
    var minAge          = req.body.minAge;
    var maxAge          = req.body.maxAge;
    var favFood         = req.body.favFood;
    var reqVerified     = req.body.reqVerified;

    // Opens a generic Mongoose Query. Depending on the post body we will...
    var query = User.find({});

    // ...include filter by Max Distance (converting miles to meters)
    if(distance){

        // Using MongoDB's geospatial querying features. (Note how coordinates are set [long, lat]
        query = query.where('location').near({ center: {type: 'Point', coordinates: [long, lat]},

            // Converting meters to miles. Specifying spherical geometry (for globe)
            maxDistance: distance * 1609.34, spherical: true});
    }

    // ...include filter by Gender (all options)
    if(male || female || other){
        query.or([{ 'gender': male }, { 'gender': female }, {'gender': other}]);
    }

    // ...include filter by Min Age
    if(minAge){
        query = query.where('age').gte(minAge);
    }

    // ...include filter by Max Age
    if(maxAge){
        query = query.where('age').lte(maxAge);
    }

    // ...include filter by Favorite Food
    if(favFood){
        query = query.where('favfood').equals(favFood);
    }

    // ...include filter for HTML5 Verified Locations
    if(reqVerified){
        query = query.where('htmlverified').equals("Sweet!");
    }

    // Execute Query and Return the Query Results
    query.exec(function(err, users){
        if(err)
            res.send(err);

        // If no errors, respond with a JSON of all users that meet the criteria
        res.json(users);
    });
});

};