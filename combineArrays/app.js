var app = angular.module('myApp', []);

app.factory('configFactory', ['$window', function(win) {
    return {
        getMarket: function() {
            return win.market;
        }
    }
}]);

// Controller defined in a way that survives minification.
app.controller("MarketCtrl", function MarketCtrl($scope, configFactory) {
  $scope.market = configFactory.getMarket();

  $scope.fruitsByVendor = getFruitsByVendor($scope.market);

  //build out the table and add sorting
  $scope.fruitsTable = getFruitTable($scope.fruitsByVendor);

  // These three functions and data help us do the table sorting.
  // Initial sorting defined here
  $scope.sort = { column: 'fruit', descending: false };

  // The click handler for when you click on a column heading
  $scope.changeSorting = function(column) {
        var sort = $scope.sort;
        if (sort.column == column) {
            sort.descending = !sort.descending;
        } else {
            sort.column = column;
            sort.descending = false;
        }
  };

  //The handler to change CSS class to display sort status in the table header cells
  $scope.sortClass = function(column) {
        //console.log("$scope.sort.column is " + $scope.sort.column);
        //console.log("$scope.sort.descending is " + $scope.sort.descending);
        if ($scope.sort.descending) {
            return column == $scope.sort.column && "header headerSortDown";
        } else {
            return column == $scope.sort.column && "header headerSortUp";
        }
    };

});

function getFruitsByVendor(market) {
    var r = {};
    r.vendorList=[];   // list of vendors
    r.fruitHash = {};

    market.vendors.forEach(function (v) {
        r.vendorList.push({name:v.name, display: v.display});

        v.fruitList.forEach(function(fruit) {
            if(r.fruitHash[fruit.name]) {
                r.fruitHash[fruit.name][v.name] = fruit.qty;
            } else {
                r.fruitHash[fruit.name] = {};   // need to initialize if it doesn't exist
                r.fruitHash[fruit.name][v.name] = fruit.qty;
            }
        });
    });

    return r;
}

function getFruitTable(fruitsByVendor) {
    var vendors = fruitsByVendor.vendorList;
    var fruitHash = fruitsByVendor.fruitHash;
    var r = {};         // return object

    // Build headers
    r.tableHead =[ {display: "Froot", name: "fruit"} ];  //leftmost column
    vendors.forEach(function (v) {
        r.tableHead.push({display: v.display, name: v.name});
    });

    // build display grid
    // The display grid shows which fruits are available by each vendor
    // we want a grid that looks like this, which allows for easy table-sorting:
    // grid = [ {"fruit":"apple","ch":"10","st":"10"} , {"fruit":"orange"... ]}
    r.tableGrid =[];

    // loop through all fruits in the object, adding a row for each in this loop
    for (f in fruitHash) if (fruitHash.hasOwnProperty(f)) {
        var tableGridRow = {"fruit": f};        // the leftmost column
        vendors.forEach(function(v){
            if(fruitHash[f][v.name]) {
                tableGridRow[v.name] = fruitHash[f][v.name];
            } else {
                tableGridRow[v.name] = '-';
            }
        });

        r.tableGrid.push(tableGridRow);
    }

    return r;
}