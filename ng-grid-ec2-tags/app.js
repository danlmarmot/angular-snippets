var app = angular.module("plunker", ["ngGrid"]);

app.controller('MainCtrl', function($scope, $timeout) {
  $scope.cellInputEditableTemplate = '<input ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-blur="updateEntity(row)" />';
  $scope.cellSelectEditableTemplate = '<select ng-class="\'colt\' + col.index" ng-input="COL_FIELD" ng-model="COL_FIELD" ng-options="id as name for (id, name) in statuses" ng-blur="updateEntity(row)" />';
  $scope.list = [
    { instance: 'i-11111111', name: 'Web1', env: 'prod', role: 'web' },
    { instance: 'i-22222222', name: 'App1', env: 'prod', role: 'app' },
    { instance: 'i-33333333', name: 'DB1', env: 'qa', role: 'db' }
  ];

  $scope.gridOptions = {
    data: 'list',
    enableRowSelection: false,
    enableCellEditOnFocus: true,
    multiSelect: false, 
    columnDefs: [
      { field: 'instance',
        displayName: 'Instance',
        enableCellEdit: false
      },
      { field: 'name',
        displayName: 'Name',
        enableCellEditonFocus: true,
        editableCellTemplate: $scope.cellInputEditableTemplate
      },
      { field: 'env',
        displayName: 'Enviroment',
        enableCellEditOnFocus: true,
        editableCellTemplate: $scope.cellInputEditableTemplate
      },
      { field: 'role',
        displayName: 'Role',
        enableCellEditOnFocus: true,
        editableCellTemplate: $scope.cellSelectEditableTemplate
       }
    ]
  };
  
  $scope.updateEntity = function(row) {
    if(!$scope.save) {
      $scope.save = { promise: null, pending: false, row: null };
    }
    $scope.save.row = row.rowIndex;
    if(!$scope.save.pending) {
      $scope.save.pending = true;
      $scope.save.promise = $timeout(function(){
        // $scope.list[$scope.save.row].$update();
        console.log("Here you'd save your record to the server, we're updating row: " 
                    + $scope.save.row + " to be: " 
                    + $scope.list[$scope.save.row].instance + ","
                    + $scope.list[$scope.save.row].name + ","
                    + $scope.list[$scope.save.row].env + ","
                    +  $scope.list[$scope.save.row].role + ",");
        $scope.save.pending = false; 
      }, 500);
    }    
  };
})

.directive('ngBlur', function () {
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
})
