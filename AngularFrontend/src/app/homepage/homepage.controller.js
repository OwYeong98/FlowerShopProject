'use strict';

function homeCtrl($scope, $auth, $state, $rootScope, endPointConstant,bouquetApiService,hotDealData) {
    
    // $scope.hotDealData = [
    //     {
    //         name: 'Flower 1',
    //         price: 100,
    //         imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png',
    //         prevPrice: 150

    //     },
    //     {
    //         name: 'Flower 2',
    //         price: 200,
    //         imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png',
    //         prevPrice: 400

    //     },
    //     {
    //         name: 'Flower 3',
    //         price: 300,
    //         imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

    //     },
    //     {
    //         name: 'Flower 4',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 5',
    //         price: 100,
    //         imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

    //     },
    //     {
    //         name: 'Flower 6',
    //         price: 200,
    //         imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

    //     },
    //     {
    //         name: 'Flower 7',
    //         price: 300,
    //         imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

    //     },
    //     {
    //         name: 'Flower 8',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 9',
    //         price: 100,
    //         imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

    //     },
    //     {
    //         name: 'Flower 10',
    //         price: 200,
    //         imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

    //     },
    //     {
    //         name: 'Flower 11',
    //         price: 300,
    //         imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

    //     },
    //     {
    //         name: 'Flower 12',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 13',
    //         price: 100,
    //         imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

    //     },
    //     {
    //         name: 'Flower 14',
    //         price: 200,
    //         imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

    //     },
    //     {
    //         name: 'Flower 15',
    //         price: 300,
    //         imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

    //     },
    //     {
    //         name: 'Flower 16',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 17',
    //         price: 100,
    //         imgUrl: 'https://i.ibb.co/1mBXBPs/Flower-Template1.png'

    //     },
    //     {
    //         name: 'Flower 18',
    //         price: 200,
    //         imgUrl: 'https://i.ibb.co/Lgn7WyX/Flower-Template2.png'

    //     },
    //     {
    //         name: 'Flower 19',
    //         price: 300,
    //         imgUrl: 'https://i.ibb.co/4MnbdWW/Flower-Template3.png'

    //     },
    //     {
    //         name: 'Flower 20',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 21',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     },
    //     {
    //         name: 'Flower 22',
    //         price: 400,
    //         imgUrl: 'https://i.ibb.co/QDhmML2/Flower-Template4.png'

    //     }

    // ];

    
    $scope.category = [
        {
            name: 'Wedding Flower',
            imgUrl: 'https://i.ibb.co/ZgLJGH3/wedding.png',

        },
        {
            name: 'Valentine Day',
            imgUrl: 'https://i.ibb.co/zhR7Xhh/valentine.png',

        },
        {
            name: 'Graduate Flower',
            imgUrl: 'https://i.ibb.co/gWrv9Mx/graduate.png'

        },
        {
            name: 'Funeral Flower',
            imgUrl: 'https://i.ibb.co/cDQyDFn/funeral.jpg'

        },
        {
            name: 'Fresh Flower',
            imgUrl: 'https://i.ibb.co/DktPcRg/flower.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visiting.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visiting.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visiting.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visiting.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visiting.png'

        },
        {
            name: 'Visiting Flower',
            imgUrl: 'https://i.ibb.co/FqLzYzb/visi  ting.png'

        }
    ];  
    $scope.hotDealData = hotDealData;
    console.log(hotDealData);

    // function refreshHotDealData(){
    //     bouquetApiService.getBouquet({perpage:10000}).$promise.then(function (response) {
    //         $scope.hotDealData = response.content.data.dataList;
    //     }, function(error) {
    //         console.log(error);
    //     });
    // }

    function initialize() {
        $scope.$emit('ignoreNavbarActionChanged', true);
        $scope.$emit('hamburgerColorChanged', 'white');
    }

    
    initialize();
}

homeCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', 'endPointConstant','bouquetApiService','hotDealData'];

angular.module('cannis')
    .controller('homeCtrl', homeCtrl);