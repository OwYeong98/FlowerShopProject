"use strict";

function hotDealCtrl(
  $scope,
  $state,
  $rootScope,
  endPointConstant,
  generalFunction,
  $timeout
) {
  $scope.backendIp = endPointConstant.environmentUrl;

  $scope.nextPage = nextPage;
  $scope.previousPage = previousPage;
  $scope.calcDiscount = generalFunction.calcDiscount;
  /*
   * HACK!: Call $timeout without passing a delay
   *
   * The intention is to wait until the end of the $digest cycle.
   * Timeouts are called after $digest and all watches are done.
   *
   * For Some Reason:
   * Angularjs Scope will not work if initialize slick() is called before the $digest cycle.
   *
   */
  $timeout(function() {
    
    
    $(".carousel").slick({
      dots: true,
      slidesPerRow: 5,
      rows: 2,
      speed: 1000,
      cssEase: "ease-in-out",
      nextArrow: $("#hot-deal-right-arrow"),
      prevArrow: $("#hot-deal-left-arrow"),
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesPerRow: 5
          }
        },
        {
          breakpoint: 1000,
          settings: {
            slidesPerRow: 2
          }
        }
      ]
    });
  });
  
  function nextPage() {
    $(".hot-deal-leaf-img").addClass("hot-deal-leaf-move-left"); // add the animation class
    setTimeout(function() {
      $(".hot-deal-leaf-img").removeClass("hot-deal-leaf-move-left");
    }, 1000);
  }

  function previousPage() {
    $(".hot-deal-leaf-img").addClass("hot-deal-leaf-move-right"); // add the animation class
    setTimeout(function() {
      $(".hot-deal-leaf-img").removeClass("hot-deal-leaf-move-right");
    }, 1000);
  }

  function initialize() {}
  initialize();
}

hotDealCtrl.$inject = [
  "$scope",
  "$state",
  "$rootScope",
  "endPointConstant",
  "generalFunction",
  "$timeout"
];

angular.module("cannis").controller("hotDealCtrl", hotDealCtrl);
