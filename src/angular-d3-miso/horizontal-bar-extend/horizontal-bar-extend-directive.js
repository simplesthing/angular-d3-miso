'use strict';
(function(window, angular, undefined){
  function horizontalBarExtend(){
    return {
       require : '^d3Chart',
       link: function(scope, elem, attr, ctrl){
        var chart;
        elem.addClass('horizontal-bar-extend');

        function init(){
          // add chart to DOM
          chart = ctrl.config.svg.chart('HorizontalBarExtend', ctrl.config);

        }

        function update(config){
          // draw chart
          chart.draw(config.data);
        }

        // add event listeners
        ctrl.addInitListener(init.bind(this));
        ctrl.addUpdateListener(update.bind(this));
        // get data
        ctrl.config.update(ctrl.config);
       }
    };
  }

  horizontalBarExtend.$inject =[];

  angular.module('angularD3Miso')
  .directive('horizontalBarExtend', horizontalBarExtend);
})(window, window.angular);
