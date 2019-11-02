'use strict';

angular.module('cannis')
    .directive('hotDeal', function () {
        return {
            templateUrl: 'components/hotDeal/hotDealTemplate.html',
            controller: 'hotDealCtrl',
            scope: {
                data: '='
            }
        };
    });