'use strict';

angular.module('buddyControllers').directive('birthdayChooser', [
    function() {
        return {
            restrict: 'A',
            controller: function($scope, $element, $attrs) {
                $scope.today = function() {
                    $scope.dt = new Date(2003, 1, 1);
                };
                $scope.today();

                $scope.clear = function() {
                    $scope.dt = null;
                };

                $scope.dateOptions = {
                    dateDisabled: disabled,
                    formatYear: 'yy',
                    maxDate: new Date(2003, 1, 1),
                    minDate: new Date(1865, 1, 1),
                    startingDay: 1
                };

                // Disable weekend selection
                function disabled(data) {
                    var date = data.date,
                        mode = data.mode;
                    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
                }

                $scope.open2 = function() {
                    $scope.popup2.opened = true;
                };

                $scope.setDate = function(year, month, day) {
                    $scope.dt = new Date(year, month, day);
                };

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];

                $scope.popup2 = {
                    opened: false
                };

            },
            templateUrl: 'partials/birthday.html',
        };
    }
]);

