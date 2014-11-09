'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('NavCtrl', function ($scope, User) {
    $scope.user = User;
  });
