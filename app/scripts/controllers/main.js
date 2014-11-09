'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
.controller('MainCtrl', function ($scope, $http, $location) {
  $scope.login = function(){
    $http.post('/api/login', $scope.user)
    .success(function(){
      $location.path('/profile');
    });
  };
  $scope.signup = function(){
    $http.post('/api/signup', $scope.user)
    .success(function(){
      $location.path('/profile');
    });
  };
  $scope.logout = function(){
    $http.get('/api/logout');
  };
});
