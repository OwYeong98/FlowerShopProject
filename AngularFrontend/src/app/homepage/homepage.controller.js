'use strict';

function homeCtrl($scope, $auth, $state, $rootScope, endPointConstant) {
    var username;
    var password;

    $scope.username = username;
    $scope.password = password;
    $scope.hotDealData = [
        {
            name: 'Flower 1',
            price: 100,
            imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

        },
        {
            name: 'Flower 2',
            price: 200,
            imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

        },
        {
            name: 'Flower 3',
            price: 300,
            imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

        },
        {
            name: 'Flower 4',
            price: 400,
            imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

        },
        {
            name: 'Flower 1',
            price: 100,
            imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

        },
        {
            name: 'Flower 2',
            price: 200,
            imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

        },
        {
            name: 'Flower 3',
            price: 300,
            imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

        },
        {
            name: 'Flower 4',
            price: 400,
            imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

        },
        {
            name: 'Flower 1',
            price: 100,
            imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

        },
        {
            name: 'Flower 2',
            price: 200,
            imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

        },
        {
            name: 'Flower 3',
            price: 300,
            imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

        },
        {
            name: 'Flower 4',
            price: 400,
            imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

        },
        {
            name: 'Flower 1',
            price: 100,
            imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

        },
        {
            name: 'Flower 2',
            price: 200,
            imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

        },
        {
            name: 'Flower 3',
            price: 300,
            imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

        },
        {
            name: 'Flower 4',
            price: 400,
            imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

        },
        {
            name: 'Flower 1',
            price: 100,
            imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

        },
        {
            name: 'Flower 2',
            price: 200,
            imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

        },
        {
            name: 'Flower 3',
            price: 300,
            imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

        },
        {
            name: 'Flower 4',
            price: 400,
            imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

        }

    ];


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