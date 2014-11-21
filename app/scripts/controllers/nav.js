'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('NavCtrl', function ($scope, $http, User) {
    $scope.user = User;
    $scope.logout = function(){
      User.details = undefined;
      $http.get('/api/logout');
    };
  });
