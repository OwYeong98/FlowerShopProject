'use strict';

function dashboardCtrl($scope, $auth, $state, $rootScope, endPointConstant) {
    $scope.$emit("ignoreNavbarActionChanged", false);
    $scope.$emit("hamburgerColorChanged", "#304563");

    $scope.currentTab = 'AddFlower';

    $scope.bouquetCategoryList = ['WeddingFlower','ValentineFlower','GraduateFlower','FuneralFlower','FreshFlower','VisitingFlower'];
    $scope.flowerList = ['SunFlower','MoreFlower','Flower'];
    
    $scope.finished = function(){
        setTimeout(()=>{
            console.log("Refresed")
            $('#Select_FlowerUsedList').selectpicker();

            $('#Select_FlowerUsedList').selectpicker('refresh');
        },100)
        
    }


    
    

}

dashboardCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', 'endPointConstant'];

angular.module('cannis')
    .controller('dashboardCrtl', dashboardCtrl);