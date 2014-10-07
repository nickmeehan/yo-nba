var subIndex = angular.module('subIndex', []);
var currentUrl = $(location).attr('href')
String.prototype.contains = function(subString) {
  return this.indexOf(subString) != -1
}

subIndex.controller('DirectoryCtrl', [ '$scope',
                                    '$filter',
                                    '$http',
  function($scope, $filter, $http) {
    $scope.services = [];
    if (currentUrl.contains('nba')) {
      $http( {method:'GET', url:'/nba/services.json'} )
        .success(function(data,status) {
          $scope.services = data
        })
    } else if (currentUrl.contains('cnet')) {
      $http( {method:'GET', url:'/cnet/services.json'} )
        .success(function(data,status) {
          $scope.services = data
        })
    }
  }
])