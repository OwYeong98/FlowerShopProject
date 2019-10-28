'use strict';

angular.module('cannis')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main.home', {
                url: 'home',
                controller: 'homeCtrl',
                templateUrl: 'app/homepage/homepage.html'
            });

    }]);