var app = angular.module("uPick", ['ngRoute','ui.bootstrap','ngFitText','geolocation']);


  app.config(['$routeProvider',
    function($routeProvider){
      $routeProvider
       .when('/',{
          templateUrl : "/partials/main.html",
          controller : "mainCtrl"
        })
        // .when('/sidePanel',{
        //   templateUrl : "/partials/sidePanel.html",
        //   controller : "mainCtrl"
        // })
        // .when('/main',{
        //   templateUrl : "/partials/main.html",
        //   controller : "mainCtrl"
        // })
        //  .when('/nearYou',{
        //   templateUrl : "/partials/nearYou.html",
        //   controller : "addUserFormCtrl"
        //         })
        .otherwise({
          redirectTo: '/'
        });
     
    }
  ]);

