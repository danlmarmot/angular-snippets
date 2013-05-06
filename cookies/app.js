// Load in ngCookies, as it is an external module
angular.module('cookieApp', ['ngCookies']);

angular.module('cookieApp').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('cookieApp').controller("cookieCtrl", function ($scope, $cookies) {
    // Initial values
    $scope.originalCookie = "Nada";
    $scope.cookie1Value  =  $scope.originalCookie;
    $scope.newCookieValue = "";
});
