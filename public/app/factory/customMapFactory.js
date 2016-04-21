app.factory('customMapFactory', function($rootScope, $http){

return {
	 customMapType: function(){

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
	}
}

});