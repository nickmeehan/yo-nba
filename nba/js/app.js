var nbadex = angular.module('nbadex', []);

nbadex.controller('DirectoryCtrl', [ '$scope',
                                    '$filter',
                                    '$http',
  function($scope, $filter, $http) {
    $scope.services = [];
    $http( {method:'GET', url:'./../nba/services.json'} )
      .success(function(data,status) {
        $scope.services = data
      })
  }
])
