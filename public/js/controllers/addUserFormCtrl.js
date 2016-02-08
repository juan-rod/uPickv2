// Creates the addCtrl Module and Controller. Note that it depends on the 'geolocation' module and service
app.controller('addUserFormCtrl', function($scope, $http, $rootScope, geolocation, gFactory, foodFactory){

    // Initializes Variables
    // ----------------------------------------------------------------------------
    $scope.formData = {};
    var coords = {};
    var lat = 0;
    var long = 0;

    // Set initial coordinates to the center of the US
    $scope.formData.latitude = 39.500;
    $scope.formData.longitude = -98.350;

    // Get User's actual coordinates based on HTML5 at window load
    geolocation.getLocation().then(function(data){

        // Set the latitude and longitude equal to the HTML5 coordinates
        coords = {lat:data.coords.latitude, long:data.coords.longitude};

        // Display coordinates in location textboxes rounded to three decimal points
        $scope.formData.longitude = parseFloat(coords.long).toFixed(3);
        $scope.formData.latitude = parseFloat(coords.lat).toFixed(3);

        // Display message confirming that the coordinates verified.
        $scope.formData.htmlverified = "Sweet!";

        foodFactory.refresh($scope.formData.latitude, $scope.formData.longitude);

    });

    // Functions
    // ----------------------------------------------------------------------------
    // Get coordinates based on mouse click. When a click event is detected....
    $rootScope.$on("clicked", function(){
        
        // Run the gFactory functions associated with identifying coordinates
        $scope.$apply(function(){
            $scope.formData.latitude = parseFloat(foodFactory.clickLat).toFixed(3);
            $scope.formData.longitude = parseFloat(foodFactory.clickLong).toFixed(3);
            $scope.formData.htmlverified = "Ew!";
        });
    });

    // Creates a new user based on the form fields
    $scope.createUser = function() {

         

        // Grabs all of the text box fields
        var userData = {
            username: $scope.formData.username,
            gender: $scope.formData.gender,
            age: $scope.formData.age,
            favfood: $scope.formData.favfood,
            location: [$scope.formData.longitude, $scope.formData.latitude],
            htmlverified: $scope.formData.htmlverified
        };

        // Saves the user data to the db
        $http.post('/users', userData)
            .success(function (data) {

                // Once complete, clear the form (except location)
                $scope.formData.username = "";
                $scope.formData.gender = "";
                $scope.formData.age = "";
                $scope.formData.favfood = "";

                // Refresh the map with new data
                foodFactory.refresh($scope.formData.latitude, $scope.formData.longitude);
                
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
            
    };
});