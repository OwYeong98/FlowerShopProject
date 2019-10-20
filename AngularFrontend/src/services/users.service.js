'use strict';

angular.module('cannis.services.users', ['ngResource'])
    .factory('userLogout', function($resource, $filter, endPointConstant){
        return $resource(
            endPointConstant.apiUrls.logout,
            {

            },
            {
                'post': {method: 'POST'}
            }

        );
    });