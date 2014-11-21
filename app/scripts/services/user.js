'use strict';

/**
 * @ngdoc service
 * @name myApp.User
 * @description
 * # User
 * Factory in the myApp.
 */
angular.module('myApp')
  .factory('User', function () {

    var isLoggedIn = false;
    var details;
    var message;

    return {
      isLoggedIn:isLoggedIn,
      details:details,
      message:message
    };
  });
