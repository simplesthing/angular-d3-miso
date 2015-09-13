'use strict';
(function(window, angular, undefined){
  function ExampleDataService($http){
    let model = this;
    model.people = function(){
      return $http.get('data/top-10-influential-people-who-never-lived.json');
    }
    model.animals = function(){
      return $http.get('data/10-species-that-are-surprisingly-ancient.json');
    };

    return model;
  }

  ExampleDataService.$inject = ['$http'];

  angular.module('angular-d3-miso-demo')
  .service('ExampleDataService', ExampleDataService);

})(window, window.angular);
