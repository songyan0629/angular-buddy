'use strict';

/* App Module */

var buddyApp = angular.module('buddyApp', [
  'ngRoute',
  'buddyAnimations',
  'ui.bootstrap',
  'smart-table',
  'buddyControllers',
  'buddyFilters',
  'buddyServices'
]);

buddyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginCtrl'
      }).
      when('/buddies', {
        templateUrl: 'partials/buddy-list.html',
        controller: 'BuddyListCtrl'
      }).
      otherwise({
        redirectTo: '/buddies'
      });
  }]);
