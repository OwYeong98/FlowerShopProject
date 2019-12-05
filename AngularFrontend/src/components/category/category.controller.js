'use strict';

function categoryCtrl($scope, $state, $rootScope, endPointConstant, generalFunction, $timeout) {

    var data = $scope.data;
    $scope.scaleSmallAfter = undefined;
    $scope.scaleLargeAfter = undefined;

    $scope.justifyCheck = justifyCheck;
    $(".product-category").mouseleave(
        function () {
            $(this).removeClass("hover");
        }
    );

    function justifyCheck() {
        var totalCategoryNum = data.length;
        var categoryPerRow = 3;

        var categoryRemainder = totalCategoryNum % categoryPerRow;

        
        if(categoryRemainder == 1){
            $scope.scaleSmallAfter =  (totalCategoryNum -( categoryPerRow + categoryRemainder) - 1) ; 
        }else{
            $scope.scaleLargeAfter =  (totalCategoryNum -( categoryRemainder) - 1) ; 
        }
        console.log('scaleSmallAfter : ' + $scope.scaleSmallAfter);
        console.log('scaleLargeAfter : ' + $scope.scaleLargeAfter);

    }

    justifyCheck();


}

categoryCtrl.$inject = ['$scope', '$state', '$rootScope', 'endPointConstant', 'generalFunction', '$timeout'];

angular.module('cannis')
    .controller('categoryCtrl', categoryCtrl);