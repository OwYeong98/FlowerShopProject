"use strict";

angular.module("cannis").config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider.state("main.login", {
      url: "login",
      controller: "loginCtrl",
      templateUrl: "app/login/login.html"
    });
  }
]);
