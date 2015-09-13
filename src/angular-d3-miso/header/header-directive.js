'use strict';
(function(window, angular, undefined){
  function header(){
    return {
      require     : '^d3Chart',
      replace     : true,
      transclude  : true,
      scope       : true,
      template    : '<div class="chart-header clearfix"><div class="title"><h1>{{title}}</h1></div><div class="data-toggle"><form class="form-inline"><div class="form-group><label for="data">Data Toggle</label>&nbsp;<select class="form-control"><option ng-repeat="opt in options">{{opt}}</option></select></div></form></div></div>',
      link        : function(scope, elem, attr, ctrl){
        // set directive specific scope variables
        scope.title   = ctrl.config.title;
        scope.options = ctrl.config.dataOptions;
      }
    };
  }
  header.$inject = [];

  angular.module('angularD3Miso')
  .directive('chartHeader', header);

})(window, window.angular);
