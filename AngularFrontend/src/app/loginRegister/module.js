"use strict";

angular.module("cannis").config([
  "$stateProvider",
  function($stateProvider) {
    $stateProvider
      .state("main.login", {
        url: "login",
        controller: "loginCtrl",
        templateUrl: "app/loginRegister/login/login.html",
        params:{
          fromRegister: false
        }
      })
      .state("main.register",
      {
        url: "register",
        controller: "registerCtrl",
        templateUrl: "app/loginRegister/register/register.html",
        params:{
          fromLogin: false
        }
      });
  }
]);
