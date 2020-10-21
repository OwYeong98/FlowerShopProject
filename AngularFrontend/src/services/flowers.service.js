'use strict';

angular.module('cannis.services.flowers', ['ngResource'])
    .factory('flowerApiService', function($resource, $filter, endPointConstant){
        return $resource(
            endPointConstant.apiUrls.flower,
            {

            },
            {
                getFlower:{
                    url: endPointConstant.apiUrls.flower,
                    method: 'GET'
                },
                addFlower: {
                    url: endPointConstant.apiUrls.flower+"?_method=PUT",
                    method: 'POST',
                    headers: {'Content-Type':undefined},
                    params: {},
                    transformRequest: function(data, headersGetter) {
                        
                        
                        // And here begins the logic which could be used somewhere else
                        // as noted above.
                        if (data == undefined) {
                            return data;
                        }
                
                        var fd = new FormData();
                
                        var createKey = function(_keys_, currentKey) {
                            var keys = angular.copy(_keys_);
                            keys.push(currentKey);
                            var formKey = keys.shift();
                    
                            if (keys.length) {
                                formKey += "[" + keys.join("][") + "]"
                            }
                
                            return formKey;
                        }
                
                        var addToFd = function(object, keys) {
                        angular.forEach(object, function(value, key) {
                            var formKey = createKey(keys, key);
                
                            if (value instanceof File) {
                                fd.append(formKey, value);
                            } else if (value instanceof FileList) {
                            if (value.length == 1) {
                                fd.append(formKey, value[0]);
                            } else {
                                angular.forEach(value, function(file, index) {
                                fd.append(formKey + '[' + index + ']', file);
                                });
                            }
                            } else if (value && (typeof value == 'object' || typeof value == 'array')) {
                            var _keys = angular.copy(keys);
                            _keys.push(key)
                            addToFd(value, _keys);
                            } else {
                            fd.append(formKey, value);
                            }
                        });
                        }
                
                        addToFd(data, []);
                        
                
                        return fd;
                    }
                }
            }

        );
    });