"use strict";

angular
  .module("cannis", [
    "ngAnimate",
    "ngCookies",
    "ngTouch",
    "ngSanitize",
    "ngResource",
    "ui.router",
    "ui.bootstrap",
    "ui.select",
    "ui.utils",
    "angular-loading-bar",
    "satellizer",
    "ngPatternRestrict",
    "cannis.services.users"
  ])
  .config(function(
    $stateProvider,
    $authProvider,
    $locationProvider,
    $httpProvider,
    cfpLoadingBarProvider,
    endPointConstant
  ) {
    $locationProvider.hashPrefix("");

    $authProvider.loginUrl = endPointConstant.apiUrls.login;
    $httpProvider.defaults.headers.common["Accept"] = "application/json";
    $httpProvider.interceptors.push("httpInterceptor");

    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.includeBar = false;

    $stateProvider.state("main", {
      url: "/",
      controller: "MainCtrl",
      templateUrl: "app/main/main.html",
      resolve: {
        authenticated: function($q, $location, $auth) {
          var deferred = $q.defer();

          if ($auth.isAuthenticated()) {
            //redirect to main page
            deferred.resolve(true);
          } else {
            deferred.resolve(false);
          }

          return deferred.promise;
        }
      }
    });
  })
  .run(function($rootScope, $location, $window, $state) {
    $rootScope.$on("$locationChangeSuccess", function(e, newUrl, oldUrl) {
      // Prevent $urlRouter's default handler from firing
      e.preventDefault();
    });
  });
