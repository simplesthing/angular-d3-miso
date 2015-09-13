(function(window, angular, undefined){
  function ExampleController(ExampleDataService){
    let model = this;

    model.people = {
      title: 'Demo',
      dataOptions: ['people', 'animals'],
      width: 1,
      height: 0.5,
      offsetLeft: 200,
      xKey: 'name',
      yKey: 'rank',
      classname: 'orange',
      update: function(config){
        ExampleDataService.people().then(function(response){
          model.people.data = response.data
        });
      }
    };

    model.animals = {
      width: 1,
      height: 0.5,
      offsetLeft: 140,
      xKey: 'name',
      yKey: 'years',
      classname: 'green',
      update: function(config){
        ExampleDataService.animals().then(function(response){
          model.animals.data = response.data
        });
      }
    };
  }

  ExampleController.$inject = ['ExampleDataService'];

  angular.module('angular-d3-miso-demo')
  .controller('ExampleController', ExampleController);
})(window, window.angular);
