var app = angular.module('myApp', []);

app.factory('configFactory', ['$window', function(win) {
    return {
        getMarket: function() {
            return win.market;
        }
    }
}]);

// Controller defined in a way that survives minification.
app.controller("FoodParentCtrl", function FoodParentCtrl($scope, configFactory) {
  $scope.market = configFactory.getMarket();

  $scope.fruitsByVendor = getFruitsByVendor($scope.market);

  //build out the table and add sorting
  $scope.fruitsInventory = getFruitInventory($scope.fruitsByVendor);

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
        console.log("$scope.sort.column is " + $scope.sort.column);
        console.log("$scope.sort.descending is " + $scope.sort.descending);
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
    r.fruitObj = {};   // list of objects like {"apple", [{vendor.name, qty},{"ThatGuy", 20}]} objects
    r.fruitList = [];

    market.vendors.forEach(function (v) {
        r.vendorList.push({name:v.name});

        v.fruitList.forEach(function(fruit) {
            if(r.fruitObj[fruit.name]){
                r.fruitObj[fruit.name].push({"vendor": v.name, "qty": fruit.qty});
            } else {
                r.fruitObj[fruit.name] = [{"vendor": v.name, "qty": fruit.qty}];
            }
        });
    });

    for (f in r.fruitObj) if (r.fruitObj.hasOwnProperty(f)) {
        r.fruitList.push({name:f});
    }

    return r;
}

function getFruitInventory(fruitsByVendor) {
    var vendors = fruitsByVendor.vendorList;
    var fruits = fruitsByVendor.fruitObj;

    var r = {};
    // Build headers
    r.tableHead =[ {display: "Froot", column: "fruit"} ];
    vendors.forEach(function (v) {
        r.tableHead.push({display: v.name, column: v.name});
    });

    var vendorCols = vendors.map(function(v) {
        return v.name;
    });

    // build display grid
    // the display grid shows which fruits are available by each vendor
    // we want a grid that looks like this, which allows for easy table-sorting:
    // grid = [ {"fruit":"apple","ch":"10","st":"10"} , {"fruit":"orange"... ]}
    r.tableGrid =[];

    for (f in fruits) if (fruits.hasOwnProperty(f)) {
        var tableGridRow = {"fruit": f};

        fruits[f].forEach(function(qt){
            if(vendorCols.indexOf(qt.vendor) >=0 ) {
                    tableGridRow[qt.vendor] = qt.qty;
                } else
                    tableGridRow[qt.vendor] = '-';
            });

        r.tableGrid.push(tableGridRow);
    }

    return r;
}