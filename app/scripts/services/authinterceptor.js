'use strict';

/**
 * @ngdoc service
 * @name myApp.authInterceptor
 * @description
 * # authInterceptor
 * Factory in the myApp.
 */
angular.module('myApp')
.factory('authInterceptor', function(User, $q, $location) {
    return {
        response: function(response) {
            if(response.status === 401) {
                User.isLoggedIn = false;
                $location.path('/');
            } else {
                User.isLoggedIn = true; 
            }
            return response || $q.when(response);
        },
        responseError: function(response) {
            User.isLoggedIn = false;
            if(response.status === 401) {
                $location.path('/');
            }
            return response || $q.when(response);
        }
    };
})
.config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
});