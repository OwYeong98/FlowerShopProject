'use strict';

angular.module('cannis.services.users', ['ngResource'])
    .factory('userAPIService', function($resource, $filter, endPointConstant){
        return $resource(
            "/Api",
            {

            },
            {
                logout: {
                    url: endPointConstant.apiUrls.logout,
                    method: 'POST'
                },
                register: {
                    url: endPointConstant.apiUrls.register,
                    method: 'POST',
                    params: {name: "",email:"",password:"",phoneNo:"",birthDate:""}
                }
            }

        );
    });