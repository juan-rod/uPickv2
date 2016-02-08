app.controller('mainCtrl', function($scope, $http, $rootScope, geolocation, foodFactory, placesFactory, draggableDirective, shuffleFac, deleteFac){


	// Initializes Variables
    // ----------------------------------------------------------------------------
    
    $scope.geolocate = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    $scope.placeList= [];
    //$scope.shuffle = shuffleFac.setShuffle;
    $scope.remove =  deleteFac.setDelete;

    // Set initial coordinates to the center of the US
    $scope.geolocate.latitude = 39.500;
    $scope.geolocate.longitude = -98.350;


    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.geolocate.longitude = parseFloat(coords.long).toFixed(3);
        $scope.geolocate.latitude = parseFloat(coords.lat).toFixed(3);

		//refresh with new lat/lng
        foodFactory.refresh($scope.geolocate.latitude, $scope.geolocate.longitude);
         //getPlaces();
    });

    // Get coordinates based on mouse click. When a click event is detected....
        $rootScope.$on("clicked", function(){
        	// console.log("marker moved");
            // Run the gservice functions associated with identifying coordinates
            $scope.$apply(function(){
                getPlaces();
            });
            
        });

        $rootScope.$on("rerun", function(){
        	console.log("rerun");

        	
                getPlaces();
            
        })

        $rootScope.$on("newPlaces", function(){
        	console.log("newPlaces");

        	
                // deleteFac.setDelete();
                getPlaces();
           
        })

        $rootScope.$on("deleted", function(){
            console.log("deleted");
                getPlaces();    
        })

    // Functions
    // ----------------------------------------------------------------------------
   		

   	var getPlaces = function(){
        // getter placesFactory
        placesFactory.getPlacesDetail().then(function(response){
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

    // function removeFromDom(){
    //     deleteFac.setDelete().then(function(response){

    //         $scope.placeList.splice(response, 1);
    //     })
    // };


      $scope.shuffle = function(){
      var details = $scope.placeList;
      var rand = details[Math.floor(Math.random() * details.length)];
 
        for (var i = 0; i < details.length; i++) {
            if (details[i] != rand) {
             var bye = details.splice(i--, 1);
             console.log("not equal", bye);
            } else {
                // $scope.playlist.push(details[i]);
              console.log("equal",details[i]);
              // $scope.placeList.push(details[i]);
            }
            
        }
    };


//    // Creates a new user based on the form fields
//     $scope.filter = function() {

         

//         // Grabs all of the text box fields
//         var userData = {
//             username: $scope.formData.username,
//             gender: $scope.formData.gender,
//             age: $scope.formData.age,
//             favfood: $scope.formData.favfood,
//             location: [$scope.formData.longitude, $scope.formData.latitude],
//             htmlverified: $scope.formData.htmlverified
//         };

//         // Saves the user data to the db
//         $http.post('/users', userData)
//             .success(function (data) {

//                 // Once complete, clear the form (except location)
//                 $scope.formData.username = "";
//                 $scope.formData.gender = "";
//                 $scope.formData.age = "";
//                 $scope.formData.favfood = "";

//                 // Refresh the map with new data
//                 foodFactory.refresh($scope.formData.latitude, $scope.formData.longitude);
                
//             })
//             .error(function (data) {
//                 console.log('Error: ' + data);
//             });
            
//     };


// });
}); //end of app.controller