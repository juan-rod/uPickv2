app.factory('mapFactory', function($rootScope, $http){

	

// Service to return
var gMapService ={}

// Array of locations obtained from API calls
var locations = [];

 // Handling clicks and location selection
gMapService.clickLat = 0;
gMapService.cleickLong = 0;

// google map variables
var map = mapInit();
var infowindow;
var marker;

//initRestaurantMap variables
var userLatLng;
var lat = [];
var lng = [];
var customMapTypeId = 'custom_style';

  // Refresh the Map with new data. Takes three parameters (lat, long, and filtering results))
    gMapService.refresh  = function(latitude, longitude, filteredResults){  
        lat.push(latitude);
        lng.push(longitude);

        initMap();
        initPlacesMap();
    }; 

	var initMap = function(){
		userLatLng = new google.maps.LatLng(lat, lng);
		mapInit();
 		map.mapTypes.set(customMapTypeId, customMapType());
  		map.setMapTypeId(customMapTypeId);
		initMapMarker(userLatLng, map);
	};

	 var initPlacesMap = function(){
	 	  userLatLng = new google.maps.LatLng(lat, lng);
        var service = new google.maps.places.PlacesService(map);
            service.nearbySearch({
              location: userLatLng,
              radius: 1000,
              types: ['food', 'bakery', 'cafe', 'meal_delivery','restaurant', 'meal_takeaway']
              }, callback);

                function callback(results, status) {
                	//console.log("results:",results);
                  if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var placeID = results[i].place_id;
                        	//console.log("placeID:",placeID);
                        	//send to functions
                           initPlacesMarker(results[i]);
                        //getPlacesDetailInfo(placeID);
                      }
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

	function customMapType(){

				var	customMapType = new google.maps.StyledMapType([
				{
					"featureType":"landscape.natural",
					"elementType":"geometry.fill",
					"stylers":[
						{"visibility":"on"},
						{"color":"#e0efef"}
					]
				},
				{
					"featureType":"poi",
					"elementType":"geometry.fill",
					"stylers":[
						{"visibility":"on"},
						{"hue":"#1900ff"},
						{"color":"#c0e8e8"}
					]
				},
				{
					"featureType":"road",
					"elementType":"geometry",
					"stylers":[
						{"lightness":100},
						{"visibility":"simplified"}
					]
				},
				{
					"featureType":"road",
					"elementType":"labels",
					"stylers":[
						{"visibility":"off"}
					]
				},
				{
					"featureType":"transit.line",
					"elementType":"geometry",
					"stylers":[
						{"visibility":"on"},
						{"lightness":700}
					]
				},
				{
					"featureType":"water",
					"elementType":"all",
					"stylers":[
						{"color":"#7dcdcd"}
					]}
			],
				{
	      			name: 'Custom Style'
	  			});

	  			return customMapType;
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
		        // When a new spot is selected, delete the old red bouncing marker
				if(lastMarker){
					lastMarker.setMap(null);
				}

				// Create a new red bouncing marker and move to it
				lastMarker = marker;
				map.panTo(marker.position)

				newLat = map.center.lat();
				newLng = map.center.lng();

				markerInfo(lastMarker,newLat, newLng);
				// initPlacesMap(newLat,newLng);
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

	function initPlacesMarker(place) {
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: placeLoc,
			animation: google.maps.Animation.DROP,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		});
		lastMarker = marker;
		placesInfoWindow(lastMarker, place);
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


return gMapService;




});