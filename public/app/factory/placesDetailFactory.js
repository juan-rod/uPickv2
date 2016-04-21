app.factory('placesDetailFactory', function($rootScope, $http){

return {
	getPlacesDetailInfo: function(placeID){
              var service = new google.maps.places.PlacesService(map);
              var request = { 
              		placeId: placeID
              };
              var placeData = {};
                service.getDetails(request, function(details, status) {
                	console.log("details:",details);
                	console.log("status:",status);
                
                	

                	return details
                	
					// var formatted = details.formatted_phone_number;
					// var unformatted = formatted.replace(/[- )(]/g,'');
					// var lat = details.geometry.location.lat();
					// var lng = details.geometry.location.lng();
					// var parseLat = parseFloat(lat).toFixed(3);
					// var parseLng = parseFloat(lng).toFixed(3);
					// console.log("if", parseLat, parseLng);


					// var placeData = {
					// 	name: details.name,
					// 	address: details.formatted_address,
					// 	phone_number: details.formatted_phone_number,
					// 	rating: details.rating,
					// 	location: [parseLng,parseLat],
					// 	type: details.types[1],
					// 	review: details.reviews[1].text,
					// 	website: details.website,
					// 	open: details.opening_hours.open_now   
					// };

					// console.log("placeData:", placeData);
					// return placeData;
				});
	}			
}

});