app.factory("placesFactory", function($http) {

  return {
        getPlacesDetail: function(placeData) {
            return $http.get('/places', placeData)
            		.success(function (data) {
                        
					console.log("placesFactoryInfo!", data);
					})
					.error(function (data) {
			    	console.log('Error: ' + data);
					});
            }
        } 
});