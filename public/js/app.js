var app = angular.module("uPick", ['ngRoute','ui.bootstrap','ngFitText','geolocation']);


app.config(['$routeProvider',
  function($routeProvider){
    $routeProvider
     .when('/login',{
        templateUrl : "./partials/login.html",
        controller : "mainCtrl"
      })
      .when('/sidePanel',{
        templateUrl : "./partials/sidePanel.html",
        controller : "mainCtrl"
      })
      .when('/main',{
        templateUrl : "./partials/main.html",
        controller : "mainCtrl"
      })
       .when('/nearYou',{
        templateUrl : "./partials/nearYou.html",
        controller : "addUserFormCtrl"
              })
      //   .when('/sidePanel',{
      //   templateUrl : "./partials/sidePanel.html",
      //   controller : "LoginCtrl"
      // })
      //   .when('/win',{
      //   templateUrl : "partials/win.html",
      //   controller : "winCtrl"
      // })
      .otherwise({
        redirectTo: '/login'
      });
   
  }
  ]);