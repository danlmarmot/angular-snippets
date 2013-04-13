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
});

function getFirstItem(a) {
  return a[0];
}

function getFruitsByVendor(market) {
    var r = {};
    r.vendorList=[];    // list of vendors
    r.fruitList = {};   // list of objects like {fruit, [{vendor.name, qty},{vendor2, qty}]} objects


    market.vendors.forEach(function (v) {
        r.vendorList.push(v.name);

        v.fruitList.forEach(function(fruit) {
            if(r.fruitList[fruit.name]){
                r.fruitList[fruit.name].push({"vendor": v.name, "qty": fruit.qty});
            } else {
                r.fruitList[fruit.name] = [{"vendor": v.name, "qty": fruit.qty}];
            }
        });
    });

    return r;
}



// Child control to show meal items
// Note the parameter meal is the iterator, and changes with every new controller
app.controller("MealItemsCtrl", function MealItemsCtrl($scope) {
  $scope.itemPlural = $scope.meal + "s";
});
