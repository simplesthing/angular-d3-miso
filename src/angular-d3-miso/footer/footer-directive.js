'use strict';
(function(window, angular, undefined){
  function footer(){
    return {
      require     : '^d3Chart',
      replace     : true,
      transclude  : true,
      scope       : true,
      template    : '<footer class="chart-footer"><em ng-bind-html="footnote"></em></footer>',
      link        : function(scope, elem, attr, ctrl){
        function update(){
          scope.footnote = ctrl.config.footnote;
        }
        ctrl.addUpdateListener(update.bind(this));
      }
    };
  }
  footer.$inject = [];

  angular.module('angularD3Miso')
  .directive('chartFooter', footer);

})(window, window.angular);
