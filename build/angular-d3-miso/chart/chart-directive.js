'use strict';
(function (window, angular, undefined) {
  /**
   * @ngdoc   directive
   * @name    d3Chart
   * @description
   * The chart directive is a wrapper for creating composable, reusable charts
   * The markup should look something like following the pattern where the
   * "d3-chart" directive wraps chart components (in this case header, bars, footer)
   * <d3-chart data="some.value" config="some.value">
   *   <chart-header></chart-header>
   *   <chart-bars></chart-bars>
   *   <chart-footer></chart-footer>
   * </d3-chart>
   * It should do the following things
   * - Determine containing DOM width
   * - Determine chart width and height
   * - Append the chart SVG to the DOM
   * - Listen for changes in data or DOM size changes and redraw chart when required
   * - Should proxy customizations from view controller
   * Required Arguments
   * @param {Object} config Configuration Object
   * @param {Object} id     unique id DOM attribute
   */
  function chart(resize) {
    return {
      replace: true,
      controller: 'ChartController',
      controllerAs: 'ctrl',
      bindToController: true,
      scope: {
        config: '=',
        id: '@'
      },
      link: function link(scope, elem, attr, ctrl) {
        elem.addClass('d3-chart');

        ctrl.config.id = ctrl.id;
        ctrl.init(ctrl.config);
        ctrl.calculateDimensions(ctrl.config);

        var width = ctrl.config.width + ctrl.config.margin.left;
        var height = ctrl.config.height + ctrl.config.margin.top + ctrl.config.margin.bottom;

        ctrl.config.svg = d3.select('#' + ctrl.config.id + ' > ' + ctrl.config.chart).append('svg').attr('width', width).attr('height', height).attr('transform', 'translate(' + ctrl.config.margin.left + ', 0)');

        ctrl.notify('inits', ctrl.config.id);

        scope.$watch('ctrl.config.data', function (newval, oldval) {
          if (newval && newval !== undefined) {
            ctrl.notify('updates', ctrl.config);
          }
        });
        scope.$on('resize', function ($event, msg) {
          ctrl.calculateDimensions(ctrl.config);
          ctrl.notify('updates', ctrl.config);
        });
      }
    };
  }

  chart.$inject = ['resize'];

  angular.module('angularD3Miso').directive('d3Chart', chart);
})(window, window.angular);