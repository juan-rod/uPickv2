app.controller('mainCtrl', function($scope, $http, $rootScope, geolocation, mapFactory){


$scope.geolocate = {};
$scope.placeList= [];

// Set initial coordinates to the center of the US
$scope.geolocate.latitude = 39.500;
$scope.geolocate.longitude = -98.350;

var coords = {},
	lat = 0,
	long = 0;
   
    // Get User's actual coordinates based on HTML5 at window load
geolocation.getLocation().then(function(data){
    	// Set the latitude and longitude equal to the HTML5 coordinates
    coords = {lat:data.coords.latitude, long:data.coords.longitude};
    // Display coordinates in location textboxes rounded to three decimal points
    $scope.geolocate.longitude = parseFloat(coords.long).toFixed(3);
    $scope.geolocate.latitude = parseFloat(coords.lat).toFixed(3);
    console.log('coords:', coords);
	//refresh with new lat/lng
    mapFactory.refresh($scope.geolocate.latitude, $scope.geolocate.longitude);
     //getPlaces();
});

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

});