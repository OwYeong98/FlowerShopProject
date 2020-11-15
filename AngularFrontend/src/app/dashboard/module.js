'use strict';

angular.module('cannis')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main.dashboard', {
                url: 'dashboard',
                controller: 'dashboardCrtl',
                templateUrl: 'app/dashboard/dashboard.html'
            });

    }]);