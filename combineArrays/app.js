var app = angular.module('myApp', []);

app.service('ConfigService', ["$window", function ($window) {
    return   $window.brekkie;
}]);

app.service('config', function ($window) {
    return $window.brekkie;
});

app.factory('configFactory', ['$window', function(win) {
  return {
    getMealType: function() {
      return "cassarole";
    },

    getCuisineType: function(name) {
        if (name == "taco"){
            return name + " is Mexican";
        } else if (name == "sushi"){
            return name + " is Japanese";
        }
    },

    getMealNames: function() {
      // Reach up to the HTML and get the value of brekkie defined in script tag
      return win.mealNames;
    },

    getMarket: function() {
      return win.market;
    }
  }
}]);

// controllers in plain old Javascript notation.  Commented out, because it won't survive minification.
//function FoodParentCtrl($scope) {
//  $scope.foods = ["booger", "fries"];
//}

// contorller that will survive minification.  Does the same thing
app.controller("FoodParentCtrl", function FoodParentCtrl($scope, configFactory) {
  $scope.foods = ["pizza", "beer"];
  $scope.factoryFoods = configFactory.getMealType();
  $scope.factoryFoodsTaco = configFactory.getCuisineType("taco");
  $scope.factoryFoodsSushi = configFactory.getCuisineType("sushi");
  $scope.mealNames = configFactory.getMealNames();
  $scope.market = configFactory.getMarket();

  $scope.market1 = getFirstItem($scope.market);

  $scope.fruitsByVendor = getFruitsByVendor($scope.market);

  //build out the table
  $scope.fruitsInventory = getFruitInventory($scope.fruitsByVendor);

});

function getFirstItem(a) {
  return a[0];
}

function getFruitsByVendor(market) {
    var r = {};
    r.vendorList=[];    // list of vendors
    r.fruitObj = {};   // list of objects like {fruit, [{vendor.name, qty},{vendor2, qty}]} objects
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
    // build headers
    r.tableHead =[
        {display: "Frouit", column: "fruit"}
        ];
    vendors.forEach(function (v) {
        r.tableHead.push({display: v.name, column: v.name})
    });

    // build display grid
    // the display grid shows which fruits are available by each vendor
    r.tableGrid =[];

    for (f in fruits) if (fruits.hasOwnProperty(f)) {
        var tableGridRow = [];
        tableGridRow.push(f);

        var qtys = vendors.map(function(v) {
            // the empty cell
            var bar = "-";

            fruits[f].forEach(function(qt){
                if (qt.vendor == v.name) {
                    bar = qt.qty;
                }
            });

            return bar;
        });

        // append quantites by vendor to the row
        tableGridRow.push.apply(tableGridRow, qtys);

        r.tableGrid.push(tableGridRow);
    }

    return r;


}

// Child control to show meal items
// Note the parameter meal is the iterator, and changes with every new controller
app.controller("MealItemsCtrl", function MealItemsCtrl($scope) {
  $scope.itemPlural = $scope.meal + "s";
});
