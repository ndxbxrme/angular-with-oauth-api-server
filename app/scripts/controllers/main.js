'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myApp
 */
angular.module('myApp')
.controller('MainCtrl', function ($scope, $http) {
  $http.get('/api')
  .success(function(data){
    $scope.data = data;
  });
});
