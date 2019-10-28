'use strict';

angular.module('cannis')
    .config(['$stateProvider', function($stateProvider) {
        $stateProvider
            .state('main.user', {
                url: 'user',
                abstract: true,
                controller: 'userCtrl',
                template: '<ui-view></ui-view>',
                resolve: {
                    test: function ($q, $state, $rootScope, $auth){

                        if(!$auth.isAuthenticated()) {
                            console.log('not authenticated from Main.user');
                            $state.go('main');
                        }
                    }
                }




            })

    }]);