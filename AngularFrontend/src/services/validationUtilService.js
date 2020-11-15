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
function validationUtilService($rootScope, $filter) {

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
        pushToArrayIfNotEmpty: function(array,value){
            var isEmpty = value.length <=0;
            
            if(!isEmpty){
                array.push(value);
            }
        },
        isEmpty: function(name,value){
            var isEmpty = value.length <=0;
    
            if(isEmpty){
                return name + " cannot be empty!";
            }else{
                return "";
            }
        },
        isContainSpace: function(name,value){
    
            if(value.indexOf(" ") !== -1){
                return name + " cannot contain space!";
            }else{
                return "";
            }
        },
        isMatchRegex: function(value,regex,errorMsg){
    
            if(value.match(regex) !== null){
    
                return "";
            }else{
                return errorMsg;
            }
        },
        isNumber: function(name,value){
            var isNumber = !isNaN(parseFloat(value));
            
            if(!isNumber){
                return name + " must be integer!";
            }else{
                return "";
            }
        },
        isImage: function(name,imageName){
 
            var ext = imageName.split('.').pop();

            switch (ext.toLowerCase()) {
                case 'jpg':
                case 'bmp':
                case 'png':
                //etc
                return "";
            }
            return name+" must be image file type.(jpb,gif,bmp,png)";
              
        },
        checkCharMinMax: function(name,value,min,max){
 
            var length = value.length;

            if(max == -1){
                if(length < min){
                    return name+` must have at least ${min} character.`;
                }else{
                    return "";
                } 

            }else if(min ==-1){
                if(length > max){
                    return name+` must not exceed ${max} character.`;
                }else{
                    return "";
                }

            }else{
                if(length < min || length>max){
                    return name+` must have between ${min} to ${max} character.`;
                }else{
                    return "";
                } 
            }
        },
        checkAmountLargerThan: function(name,value,min){
 
            
            if(value >min){   
                return "";
            }else {
                return name+ " must be more than "+min;
            }
        }
    }
}

angular
    .module('cannis')
    .factory('validationUtilService', validationUtilService);