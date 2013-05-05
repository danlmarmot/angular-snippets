angular.module('timerApp', []);

angular.module('timerApp').config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

angular.module('timerApp').controller("timerCtrl", function ($scope, $timeout) {
    // Initial values
    $scope.currentTime = "Starting...";
    $scope.currentEpoch = Math.round(parseInt($scope.currentTime) / 1000);
    $scope.countdownInterval = 10;
    $scope.countdownTicker = $scope.countdownInterval;
    $scope.countdownTriggerCount = 0;
    $scope.pageLoadDate = Date.now();
    $scope.pageLoadedTimeAgo = "now";
    $scope.pageLoadedSecondsAgo = "0";
    
    $timeout(function oncePerSecondTask(){
        $scope.currentTime = Date.now();
        $scope.currentEpoch = Math.round(parseInt($scope.currentTime) / 1000);
        $timeout(oncePerSecondTask, 1000);

        $scope.pageLoadedTimeAgo = moment($scope.pageLoadDate).fromNow();
        $scope.pageLoadedSecondsAgo++;
    },1000);


    $timeout(function countdownTimer(){
        $scope.countdownTicker--;
        if ($scope.countdownTicker <= 0) {
            $scope.countdownTriggerCount++;
            $scope.countdownTicker = $scope.countdownInterval;
            //showAlert();
        }
        $timeout(countdownTimer, 1000);
    }, 1000);

});

function showAlert() {
    alert("Interval triggered!");
}