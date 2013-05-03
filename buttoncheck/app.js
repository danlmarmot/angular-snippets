angular.module('bcApp', []);

angular.module('bcApp').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('bcApp').factory('configFactory', ['$window', function(win) {
    return {
        getFruitList: function() {
            return win.fruitList;
        }
    }
}]);

angular.module('bcApp').controller("buttonCheckCtrl", function checkboxButtons($scope, configFactory) {
    $scope.fruitList = configFactory.getFruitList();

    $scope.buttonVals = { "A":true, "B":true, "C":false };

    //$scope.userFilterRegEx = buildUserFilterRegEx($scope.buttonVals);

    $scope.$watch('buttonVals', function() {
        $scope.userFilterRegEx = buildUserFilterRegEx($scope.buttonVals);
    }, true);

    //build out the table and add sorting
    $scope.fruitsTable = getFruitTable($scope.fruitList, $scope.buttonVals);
});

function buildUserFilterRegEx(b) {
    // Interprets userFilter selections.
    // Note each button is specially handled

    var r = "";

    if (b.A) {
        r += "A";
    }

    if (b.B) {
        r += "B";
    }

    if (b.C) {
        r += "C";
    }

    if (b.D) {
        r += "D";
    }

    if (b.E) {
        r += "E";
    }

    return r;
}

function getFruitTable(fruitList, userFilters) {
    var r = {};

    // Build headers
    r.tableHead = [ {display: "Froot", name: "fruit"} ];  // leftmost column
    r.tableHead.push({display: "Quantity", name: "qty"}); // next column

    // build tableBody
    r.tableGrid =[];

    fruitList.forEach( function(f) {
        var tableGridRow = {"fruit": f.name};
        tableGridRow["qty"] = f.qty;

        r.tableGrid.push(tableGridRow);
    });

    return r;
}

angular.module('bcApp').directive('buttonCheck', function() {
    return {

        require: 'ngModel',
        link : function($scope, element, attr, ctrl) {

            angular.element(element).bind('click', function() {
                // toggle the class
                angular.element(element).toggleClass('active');

                // change the model state
                if (ctrl.$viewValue) {
                    $scope.$apply(ctrl.$setViewValue(false))
                } else {
                    $scope.$apply(ctrl.$setViewValue(true))
                }
            });

            ctrl.$render = function() {
                if (ctrl.$viewValue) {
                    angular.element(element).toggleClass('active');
                } else {
                    angular.element(element).toggleClass('inactive');
                }
            };
        }
    };
});
