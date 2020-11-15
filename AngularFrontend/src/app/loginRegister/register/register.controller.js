'use strict';

function registerCtrl($scope, $auth, $state, $rootScope, $stateParams, endPointConstant,userAPIService,validationUtilService) {
    $scope.$emit('ignoreNavbarActionChanged', false);
    $scope.$emit('hamburgerColorChanged', '#304563');

    $scope.redirectToLogin = redirectToLogin;
    $scope.registerAccount = registerAccount;


    
    function registerAccount() {
        var username = $scope.username || "";
        var password = $scope.password || "";
        var retypePassword = $scope.retypePassword || "";
        var email = $scope.emailAdd || "";
        var dateOfBirth = $scope.dateOfBirth || "";
        var phoneNo = document.querySelector("#registerPhoneNum").value || "";
        
        var usernameError = [];
        validationUtilService.pushToArrayIfNotEmpty(usernameError,validationUtilService.isContainSpace("Username",username));
        validationUtilService.pushToArrayIfNotEmpty(usernameError,validationUtilService.isEmpty("Username",username));

        var passwordError = [];
        validationUtilService.pushToArrayIfNotEmpty(passwordError,validationUtilService.isEmpty("Password",password));
        validationUtilService.pushToArrayIfNotEmpty(passwordError,validationUtilService.isMatchRegex(password,/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[#$@!%&*?])[0-9a-zA-Z\d#$@!%&*?]{8,30}$/,"Password must contain uppercase,lowercase,specialchar,number and between 8 to 30 char."));


        var retypePasswordError = [];
        if(password !== retypePassword){
            retypePasswordError.push("Confirm password does not match with password!");
        }

        var emailError = [];
        validationUtilService.pushToArrayIfNotEmpty(emailError,validationUtilService.isEmpty("Email",email));
        validationUtilService.pushToArrayIfNotEmpty(emailError,validationUtilService.isMatchRegex(email,/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"Email not valid!"));

        var dateOfBirthError = [];
        validationUtilService.pushToArrayIfNotEmpty(dateOfBirthError,validationUtilService.isEmpty("Date Of Birth",dateOfBirth));

        var phoneNoError = [];
        validationUtilService.pushToArrayIfNotEmpty(phoneNoError,validationUtilService.isEmpty("Phone No",phoneNo));
        validationUtilService.pushToArrayIfNotEmpty(phoneNoError,validationUtilService.isNumber("Phone No",phoneNo));

        var allErrorArray = [usernameError,passwordError,retypePasswordError,emailError,dateOfBirthError,phoneNoError];
        var allError = [];
        for(x of allErrorArray){
            allError = allError.concat(x);
        }
       

        $scope.usernameError = usernameError;
        $scope.passwordError = passwordError;
        $scope.retypePasswordError = retypePasswordError;
        $scope.emailError = emailError;
        $scope.dateOfBirthError = dateOfBirthError;
        $scope.phoneNoError = phoneNoError;
        if(allError.length <= 0){
            var dateOfBirthObj = new Date(Date.parse(dateOfBirth));
            var year=dateOfBirthObj.getFullYear();

            //we want month and date in two digit for example 9 become 09
            var month=dateOfBirthObj.getMonth()<10?"0"+dateOfBirthObj.getMonth():dateOfBirthObj.getMonth();
            var date=dateOfBirthObj.getDate()<10?"0"+dateOfBirthObj.getDate():dateOfBirthObj.getDate();

            var formmatedDateOfBirth = `${year}-${month}-${date}`;
            
            //show loading dialog
            Swal.fire({
                title: 'Registering',
                html: 'We are registering your account.',
                allowEscapeKey: false,
                allowOutsideClick: false,
                timerProgressBar: true,
                willOpen: () => {
                  Swal.showLoading()
                  
                }
              })


            var x = userAPIService.register({name: username,email:email,password:password,phoneNo:phoneNo,birthDate:formmatedDateOfBirth}).$promise.then(function(){
                swal.close();
                Swal.fire({
                    type: 'success',
                    title: 'Registered Successfully!',
                    text: 'Please Check your Inbbx to verify your email.'
                  });

                  $state.go("main.login");
              }, function(errResponse) {
                swal.close();

                if(errResponse.status == 403){
                    var errorList= errResponse.data.content.error;

                    var errorMessage = "";
                    errorList.forEach(err => {
                        errorMessage += err +"\n";
                    });

                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid Registration Detail',
                        text: errorMessage,
                        footer: '<a href>Why do I have this issue?</a>'
                      });
                }
                
             });
        }

    }

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

registerCtrl.$inject = ['$scope', '$auth', '$state', '$rootScope', '$stateParams', 'endPointConstant','userAPIService','validationUtilService'];

angular.module('cannis')
    .controller('registerCtrl', registerCtrl);