'use strict';

angular.module('cannis')
    .directive('category', function () {
        return {
            templateUrl: 'components/category/categoryTemplate.html',
            controller: 'categoryCtrl',
            scope: {
                data: '='
            }
        };
    });