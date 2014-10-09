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
    $http( {method:'GET', url:'/services.json', params: { url: currentUrl }} )
      .success(function(data,status) {
        data.headline !== '' ? $scope.setHeadline(data.headline) : null
        $scope.services = data.services;
      })

    $scope.setHeadline = function(headline) {
      $scope.headline = headline;
      $('#extend-head').addClass('extend-service-bottom')
    }
  }
])