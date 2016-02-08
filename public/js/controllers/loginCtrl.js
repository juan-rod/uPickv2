 app.controller("LoginCtrl", 
  ["$scope",
  function($scope) {
$scope.loggingIn = false;

 $scope.userInfo = function () {
        $scope.loggingIn = true;
        console.log("hey!")
    };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {

  };






  } ]);