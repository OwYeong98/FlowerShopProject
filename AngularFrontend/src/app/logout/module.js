"use strict";

angular.module("cannis").config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider
      .state("main.logout", {
        url: "logout",
        controller: "logoutCtrl",
        templateUrl: "app/logout/logout.html"
      });
  }
]);
