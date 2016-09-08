app.controller('loginCtrl', function($scope, $http, $rootScope, geolocation, mapFactory){

	$('.message a').click(function(){
   		$('form').animate({height: "toggle", opacity: "toggle"}, "slow");
	});

});