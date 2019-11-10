'use strict';

/**
 *  generalFunction use to declare all useful function that could share globally accross
 *  the program
 * 
 *  @function calcDiscount Used to calculate the discount between the new price(cheaper) and the old price(more Expensive)
 * 
 * 
 * 
 */
function generalFunction($rootScope, $filter) {

    return {
        /**
         *
         * @function calcDiscount
         * 
         * @param {*} higherPrice   int     Usually the old Price which is more expensive
         * @param {*} lowerPrice    int     Usually the new Price which is less expensive  
         * @returns total discounted value
         */
        calcDiscount: function(higherPrice, lowerPrice) {
            return Math.round(((higherPrice - lowerPrice) / higherPrice) * 100);
        },
        myFunc2: function(param2){
            return param2;
        }
    }
}

angular
    .module('cannis')
    .factory('generalFunction', generalFunction);