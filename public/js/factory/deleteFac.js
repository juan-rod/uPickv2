app.factory("deleteFac", function($http, $rootScope) {
    return {

        setDelete: function(place) {
            console.log(place);
            $http.delete('/places/:id', place)
                    .success(function (data) {
                        
                    console.log("Success! It's deleted!", data);

                    // rerun removeFromDom() in MainCtrl.js
                    $rootScope.$broadcast("deleted");

                    })
                    .error(function (data) {
                    console.log('Error: ' + data);
                    });
                }
            };
});


     