'use strict';

/* Services */

var buddyServices = angular.module('buddyServices', ['ngResource']);


buddyServices.factory('Buddy', ['$resource',
  function($resource){
    return $resource('buddies/:buddyId.json', {}, {
      query: {method:'GET', params:{buddyId:'buddies'}, isArray:true}
    });
  }]);

buddyServices.factory('BirthdayService', ['$scope',
  function($scope){
    return $resource('buddies/:buddyId.json', {}, {
      query: {method:'GET', params:{buddyId:'buddies'}, isArray:true}
    });
  }]);