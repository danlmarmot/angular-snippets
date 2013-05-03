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

    // initial values
    $scope.buttonVals = { "A":true, "B":true, "C":false };
    $scope.showMatchesOnly = false;

    $scope.$watch('buttonVals', function() {
        $scope.userFilterRegEx = buildUserFilterRegEx($scope.buttonVals);
        $scope.fruitsTable = getFruitTable($scope.fruitList, $scope.userFilterRegEx, $scope.showMatchesOnly);
    }, true);

    $scope.$watch('showMatchesOnly', function() {
        $scope.fruitsTable = getFruitTable($scope.fruitList, $scope.userFilterRegEx, $scope.showMatchesOnly);
    });     // do not need true on the end, as showMatchesOnly is not a deep object

});

function buildUserFilterRegEx(b) {
    // Interprets userFilter selections.
    // Note each button is specially handled
    var r = [];

    if (b.A) { r.push("^a.*") }     // starts with 'a'
    if (b.B) { r.push("^b.*") }
    if (b.C) { r.push("^c.*") }
    if (b.D) { r.push("^d.*") }
    if (b.E) { r.push(".*e$") }     // ends in 'e'

    if (r.length == 0 ) {
        return "a^";    // regex pattern that matches no strings
    }
        return r.join("|");
}

function getFruitTable(fruitList, userRegex, matchesOnly) {
    var r = {};

    var patt = new RegExp(userRegex, "gim");

    // Build headers
    r.tableHead = [ {display: "Froot", name: "fruit"} ];  // leftmost column
    r.tableHead.push({display: "RegEx Match?", name: "match"} );
    r.tableHead.push({display: "Quantity", name: "qty"}); // next column

    // build tableBody
    r.tableGrid =[];

    fruitList.forEach( function(f) {
        var foundMatch = patt.test(f.name);

        // exclude if we want matchesOnly and do not have a match
        if ( !(matchesOnly && !foundMatch)) {
            var tableGridRow = {"fruit": f.name};
            tableGridRow["match"] = function () {
                if (foundMatch) {
                    return "match: " + f.name.match(patt);
                } else {
                    return "no match";
                }
            }();
            //tableGridRow["match"] = userRegex;
            tableGridRow["qty"] = f.qty;

            r.tableGrid.push(tableGridRow);
        }
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
