function MainCtrl($scope, $state, $auth, $rootScope, $http, $uibModal){

    $scope.navBarTemplateUrl = '../../components/navigationBar/navbar.html';

    var username;
    var password;

    $scope.username = username;
    $scope.password = password;

    $scope.loginPopUp = loginPopUp;
    $scope.submit = submit;

    function submit(){
        console.log('zz');
    }

    function loginPopUp(){
        console.log('clicked');
        $scope.modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            windowClass: 'show',
            templateUrl: '/components/loginPopUp/loginPopUpModal.html',
            controller :'loginPopUpCtrl'
        });

    }


}

MainCtrl.$inject = [
    '$scope', '$state', '$auth', '$rootScope', '$http', '$uibModal'
];

angular.module('cannis')
    .controller('MainCtrl', MainCtrl);