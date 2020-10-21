'use strict';

angular.module('cannis')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main.home', {
                url: 'home',
                controller: 'homeCtrl',
                templateUrl: 'app/homepage/homepage.html',
                resolve:{
                    hotDealData: function($q,bouquetApiService){

                        var deferred = $q.defer();

                        bouquetApiService.getBouquet({perpage:10000}).$promise.then(function (response) {
                            console.log("resolved");
                            console.log(response.content.data.dataList);
                            deferred.resolve(response.content.data.dataList);
                        }, function(error) {
                            console.log(error);
                            deferred.reject("cannot get bouquet list");
                        });

                        return deferred.promise;
                    }
                }
            });

    }]);