angular.module('bcApp', []);

angular.module('bcApp').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('bcApp').controller("buttonCheckCtrl", function checkboxButtons($scope) {
    $scope.buttonVals =
        {
            "A":true,
            "B":true,
            "C":false
        };
});

angular.module('bcApp').directive('buttonCheck', function() {
    return {

        require: 'ngModel',
        link : function($scope, element, attr, ctrl) {

            angular.element(element).bind('click', function() {

                // toggle the class
                angular.element(element).toggleClass('active');

                // change the model state
                if (ctrl.$viewValue) {
                    $scope.$apply(
                        ctrl.$setViewValue(false)
                    )
                } else {
                    $scope.$apply(
                        ctrl.$setViewValue(true)
                    )
                }

            });

            ctrl.$render = function() {
                if (ctrl.$viewValue) {
                    angular.element(element).toggleClass('active');
                }
            };

        }

    };
});


