app.factory('foodFactory', function($rootScope, $http, placesFactory){

// Variables
//---------------------------------

	// Service to return
	var gMapService ={}

	// Array of locations obtained from API calls
  var locations = [];

	// Selected location (initialize to center of USA)
  var selectedLat = 39.50;
  var selectedLong = -98.35;

     // Handling clicks and location selection
  gMapService.clickLat = 0;
  gMapService.cleickLong = 0;

	// google map variables
	var map;
	var infowindow;
  var marker;

	//initFoodMap variables
	var userLatLng;
	var allPlacesID = [];
	var allDetailsList = [];
  var markers = [];

  var placeList = [];


  // Functions
  // -----------------------------------------------
  // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results))
    gMapService.refresh  = function(latitude, longitude, filteredResults){

        // Clears the holding array of locations
        locations = [];

        // Set the selected lat and long equal to the ones provided on the refresh() call
        selectedLat = parseFloat(latitude);
        selectedLong = parseFloat(longitude);

        // console.log("selectedLat:" , selectedLat);
        // console.log("selectedLong:" , selectedLong);

         initMap(latitude, longitude, false);
         initPlacesMap(latitude, longitude, false);


    }; // end gMapService.refresh()


	var initMap = function(latitude, longitude){

    var customMapType = new google.maps.StyledMapType([{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}], {
      name: 'Custom Style'
  });
	 	// Uses the selected lat, long as starting point
		  userLatLng = new google.maps.LatLng(latitude, longitude);
    var customMapTypeId = 'custom_style';
      //init map
  		map = new google.maps.Map(document.getElementById('map'), {
   			 center: {lat: parseFloat(latitude), lng: parseFloat(longitude)},
    			zoom: 15,
          mapTypeControlOptions: {
          mapTypeIds: [google.maps.MapTypeId.ROADMAP, customMapTypeId]
         }
 			 });

      map.mapTypes.set(customMapTypeId, customMapType);
  map.setMapTypeId(customMapTypeId);
      // content in InfoWindow
      var contentString ='<h3> You are here! </h3>';
      //user InfoWindow
      var infowindow = new google.maps.InfoWindow({
          content: contentString
      });

      //set user location marker
      var marker = new google.maps.Marker({
          position: userLatLng,
          animation: google.maps.Animation.DROP,
          map: map,
          icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      })

      lastMarker = marker;

      //marker click listener
      marker.addListener('click', function() {
      infowindow.open(map, marker);
      });

      // Function for moving to a selected location
      map.panTo(new google.maps.LatLng(latitude, longitude));

      // Clicking on the Map moves the bouncing red marker
        google.maps.event.addListener(map, 'click', function(e){
          console.log("new marker location",e.latLng);
            var marker = new google.maps.Marker({
                position: e.latLng,
                animation: google.maps.Animation.Drop,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
               
            });

      // When a new spot is selected, delete the old red bouncing marker
        if(lastMarker){
            lastMarker.setMap(null);
        }

      // Create a new red bouncing marker and move to it
        lastMarker = marker;
        map.panTo(marker.position)

        newMarkerLat = map.center.lat();
        newMarkerLong = map.center.lng();
        console.log("newMarkerLat", newMarkerLat);
        console.log("newMarkerLong", newMarkerLong);
        gMapService.refresh(newMarkerLat, newMarkerLong);

            // Update Broadcasted Variable (lets the panels know to change their lat, long values)
            gMapService.clickLat = marker.getPosition().lat();
            gMapService.clickLong = marker.getPosition().lng();
            $rootScope.$broadcast("clicked");
        }) // end map move red marker function

    };

    var initPlacesMap = function(latitude,longitude){
      userLatLng = new google.maps.LatLng(latitude, longitude);
      // use google places api
        var service = new google.maps.places.PlacesService(map);

        // search for nearby places
            service.nearbySearch({
              location: userLatLng,
              radius: 1000,
              types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
              }, callback);

                function callback(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var placeID = results[i].place_id;
                        //send to functions
                          createMarker(results[i]);
                        getPlacesDetailInfo(placeID);
                      }
                  };
                }
                

                function createMarker(place) {
                  var placeLoc = place.geometry.location;
                  var marker = new google.maps.Marker({
                      map: map,
                      position: placeLoc,
                      animation: google.maps.Animation.DROP,
                      icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    });

                  var contentString = 
                     '<div><h5>' + place.name +'</h5></div>'+
                     '<div><h6>' + place.vicinity +'</h6></div>';

                  //user InfoWindow
                  var infowindow = new google.maps.InfoWindow({
                    content: contentString
                   });
                  google.maps.event.addListener(marker, 'click', 
                    function() {
                          infowindow.open(map, this);
                        });

                } // end createMarker()
        }; // end initPlacesMap()

            function getPlacesDetailInfo(placeID, place){
              var service = new google.maps.places.PlacesService(map);
              var request = { placeId: placeID};
              var placeData = {};


                  service.getDetails(request, function(details, status) {
                      
                    var formatted = details.formatted_phone_number;
                    var unformatted = formatted.replace(/[- )(]/g,'');

                if(gMapService.clickLat === 0){

                    var lat = details.geometry.location.lat();
                    var lng = details.geometry.location.lng();
                    var parseLat = parseFloat(lat).toFixed(3);
                    var parseLng = parseFloat(lng).toFixed(3);
                    console.log("if", parseLat, parseLng);
                    
               
                    var placeData = {
                        name: details.name,
                        address: details.formatted_address,
                        phone_number: unformatted,
                        rating: details.rating,
                        location: [parseLng,parseLat],
                        type: details.types[1],
                        review: details.reviews[1].text,
                        website: details.website,
                        open: details.opening_hours.open_now   
                } ;

              // Saves the user data to the db
                $http.post('/places', placeData)
                    .success(function (data) {
                      // gMapService.getPlaces();
                     console.log("got it!", data);
                    
                     
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    }); 
                      // rerun getPlaces() in MainCtrl.js
                    $rootScope.$broadcast("rerun");

                } else {
                  
                    var lat = gMapService.clickLat;
                    var lng = gMapService.clickLong;
                    
                    var parseLat = parseFloat(lat).toFixed(3);
                    var parseLng = parseFloat(lng).toFixed(3);
                      console.log("else", parseLat);
                   
               
                    var placeData = {
                        name: details.name,
                        address: details.formatted_address,
                        phone_number: unformatted,
                        rating: details.rating,
                        location: [parseLng,parseLat],
                        type: details.types[1],
                        review: details.reviews[1].text,
                        website: details.website,
                        open: details.opening_hours.open_now   
                } ;

              // Saves the user data to the db
                $http.post('/places', placeData)
                    .success(function (data) {
                      // gMapService.getPlaces();
                     console.log("got it!", data);
                     
                    })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    }); 

                     // rerun getPlaces() in MainCtrl.js
                    $rootScope.$broadcast("newPlaces");
                  } // end of else{}              
              }) // end service.getDetails()  
            }; //end getPlacesDetailInfo()
  
            // };

    // var queryPlace = function(){

    //     // Assemble Query Body
    //     queryBody = {
    //         longitude: parseFloat($scope.formData.longitude),
    //         latitude: parseFloat($scope.formData.latitude),
    //         distance: parseFloat($scope.formData.distance),
    //         male: $scope.formData.male,
    //         female: $scope.formData.female,
    //         other: $scope.formData.other,
    //         minAge: $scope.formData.minage,
    //         maxAge: $scope.formData.maxage,
    //         favlang: $scope.formData.favlang,
    //         reqVerified: $scope.formData.verified
    //     };

    //     // Post the queryBody to the /query POST route to retrieve the filtered results
    //     $http.post('/placesquery', queryBody)

    //         // Store the filtered results in queryResults
    //         .success(function(queryResults){

    //             // Pass the filtered results to the Google Map Service and refresh the map
    //             gservice.refresh(queryBody.latitude, queryBody.longitude, queryResults);

    //             // Count the number of records retrieved for the panel-footer
    //             $scope.queryCount = queryResults.length;
    //         })
    //         .error(function(queryResults){
    //             console.log('Error ' + queryResults);
    //         })
    // };
    

	return gMapService;

}); //end factory

   