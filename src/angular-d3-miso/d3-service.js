'use strict';
(function(window, angular, undefined){

  function d3(){
    return window.d3;
  }

  angular.module('d3Service', [])
  .factory('d3', d3);

})(window, window.angular);




