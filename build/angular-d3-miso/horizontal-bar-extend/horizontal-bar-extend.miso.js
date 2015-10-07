'use strict';
d3.chart('HorizontalBar').extend('HorizontalBarExtend', {
  initialize: function initialize(config) {
    var chart = this;

    function barsEnter() {
      this.attr('transform', function (d, i) {
        return 'translate(20,' + chart.y(i) + ')';
      });
    }
    this.layer('bars').on('enter', barsEnter);

    function innerLabelsEnter() {
      this.attr('transform', function (d, i) {
        return 'translate(0,' + chart.y(i) + ')';
      }).attr('x', 0).attr('fill', '#000000').attr('text-anchor', 'start');
    }
    this.layer('innerLabels').on('enter', innerLabelsEnter);

    function outerLabelsEnter() {
      this.attr('transform', function (d, i) {
        return 'translate(' + (chart.positionInnerLabel(d) + 50) + ',' + chart.y(i) + ')';
      });
    }
    this.layer('outerLabels').on('enter', outerLabelsEnter);
  }
});