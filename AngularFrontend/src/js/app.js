angular.module('CannisProject',[
    'ngRoute'
])
.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/',{
                templateUrl: 'views/home.html',
                controller: 'HomeCtrl'
            })
    }
])