app.controller('mainCtrl', function($scope, $http,$timeout, $rootScope, geolocation, mapFactory, getPlacesData){


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
        console.log('$scope.geolocate.latitude:',$scope.geolocate.latitude);
        console.log('$scope.geolocate.longitude:',$scope.geolocate.longitude);
        mapFactory.refresh($scope.geolocate.latitude, $scope.geolocate.longitude);
        // mapFactory.refresh(36.1726, -86.7597); //5points area, Nashville TN
        // mapFactory.refresh(30.267153, -97.743061); //south Congress, Austin, TX
        // placesDetailFactory.getPlacesDetailInfo(36.1726, -86.7597);
         $timeout(function() {
            getPlaces();    
         }, 3000);
    });



var getPlaces = function(){
// getter placesFactory
getPlacesData.info().then(function(response){
    console.log("what is response ", response);
    // console.log("toSTring", $scope.placeList._id.toString());
    $scope.placeList =[];
for(i=0; i < response.data.length; i++){
    // $scope.placeList =[];
  $scope.placeList.push(response.data[i]); 
  // console.log("inloop:", $scope.placeList);
 }
// console.log("after:", $scope.placeList);
});
};

});