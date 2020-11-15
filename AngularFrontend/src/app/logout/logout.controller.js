"use strict";

function logoutCtrl($scope, $auth, $state, $rootScope, $stateParams, endPointConstant,userAPIService) {
    $scope.$emit("ignoreNavbarActionChanged", false);
    $scope.$emit("hamburgerColorChanged", "#304563");

    $scope.isLogoutSuccessful = false;

    console.log("Logout controller refreshed")
      // success
    var x = userAPIService.logout().$promise.then(function(){
      //token already removed on server
      $auth.logout();
      $scope.isLogoutSuccessful=true;
    }, function(errResponse) {
      $scope.isLogoutSuccessful=true;
   });




}

logoutCtrl.$inject = [
  "$scope",
  "$auth",
  "$state",
  "$rootScope",
  "$stateParams",
  "endPointConstant",
  "userAPIService"
];

angular.module("cannis").controller("logoutCtrl", logoutCtrl);
