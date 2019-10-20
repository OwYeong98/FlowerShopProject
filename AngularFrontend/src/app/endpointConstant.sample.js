angular.module('cannis').constant('endPointConstant', (function(){
    var ip = 'BACKEND_IP';

    return {
        environmentUrl: ip,
        baseUrl: '/',
        apiUrls: {
            login: ip + '/api/user/login',
            logout: ip + '/api/user/logout',
            order: {

            }

        }



    };



})());