'use strict';
(function (window, angular, undefined) {
  function header() {
    return {
      require: '^d3Chart',
      replace: true,
      transclude: true,
      scope: true,
      template: '<header class="chart-header clearfix"><div class="title"><h1>{{title}}</h1></div><div class="data-toggle" ng-show="selected"><form class="form-inline"><div class="form-group><label for="data">Data Toggle</label>&nbsp;<select class="form-control" ng-model="selected" name="data" ng-change="changeSelection()"><option ng-repeat="opt in options">{{opt}}</option></select></div></form></div></header>',
      link: function link(scope, elem, attr, ctrl) {
        scope.selected = ctrl.config.selected;
        scope.changeSelection = function () {
          ctrl.config.selected = scope.selected;
          ctrl.config.update(ctrl.config);
        };
        function update() {
          scope.title = ctrl.config.title;
          scope.options = ctrl.config.dataOptions;
        }
        ctrl.addUpdateListener(update.bind(this));
      }
    };
  }
  header.$inject = [];

  angular.module('angularD3Miso').directive('chartHeader', header);
})(window, window.angular);