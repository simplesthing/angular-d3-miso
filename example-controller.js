'use strict';

(function (window, angular, undefined) {
  function ExampleController(ExampleDataService) {
    var model = this;

    model.people = {
      title: '10 Influential People Who Never Existed',
      footnote: 'Data examples were obtained from <a href="http://listverse.com/2008/11/03/top-10-influential-people-who-never-lived/" target="_blank">listverse.com</a>',
      offsetLeft: 200,
      xKey: 'name',
      yKey: 'rank',
      classname: 'orange'
    };

    model.animals = {
      title: '10 Species That Are Surprisingly Ancient',
      footnote: 'Data examples were obtained from <a href="http://listverse.com/2015/07/02/10-species-that-are-surprisingly-ancient/" target="_blank">listverse.com</a>',
      offsetLeft: 140,
      xKey: 'name',
      yKey: 'years',
      classname: 'green'
    };

    model.chart = {
      chart: 'horizontal-bar',
      dataOptions: ['people', 'animals'],
      selected: 'people',
      width: 1,
      height: 0.5,
      update: function update(config) {
        model.chart = angular.extend(config, model[config.selected]);
        ExampleDataService[config.selected]().then(function (response) {
          model.chart.data = response.data;
        });
      }
    };

    model.monsters = {
      title: 'Ten Japanese Monsters That Will Kill You',
      chart: 'horizontal-bar-extend',
      footnote: '<h4>Click <a href="http://listverse.com/2015/09/13/10-japanese-monsters-that-will-kill-you/" target="_blank">here</a> for data source.</h4>',
      width: 1,
      height: 0.5,
      offsetLeft: 200,
      xKey: 'name',
      yKey: 'rank',
      classname: 'blue',
      update: function update(config) {
        ExampleDataService.monsters().then(function (response) {
          model.monsters.data = response.data;
        });
      }
    };
  }

  ExampleController.$inject = ['ExampleDataService'];

  angular.module('angular-d3-miso-demo').controller('ExampleController', ExampleController);
})(window, window.angular);