app.factory('mapFactory', function($rootScope, $http, customMapFactory, placesDetailFactory){

// Service to return
var gMapService ={}

// Array of locations obtained from API calls
var locations = [];

 // Handling clicks and location selection
gMapService.clickLat = 0;
gMapService.cleickLong = 0;

// google map variables
var infowindow,
	map = mapInit();

//initRestaurantMap variables
var userLatLng,
	lat = [],
	lng = [],
	customMapTypeId = 'custom_style',
	customMapFactory = customMapFactory.customMapType(),
	placesMarkers = [],
	placeIDs = [],
	placeData = {},
	placesDataArray = [];

    gMapService.refresh  = function(latitude, longitude, filteredResults){  
        lat.push(latitude);
        lng.push(longitude);
        placeIDs = [];
		userLatLng = new google.maps.LatLng(lat, lng);

        initMap(userLatLng);
        initPlacesMap(userLatLng);
    }; 

	var initMap = function(userLatLng){
		mapInit();
 		map.mapTypes.set(customMapTypeId, customMapFactory);
  		map.setMapTypeId(customMapTypeId);
		initMapMarker(userLatLng, map);
	};

	 var initPlacesMap = function(userLatLng){
        var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: userLatLng,
              radius: 1000,
              types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
              }, callback);

                function callback(results, status) {
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                    	var nearbyRestaurants = results[i];
                        var placeID = results[i].place_id;                        	
                        	placeIDs.push(placeID);                        	
                        	setPlacesMarker(nearbyRestaurants);
                      }
                        	getPlacesDetailInfo();
                  };
                }
	 };
///////////////////////////////////////////////////////////////////////////////////
	function mapInit(){
		map = new google.maps.Map(document.getElementById('map'), {
   			center: {
   				lat: parseFloat(lat), 
   				lng: parseFloat(lng)
   			},
    		zoom: 15,
          	mapTypeControlOptions: {
          		mapTypeIds: [
          			google.maps.MapTypeId.ROADMAP, 
          			customMapTypeId
          		]
         	}
 		});
	};


	function initMapMarker(userLatLng, map){
		var marker = new google.maps.Marker({
		  position: userLatLng,
		  animation: google.maps.Animation.DROP,
		  map: map,
		  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
		});
			markerInfo(marker, lat, lng);
			lastMarker = marker;

			newMarkerLocation(lastMarker,map);
			
	};

	function newMarkerLocation(lastMarker, map){
		console.log("newMarkerLocation:", lat, lng);

			// Function for moving to a selected location
			map.panTo(new google.maps.LatLng(lat, lng));

      		// Clicking on the Map moves the bouncing red marker
	    	google.maps.event.addListener(map, 'click', function(e){
		        var marker = new google.maps.Marker({
		            position: e.latLng,
		            animation: google.maps.Animation.Drop,
		            map: map,
		            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'	          	 
		        });
			        // When a new spot is selected, delete the old red bouncing marker & reload placesMarkers 
					if(lastMarker){
						lastMarker.setMap(null);
						reloadPlacesMarkers();
					}
					// Create a new red bouncing marker and move to it
					lastMarker = marker;
					map.panTo(lastMarker.position)

					var newUserLatLng = lastMarker.position;
					newLat = map.center.lat();
					newLng = map.center.lng();

					markerInfo(lastMarker,newLat, newLng);
					initPlacesMap(newUserLatLng);
					//getPlacesDetailInfo(placeIDs);
	        });
	};

	function markerInfo(marker, lat, lng){
		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
		var contentString ='<h3> lat:'+lat+' & lng:'+lng+' </h3>';
		var infowindow = new google.maps.InfoWindow({
		  content: contentString
		});
	};

	function setPlacesMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: placeLoc,
			animation: google.maps.Animation.DROP,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		});
			placesMarkers.push(marker);
			placesInfoWindow(marker, place);
	};

	function reloadPlacesMarkers() {
	    for (var i=0; i<placesMarkers.length; i++) {
	        placesMarkers[i].setMap(null);
	    }
	    placesMarkers = []; 
	    placeIDs = []; 
	};


	function placesInfoWindow(marker, place){
		marker.addListener('click',function() {
			infowindow.open(map, this);
		});
		var contentString = '<div><h5>' + place.name +'</h5></div>'+
							'<div><h6>' + place.vicinity +'</h6></div>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});	
	}

	function getPlacesDetailInfo(){
		var service = new google.maps.places.PlacesService(map);
			//console.log("placeIDs:", placeIDs);
		for (var i = 0; i < placeIDs.length; i++) {
			var placeID = placeIDs[i];
				//console.log("placeID in the getPlacesDetailInfo fnc :", placeID);
			var request = { placeId: placeID};
			var placeData = {};
			service.getDetails(request, function(details, status) {
					// console.log('details:', details);
					// console.log('status:', status);
		       	if (status === google.maps.places.PlacesServiceStatus.OK) {

				    var formatted = details.formatted_phone_number,
						unformatted = formatted.replace(/[- )(]/g,''),
						lat = details.geometry.location.lat(),
						lng = details.geometry.location.lng(),
						parseLat = parseFloat(lat).toFixed(3),
						parseLng = parseFloat(lng).toFixed(3),
						opening_hours = details.opening_hours.open_now,
						reviews = details.reviews[1].text;

				    var placeData = {
				        name: details.name,
				        address: details.formatted_address,
				        phone_number: unformatted,
				        rating: details.rating,
				        location: [parseLng,parseLat],
				        type: details.types[1],
				        review: reviews,
				        website: details.website,
				        open: opening_hours 
					} ;					
					addToPlacesDataArray(placeData);
				}				     		
			});
		}
	};
			function addToPlacesDataArray(obj) {
				// Create our entry backed by the defaults
				var entry = Object.create(placeData);
				// Loop through the new object's keys...
				Object.keys(obj).forEach(function(key) { 
					// ...adding a default if it's a new key
					if (!placeData.hasOwnProperty(key)) {
						placeData[key] = "undefined data for " + key;
					}
						entry[key] = obj[key];
				});
				
				placesDataArray.push(entry);

				placesDataArray.forEach(function(entry, index) {
					Object.keys(placeData).forEach(function(key){
						if(entry[key] === undefined){
							console.log("undefined entry key from Obj index:",'['+ index +'] '+entry.name + ' => '+key);
							entry[key] = 'Lady Gaga';
						}
					});
				});
				//console.log('placesDataArray:',placesDataArray );
			}





return gMapService;




});