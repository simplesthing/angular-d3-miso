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