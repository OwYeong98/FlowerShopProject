'use strict';

function homeCtrl($scope, $auth, $state, $rootScope, endPointConstant) {
    var username;
    var password;

    $scope.username = username;
    $scope.password = password;

    $scope.loginPopUp = loginPopUp;
    $scope.submit = submit;
    $scope.logout = logout;

    function submit() {
        $auth.login({ email: $scope.username, password: $scope.password })
            .then(function (response) {
                //success request will come here

                $scope.token = $auth.getToken();
            })
            .catch(function (error) {
                //error request respond come here
            })
    }

    function logout() {
        console.log('loggin out');
        userLogout.post(
            {

            },
            function (resources) {
                console.log('successfully loggedout');
            },
            function (error) {

            }
        )
    }


    function loginPopUp() {
        console.log('clicked');
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            windowClass: 'show',
            templateUrl: '/components/loginPopUp/loginPopUpModal.html',
            controller: 'loginPopUpCtrl'
        });

    }


}

userCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', 'endPointConstant'];

angular.module('cannis')
    .controller('homeCtrl', homeCtrl);