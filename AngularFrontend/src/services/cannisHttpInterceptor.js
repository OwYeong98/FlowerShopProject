angular
    .module('cannis')
    .factory('httpInterceptor', function ($q, $rootScope, $injector,$state){
        return {
            // optional method
            'request': function(request) {
              var authService = $injector.get('$auth');
              
              //if There are no content type in header we add content type
              if(!"Content-Type" in request.headers){
                request.headers['Content-Type'] = 'application/json';
              }
              
              request.headers['Accept'] = 'application/json';
              request.headers['Authorization'] = "Bearer "+authService.getToken();
          
              // do something on success
              return request;
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

              if(!!rejection.config){
                  if(!!rejection.headers('authorization')){
                      console.log('Saving token');
                      $injector.get('$auth').setToken(rejection.headers('authorization', true));
                  }
              }
              // do something on error
              var authService = $injector.get('$auth');
              
              if(rejection.status === 409){
                  //reject another login was made
              }

              if(rejection.status === 401){
                message = 'session is expire';
                
                //tell satelizzer to remove token as the token is already expired
                authService.logout();

                alert('Session Expired! Please login again');

                $state.go("main.login")

              }

              if(rejection.status === 503){
                  //$injector.get('state').go('')

              }
              return $q.reject(rejection);
            }
          };
    });