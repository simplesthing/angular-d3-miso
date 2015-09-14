'use strict';
(function (window, angular, undefined) {
  function horizontalBar() {
    return {
      require: '^d3Chart',
      link: function link(scope, elem, attr, ctrl) {
        var chart;
        elem.addClass('horizontal-bar');

        function init() {
          // add chart to DOM
          chart = ctrl.config.svg.chart('HorizontalBar', ctrl.config);
        }

        function update(config) {
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

  horizontalBar.$inject = [];

  angular.module('angularD3Miso').directive('horizontalBar', horizontalBar);
})(window, window.angular);