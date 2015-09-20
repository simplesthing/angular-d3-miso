'use strict';
d3.chart('HorizontalBar', {
  initialize: function initialize(config) {
    var chart = this;
    chart.config = config;
    chart.config.parent = this;
    chart.previousWidth = [];

    var base = this.base.append('g').attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

    this.layer('bars', base.append('g'), {
      dataBind: function dataBind(data) {
        return this.selectAll('rect').data(data, function (d) {
          return d.u;
        });
      },
      insert: function insert() {
        return this.insert('rect');
      },
      events: {
        'enter': function enter() {
          this.attr('transform', function (d, i) {
            return 'translate(' + chart.config.offsetLeft + ',' + chart.y(i) + ')';
          }).attr('width', function (d, i) {
            var width = chart.previousWidth[i] ? chart.previousWidth[i] : 0;
            return width;
          }).attr('height', chart.y.rangeBand()).attr('class', config.classname);
        },
        'enter:transition': function enterTransition() {
          chart.previousWidth = [];
          this.duration(500).attr('width', function (d) {
            var width = chart.x(d.y);
            chart.previousWidth.push(width);
            return width;
          });
        },
        'exit': function exit() {
          this.remove();
        }
      }
    });

    chart.positionInnerLabel = function (d) {
      var rectWidth = chart.x(d.y);
      var charWidth = 12;
      var margin = 3;
      var textX = d.y.toString().length * charWidth;
      var position = textX >= rectWidth ? rectWidth + margin : rectWidth - textX;
      d.color = textX >= rectWidth ? '#000000' : '#ffffff';
      return position;
    };

    this.layer('innerLabels', base.append('g'), {
      dataBind: function dataBind(data) {
        return this.selectAll('text').data(data, function (d) {
          return d.u;
        });
      },
      insert: function insert() {
        return this.insert('text');
      },
      events: {
        'enter': function enter() {
          this.attr('transform', function (d, i) {
            return 'translate(' + chart.config.offsetLeft + ',' + chart.y(i) + ')';
          }).attr('x', function (d) {
            return chart.positionInnerLabel(d);
          }).attr('y', chart.y.rangeBand() / 2).attr('fill', function (d) {
            return d.color;
          }).attr('dy', '.35em');
        },
        'enter:transition': function enterTransition() {
          this.duration(500).text(function (d) {
            return d.y;
          });
        },
        'exit': function exit() {
          this.remove();
        }
      }
    });

    this.layer('outerLabels', base.append('g'), {
      dataBind: function dataBind(data) {
        return this.selectAll('text').data(data, function (d) {
          return d.u;
        });
      },
      insert: function insert() {
        return this.insert('text');
      },
      events: {
        'enter': function enter() {
          this.attr('transform', function (d, i) {
            return 'translate(0,' + chart.y(i) + ')';
          }).attr('x', 0).attr('y', chart.y.rangeBand() / 2).attr('dy', '.35em').attr('opacity', 1).text(function (d) {
            return d.x;
          });
        },
        'exit': function exit() {
          this.remove();
        }
      }
    });
  },
  width: function width(newWidth) {
    if (!arguments.length) {
      return this.w;
    }
    this.w = newWidth;
    this.x.range([0, this.w - (this.config.offsetLeft + this.config.margin.left)]);
    this.base.attr('width', this.w);
    return this;
  },

  height: function height(newHeight) {
    if (!arguments.length) {
      return this.h;
    }
    this.h = newHeight;
    this.y.rangeRoundBands([0, this.h], 0.1);
    this.base.attr('height', this.h);
    return this;
  },
  transform: function transform(dataSrc) {
    var chart = this;
    var textLength = 50;
    var data = dataSrc.map(function (d) {
      var data = {};
      data.x = d[chart.config.xKey].length < textLength ? d[chart.config.xKey] : d[chart.config.xKey].substring(0, textLength) + '...';
      data.y = d[chart.config.yKey];
      data.u = Math.random(10);
      return data;
    });
    this.x = d3.scale.linear();
    this.y = d3.scale.ordinal();
    this.width(chart.config.width);
    this.height(chart.config.height);
    this.x.domain([0, d3.max(data, function (d) {
      return d.y;
    })]);
    this.y.domain(d3.range(0, data.length));
    return data;
  }
});
'use strict';
(function (window, angular, undefined) {
  angular.module('angularD3Miso', ['d3Service', 'ngAria', 'ngSanitize', 'ngResize']);
})(window, window.angular);
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
'use strict';
(function (window, angular, undefined) {
  function header() {
    return {
      require: '^d3Chart',
      replace: true,
      transclude: true,
      scope: true,
      template: '<header class="chart-header clearfix"><div class="title"><h1>{{title}}</h1></div><div class="data-toggle"><form class="form-inline"><div class="form-group><label for="data">Data Toggle</label>&nbsp;<select class="form-control" ng-model="selected" name="data" ng-change="changeSelection()"><option ng-repeat="opt in options">{{opt}}</option></select></div></form></div></header>',
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
'use strict';
(function (window, angular, undefined) {
  function footer() {
    return {
      require: '^d3Chart',
      replace: true,
      transclude: true,
      scope: true,
      template: '<footer class="chart-footer"><em ng-bind-html="footnote"></em></footer>',
      link: function link(scope, elem, attr, ctrl) {
        function update() {
          scope.footnote = ctrl.config.footnote;
        }
        ctrl.addUpdateListener(update.bind(this));
      }
    };
  }
  footer.$inject = [];

  angular.module('angularD3Miso').directive('chartFooter', footer);
})(window, window.angular);
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
'use strict';
(function (window, angular, undefined) {
  function ChartController() {
    var model = this;
    model.inits = [];
    model.updates = [];
    /**
     * Returns a default object for chart configuration
     * @return {Object} default settings for D3 chart
     */
    model.defaultConfig = function () {
      var config = {};
      config.margin = {
        top: 0,
        right: 15,
        bottom: 5,
        left: 15
      };
      config.width = 500;
      config.height = 500;
      return config;
    };
    /**
     * Initialize chart component by extending a config object and
     * chart defaults from the chart service and calculating a ratio
     * value based on the width and height parameters from config
     * @param  {Object} conf Config object
     */
    model.init = function (conf) {
      model.config = angular.extend(model.defaultConfig(), conf || {});
      model.config.ratio = Math.round(model.config.width / model.config.height * 1000) / 1000;
    };
    /**
    * fn to retrieve width of containerWidth
    * @param  {DOM Selector} elem CSS selector
    */
    model.containerWidth = function (conf) {
      var container = document.querySelector('#' + conf.id).parentNode;
      return container.offsetWidth;
    };
    /**
    * Determine width and height values based on the width of the
    * parent container and the ratio in the config object
    * @param  {Object} conf Config object
    */
    model.calculateDimensions = function (conf) {
      var containerWidth;
      containerWidth = model.containerWidth(conf);
      model.config.width = containerWidth - conf.margin.left - conf.margin.right;
      model.config.height = Math.round(containerWidth / model.config.ratio) - conf.margin.top - conf.margin.bottom;
    };
    /**
     * Adds function to set inits on graph
     * @param {function} observer callback function
     */
    model.addInitListener = function (observer) {
      model.inits.push(observer);
    };
    /**
     * Add function to update graph when data changes
     * @param {function} observer callback for updating graph
     */
    model.addUpdateListener = function (observer) {
      model.updates.push(observer);
    };
    /**
     * Execute transcluded chart directive update functions
     * @param  {Object} message Data and config objects to be used by transcluded chart directive update functions
     */
    model.notify = function (handler, message) {
      for (var i = model[handler].length - 1; i >= 0; i--) {
        model[handler][i](message);
      }
    };
  }

  angular.module('angularD3Miso').controller('ChartController', ChartController);
})(window, window.angular);
'use strict';
(function (window, angular, undefined) {

  function d3() {
    return window.d3;
  }

  angular.module('d3Service', []).factory('d3', d3);
})(window, window.angular);