"use strict";

function loginCtrl($scope, $auth, $state, $rootScope, $stateParams, endPointConstant) {
  console.log("ahahaha");
  $scope.$emit("ignoreNavbarActionChanged", false);
  $scope.$emit("hamburgerColorChanged", "#304563");
  // jQuery & Velocity.js
  var username;
  var password;

  $scope.username = username;
  $scope.password = password;
  $scope.submit = submit;
  $scope.logout = logout;
  $scope.redirectToRegister = redirectToRegister;

  function slideUpIn() {
    $("#login").velocity("transition.slideUpIn", 1250);
  }

  function slideLeftIn() {
    $(".username-row")
      .delay(500)
      .velocity("transition.slideLeftIn", { stagger: 500 });
    $(".password-row")
      .delay(500)
      .velocity("transition.slideLeftIn", { stagger: 500 });
  }

  function shake() {
    $(".password-row").velocity("callout.shake");
  }

  function animateIntro(){
    //animate HTML element through velocity.js
    if(!!$stateParams.fromRegister){
        
        $("#login").velocity("transition.slideLeftIn", 1250);
        $(".username-row").delay(500).velocity("transition.slideLeftIn", {stagger: 500});
        $(".password-row").delay(500).velocity("transition.slideLeftIn", {stagger: 500});
    } else {
        
        $("#login").velocity("transition.slideUpIn", 1250);
        $(".username-row").velocity("transition.slideLeftIn");
        $(".password-row").velocity("transition.slideLeftIn");
    }
}

  function submit() {
    if (!$scope.username) {
      //username cannot be empty
      return;
    }

    if (!$scope.password) {
      //password cannot be empty
      shake();
      return;
    }
    $auth
      .login({ email: $scope.username, password: $scope.password })
      .then(function(response) {
        //success request will come here

        $scope.token = $auth.getToken();
      })
      .catch(function(error) {
        //error request respond come here
      });
  }

  function logout() {
    console.log("loggin out");
    userLogout.post(
      {},
      function(resources) {
        console.log("successfully loggedout");
      },
      function(error) {}
    );
  }

  function redirectToRegister() {
    $("#login").velocity("transition.slideLeftOut", {
      complete: function(elements) {
        $state.go("main.register", {'fromLogin': true});
      }
    });
  }

  function initialize() {
    animateIntro();
  }

  initialize();

  // function loginPopUp() {
  //     console.log('clicked');
  //     $scope.modalInstance = $uibModal.open({
  //         ariaLabelledBy: 'modal-title',
  //         ariaDescribedBy: 'modal-body',
  //         windowClass: 'show',
  //         templateUrl: '/components/loginPopUp/loginPopUpModal.html',
  //         controller: 'loginPopUpCtrl'
  //     });

  // }
}

loginCtrl.$inject = [
  "$scope",
  "$auth",
  "$state",
  "$rootScope",
  "$stateParams",
  "endPointConstant"
];

angular.module("cannis").controller("loginCtrl", loginCtrl);
