'use strict';

/* Controllers */

var buddyControllers = angular.module('buddyControllers', []);


buddyControllers.controller('LoginCtrl', ['$scope', '$routeParams',
  '$location',
  function($scope, $routeParams, $location) {
    var vm = this;

    $scope.getError = function (error) {
      if (angular.isDefined(error)) {
        if (error.required) {
          return "Please enter a value";
        } else if (error.email) {
          return "Please enter a valid email address";
        }
      }
    };

    $scope.isDisabled = function(){
      return $scope.loginForm.$invalid;
    };
    $scope.passwordMatch = function(){
      if($scope.confirmPassword === undefined )
        return false;
      return $scope.password === $scope.confirmPassword;
    };

    $scope.validateLastName = function(){
     if($scope.LoginForm.lastName.$error.maxLength > 50)  {
       return false;
     }
    }

    $scope.submit = function (userDetails) {
      $location.path("/buddies");
    };



  }]);

buddyControllers.controller('AddBuddyCtrl', ['$scope', '$uibModalInstance','rowCollection',
  function($scope, $uibModalInstance, rowCollection) {
    var vm = this;
    vm.rowCollection = rowCollection;
    vm.cancel = cancel;
    vm.add = add;
    vm.isDisabled = isDisabled;
    vm.newUser={};


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function add() {
      $uibModalInstance.close();
      vm.newUser.birthDate = $scope.dt;
      vm.rowCollection.push(vm.newUser);
    }

    function isDisabled() {
      return vm.myForm.$invalid;
    }



  }]);

buddyControllers.controller('PriorityBuddyCtrl',
    ['$scope', '$uibModalInstance','rowCollection','row',
  function($scope, $uibModalInstance, rowCollection, row) {
    var vm = this;
    vm.rowCollection = rowCollection;
    vm.row = row;
    vm.cancel = cancel;
    vm.setPriority = setPriority;
    vm.priority = row.priority;


    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function setPriority() {
      $uibModalInstance.close();
      var index = rowCollection.indexOf(row);
      if (index !== -1) {
        rowCollection[index].priority = vm.priority;
      }
    }
  }]);


buddyControllers.controller('BuddyListCtrl', ['$scope','$uibModal','Buddy',
  function($scope, $uibModal, Buddy) {

    $scope.rowCollection = Buddy.query();
    $scope.removeItem = removeItem;
    $scope.addBuddy = addBuddy;
    $scope.priorityBuddy = priorityBuddy;

    $scope.dynamicPopover = {
      templateUrl: 'myPopoverTemplate.html'
    };

    $scope.getError = function (error) {
      if (angular.isDefined(error)) {
        if (error.required) {
          return "Please enter a value";
        } else if (error.email) {
          return "Please enter a valid email address";
        }
      }
    };

    function addBuddy(buddy){
      var modalInstance = $uibModal.open({
        templateUrl: 'partials/add-buddy.template.html',
        controller: 'AddBuddyCtrl',
        controllerAs: 'modal',
        size: 'md',
        resolve: {
          rowCollection: function() {
            return $scope.rowCollection;
          }
        }
      });
    }

    function priorityBuddy(row) {
      var modalInstance = $uibModal.open({
        templateUrl: 'partials/priority-buddy.template.html',
        controller: 'PriorityBuddyCtrl',
        controllerAs: 'modal',
        size: 'md',
        resolve: {
          rowCollection: function() {
            return $scope.rowCollection;
          },
          row: function() {
            return row;
          }
        }
      });
    }

    function removeItem(rowCollection, row) {
      var modalInstance = $uibModal.open({
        templateUrl: 'partials/delete-buddy.template.html',
        size: 'md'

      });

      modalInstance.result.then(function() {
        var index = rowCollection.indexOf(row);
        if (index !== -1) {
          rowCollection.splice(index, 1);
        }
      });
    }

  }]);

