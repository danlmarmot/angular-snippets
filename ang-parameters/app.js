var app = angular.module('myApp', []);

app.service('ConfigService', ["$window", function ($window) {
  return   $window.brekkie;
  }])

app.service('config', function($window) {
  return $window.brekkie;
})

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
});

// Child control to show meal items
// Note the parameter meal is the iterator, and changes with every new controller
app.controller("MealItemsCtrl", function MealItemsCtrl($scope) {
  $scope.itemPlural = $scope.meal + "s";
});