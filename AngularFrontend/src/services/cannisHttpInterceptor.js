angular
    .module('cannis')
    .factory('httpInterceptor', function ($q, $rootScope, $injector){
        return {
            // optional method
            'request': function(config) {
              // do something on success
              return config;
            },
        
            // optional method
           'requestError': function(rejection) {
              // do something on error
              if (canRecover(rejection)) {
                return responseOrNewPromise
              }
              return $q.reject(rejection);
            },
        
            // optional method
            'response': function(response) {
              // do something on success
              if(!!response){

                if(!!response.config){
                    if(!!response.headers('authorization')){
                        console.log('Saving token');
                        $injector.get('$auth').setToken(response.headers('authorization', true));
                    }
                }

              }
              return response;
            },
        
            // optional method
           'responseError': function(rejection) {
              // do something on error
              var auth = $injector.get('$auth');
              
              if(rejection.status === 409){
                  //reject another login was made
              }

              if(rejection.status === 401){
                message = 'session is expire';
                

              }

              if(rejection.status === 503){
                  //$injector.get('state').go('')

                  auth.logout();
              }
              return $q.reject(rejection);
            }
          };
    });