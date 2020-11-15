'use strict';

function dashboardCtrl($scope, $auth, $state, $rootScope, endPointConstant,validationUtilService,flowerApiService,bouquetApiService) {
    $scope.$emit("ignoreNavbarActionChanged", false);
    $scope.$emit("hamburgerColorChanged", "#304563");


    $scope.currentTab = 'AddFlower';

    $scope.bouquetCategoryList = ['WeddingFlower','ValentineFlower','GraduateFlower','FuneralFlower','FreshFlower','VisitingFlower'];
    
    $scope.finished = function(){
        setTimeout(()=>{
            $('#Select_FlowerUsedList').selectpicker();

            $('#Select_FlowerUsedList').selectpicker('refresh');
        },100)
        
    }



    $scope.addFlower = addFlower;
    $scope.addBouquet = addBouquet;

    refreshFlowerList();
    function refreshFlowerList(){
        flowerApiService.getFlower({perpage:10000}).$promise.then(function (response) {
            $scope.flowerList = response.content.data.dataList;
        }, function(error) {
            console.log(error);
        });
    }

    function addFlower(){
        var flowerName = $scope.flowerName || "";
        var flowerDesc = $scope.flowerDesc || "";
        var flowerImage = $scope.flowerImageInput;

        var flowerNameError = [];
        validationUtilService.pushToArrayIfNotEmpty(flowerNameError,validationUtilService.isEmpty("Flower Name",flowerName));
        validationUtilService.pushToArrayIfNotEmpty(flowerNameError,validationUtilService.checkCharMinMax("Flower Name",flowerName,4,-1));
        
        var flowerDescError = [];
        validationUtilService.pushToArrayIfNotEmpty(flowerDescError,validationUtilService.isEmpty("Flower Desc",flowerDesc));
        validationUtilService.pushToArrayIfNotEmpty(flowerDescError,validationUtilService.checkCharMinMax("Flower Desc",flowerDesc,30,-1));

        var flowerImageError = [];
        if(flowerImage == undefined){
            flowerImageError.push("Image cannot be empty!");
        }else{
            validationUtilService.pushToArrayIfNotEmpty(flowerImageError,validationUtilService.isImage("Flower Image",flowerImage[0].name));

        }
        

        $scope.flowerNameError = flowerNameError;
        $scope.flowerDescError = flowerDescError;
        $scope.flowerImageError = flowerImageError;


        var allErrorArray = [flowerNameError,flowerDescError,flowerImageError];
        var allError = [];
        for(var x of allErrorArray){
            allError = allError.concat(x);
        }

        if(allError.length <= 0){
            var f = document.getElementById('inputFlowerImage').files[0];
            console.log(f);
            var fd = new FormData();
            fd.append("image",f);   
  
           
            //show loading dialog
            Swal.fire({
                title: 'Adding',
                html: 'We are adding your flower to database.',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                willOpen: () => {
                Swal.showLoading()
                
                }
            })

            var x = flowerApiService.addFlower({name: flowerName,desc:flowerDesc,image:f}).$promise.then(function(){
                swal.close();
                Swal.fire({
                    type: 'success',
                    title: 'Added Successfully!',
                    text: 'The Flower has been added to database'
                });

                refreshFlowerList();
                $state.go($state.current, {}, {reload: true}); 

                
            }, function(errResponse) {
                swal.close();

                if(errResponse.status == 400){
                    var errorList= errResponse.data.content.error;

                    var errorMessage = "";
                    errorList.forEach(err => {
                        errorMessage += err +"\n";
                    });

                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Registration Detail',
                        text: errorMessage,
                        footer: '<a href>Why do I have this issue?</a>'
                    });
                }else if(errResponse.status == 403){
                    Swal.fire({
                        icon: 'error',
                        title: 'You are not an admin',
                        text: 'You does not have right to add flower'
                    });
                }
                
            });
            
            

        }

    }

    function addBouquet(){
        var bouquetName = $scope.bouquetName || "";
        var bouquetDesc = $scope.bouquetDesc || "";
        var bouquetPrice = $scope.bouquetPrice || "";
        var bouquetImageInput = $scope.bouquetImageInput;
        var bouquetCategory = $scope.bouquetCategory || "";
        var bouquetFlowerUsed = $scope.bouquetFlowerUsed || "";

        var bouquetNameError = [];
        validationUtilService.pushToArrayIfNotEmpty(bouquetNameError,validationUtilService.isEmpty("Bouquet Name",bouquetName));
        validationUtilService.pushToArrayIfNotEmpty(bouquetNameError,validationUtilService.checkCharMinMax("Bouquet Name",bouquetName,4,30));
        
        var bouquetDescError = [];
        validationUtilService.pushToArrayIfNotEmpty(bouquetDescError,validationUtilService.isEmpty("Bouquet Desc",bouquetDesc));
        validationUtilService.pushToArrayIfNotEmpty(bouquetDescError,validationUtilService.checkCharMinMax("Bouquet Desc",bouquetDesc,30,-1));

        var bouquetPriceError = [];
        validationUtilService.pushToArrayIfNotEmpty(bouquetPriceError,validationUtilService.isEmpty("Bouquet Price",bouquetPrice));
        validationUtilService.pushToArrayIfNotEmpty(bouquetPriceError,validationUtilService.checkAmountLargerThan("Bouquet Price",bouquetPrice,0));

        var bouquetImageError = [];
        if(bouquetImageInput == undefined){
            bouquetImageError.push("Image cannot be empty!");
        }else{
            validationUtilService.pushToArrayIfNotEmpty(bouquetImageError,validationUtilService.isImage("Bouquet Image",bouquetImageInput[0].name));
        }

        var bouquetCategoryError = [];
        validationUtilService.pushToArrayIfNotEmpty(bouquetCategoryError,validationUtilService.isEmpty("Bouquet Category",bouquetCategory));
        
        var bouquetFlowerUsedError = [];
        validationUtilService.pushToArrayIfNotEmpty(bouquetFlowerUsedError,validationUtilService.isEmpty("Flower Used",bouquetFlowerUsed));
        

        $scope.bouquetNameError = bouquetNameError;
        $scope.bouquetDescError = bouquetDescError;
        $scope.bouquetPriceError = bouquetPriceError;
        $scope.bouquetImageError = bouquetImageError;
        $scope.bouquetCategoryError = bouquetCategoryError;
        $scope.bouquetFlowerUsedError = bouquetFlowerUsedError;

        var allErrorArray = [bouquetNameError,bouquetDescError,bouquetPriceError,bouquetImageError,bouquetCategoryError,bouquetFlowerUsedError];
        var allError = [];
        for(var x of allErrorArray){
            allError = allError.concat(x);
        }

        if(allError.length <= 0){
            
            //show loading dialog
            Swal.fire({
                title: 'Adding',
                html: 'We are adding your Bouquet to database.',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                willOpen: () => {
                Swal.showLoading()
                
                }
            })

            var x = bouquetApiService.addBouquet({name: bouquetName,desc:bouquetDesc,price:bouquetPrice,image:bouquetImageInput[0],category :bouquetCategory,flowerList:bouquetFlowerUsed}).$promise.then(function(){
                swal.close();
                Swal.fire({
                    type: 'success',
                    title: 'Added Successfully!',
                    text: 'The bouquet had been added to database.'
                });

                $state.go($state.current, {}, {reload: true}); 

                
            }, function(errResponse) {
                swal.close();

                if(errResponse.status == 400){
                    var errorList= errResponse.data.content.error;

                    var errorMessage = "";
                    errorList.forEach(err => {
                        errorMessage += err +"\n";
                    });

                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Registration Detail',
                        text: errorMessage,
                        footer: '<a href>Why do I have this issue?</a>'
                    });
                }else if(errResponse.status == 403){
                    Swal.fire({
                        icon: 'error',
                        title: 'You are not an admin',
                        text: 'You does not have right to add flower'
                    });
                }
                
            });
            
            

        }
        
        

        

    }

    
    

}

dashboardCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', 'endPointConstant','validationUtilService','flowerApiService','bouquetApiService'];

angular.module('cannis')
    .controller('dashboardCrtl', dashboardCtrl);