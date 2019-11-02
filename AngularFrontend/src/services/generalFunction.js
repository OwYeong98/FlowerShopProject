'use strict';

function generalFunction($rootScope, $filter) {

    return {
        myFunc1: function(param) {
            return param;
        },
        myFunc2: function(param2){
            return param2;
        }
    }
}

angular
    .module('cannis')
    .factory('generalFunction', generalFunction);