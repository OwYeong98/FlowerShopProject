'use strict';

function registerCtrl($scope, $auth, $state, $rootScope, $stateParams, endPointConstant) {
    $scope.$emit('ignoreNavbarActionChanged', false);
    $scope.$emit('hamburgerColorChanged', '#304563');
    console.log("agga");

    $scope.redirectToLogin = redirectToLogin;
    
    function redirectToLogin() {
        $(".redirect-login").velocity("fadeOut",1250);
        $("#register").velocity("transition.slideRightOut", {
          complete: function(elements) {
            $state.go("main.login", {'fromRegister': true});
          }
        });
      }

    function animateIntro(){
        //animate HTML element through velocity.js
        if(!!$stateParams.fromLogin){
            
            $("#register").velocity("transition.slideRightIn", 1250);
            $(".redirect-login").velocity("fadeIn",1250);
            $(".register-field").velocity("transition.slideLeftIn");
        } else {
            
            $("#register").velocity("transition.slideUpIn", 1250);
            $(".redirect-login").velocity("fadeIn",1250);
            $(".register-field").velocity("transition.slideLeftIn");
        }
    }

    function initialize() {
        console.log($stateParams.fromLogin);
        animateIntro();

        var input = document.querySelector("#registerPhoneNum");

        var iti = window.intlTelInput(input, {
            initialCountry: 'my',
            onlyCountries: [
                'ad', 'ae', 'af', 'ag', 'al', 'am', 'ao', 'ar', 'as', 'at', 'au', 'aw', 'ba',
                'bb', 'bd', 'be', 'bf', 'bg', 'bj', 'bm', 'bn','bo', 'br', 'bs', 'bt', 'bw',
                'by', 'bz', 'ca', 'cd', 'cf', 'cg', 'ch', 'ci','ck','cl','cm','co','cr','cv',
                'cw','cy','cz','de','dj','dk','dm','do','dz','ec','eg','es','et','fi','fj',
                'fk','fm','fo','fr','ga','gb','gd','ge','gf','gg','gh','gi','gl','gm','gp',
                'gq','gr','gt','gy','hk','hn','hr','ht','hu','id','ie','il','im','in','iq',
                'it','je','jm','jo','jp','ke','kg','kh','km','kn','kr','kw','ky','kz','la',
                'lb','lc','li','lk','ls','lt','lu','lv','ly','ma','md','me','mf','mg','mk',
                'mm','mn','mo','ms','mt','mu','mw','mx','my','mz','na','nc','ne','nf','ng',
                'ni','nl','no','np','nz','om','pa','pe','pg','ph','pk','pl','pm','pr','ps',
                'pt','py','qa','re','ro','rs','ru','rw','sa','sc','sd','se','sg','sh','si',
                'sk','sl','sn','sr','st','sv','sy','sz','tc','tg','th','tl','tm','to','tr',
                'tt','tw','tz','ua','ug','us','uy','uz','vc','ve','vg','vi','vn','ws','ye',
                'yt','za','zm','zw'
            ],
            preferredCountries:[
                'my', 'sg', 'th', 'id'
            ],
            utilsScript: "../../../../node_modules/intl-tel-input/build/js/utils.js?1562189064761",
        });
        iti.promise.then(function() {
            /* Note:
             * Jquery AlphaNum plugin is used as the ng-pattern-restrict is not working well.
             * With the intl-tel-input plugin
             */
            $('#registerPhoneNum').numeric("positiveInteger");
        });
    }

    initialize();

}

registerCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', '$stateParams', 'endPointConstant'];

angular.module('cannis')
    .controller('registerCtrl', registerCtrl);