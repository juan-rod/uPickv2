app.factory("shuffleFac", function($http) {
    return {
        setShuffle: function(test) {
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
        }
    };
});




//    $scope.shuffle = function(){
//       var details = $scope.placeList;
//       var rand = details[Math.floor(Math.random() * details.length)];
 
//         for (var i = 0; i < details.length; i++) {
//             if (details[i] != rand) {
//              var bye = details.splice(i--, 1);
//              console.log("not equal", bye);
//             } else {
//                 // $scope.playlist.push(details[i]);
//               console.log("equal",details[i]);
//               // $scope.placeList.push(details[i]);
//             }
            
//         }

// }; // end moreInfo  

