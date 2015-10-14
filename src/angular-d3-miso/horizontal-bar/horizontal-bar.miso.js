'use strict';
d3.chart('HorizontalBar', {
  initialize: function(config) {
    let chart = this;
    this.config = config;
    this.config.parent = this;
    this.previousWidth = [];

    let base = this.base.append('g')
      .attr('transform', 'translate(' + config.margin.left + ',' + config.margin.top + ')');

    this.layer('bars', base.append('g'), {
      dataBind: function(data){
        return this.selectAll('rect').data(data, function(d){return d.u;});
      },
      insert: function(){
        return this.insert('rect');
      },
      events: {
        'enter': function(){
          this.attr('transform', function(d, i) { return 'translate('+ chart.config.offsetLeft +',' + chart.y(i) + ')';})
            .attr('width', function(d, i){
              let width = chart.previousWidth[i] ? chart.previousWidth[i] : 0;
              return width;
            })
            .attr('height', chart.y.rangeBand())
            .attr('class', config.classname);
        },
        'enter:transition': function(){
          chart.previousWidth = [];
          this.duration(500)
            .attr('width', function(d){
              let width = chart.x(d.y);
              chart.previousWidth.push(width);
              return width;
            });
        },
        'exit': function(){
           this.remove();
       }
      }
    });

    chart.positionInnerLabel = function(d) {
      let rectWidth = chart.x(d.y) ;
      let charWidth = 12;
      let margin    = 3;
      let textX     = d.y.toString().length * charWidth;
      let position  = textX >= rectWidth  ? rectWidth + margin : rectWidth - textX;
      d.color   = textX >= rectWidth  ? '#000000' : '#ffffff';
      return position;
    };

    this.layer('innerLabels', base.append('g'), {
      dataBind: function(data){
        return this.selectAll('text').data(data, function(d){return d.u;});
      },
      insert: function(){
        return this.insert('text');
      },
      events: {
        'enter': function(){
          this.attr('transform', function(d,i) { return 'translate('+ chart.config.offsetLeft +',' + chart.y(i) + ')';})
            .attr('x', function(d) { return  chart.positionInnerLabel(d);})
            .attr('y', chart.y.rangeBand()/2)
            .attr('fill', function(d){ return d.color; })
            .attr('dy', '.35em');
        },
        'enter:transition': function(){
          this.duration(500)
            .text(function(d) { return d.y; });
        },
        'exit': function(){
           this.remove();
       }
      }
    });

    this.layer('outerLabels', base.append('g'), {
      dataBind: function(data){
        return this.selectAll('text').data(data, function(d){return d.u;});
      },
      insert: function(){
        return this.insert('text');
      },
      events: {
        'enter': function(){
          this.attr('transform', function(d,i) { return 'translate(0,' + chart.y(i) + ')'; })
            .attr('x', 0)
            .attr('y', chart.y.rangeBand()/2)
            .attr('dy', '.35em')
            .attr('opacity', 1)
            .text(function(d) { return d.x; });
        },
        'exit': function(){
           this.remove();
       }
      }
    });

  },
  width: function(newWidth) {
    if (!arguments.length) {
      return this.w;
    }
    this.w = newWidth;
    this.x.range([0, (this.w - (this.config.offsetLeft + this.config.margin.left))]);
    this.base.attr('width', this.w);
    return this;
  },

  height: function(newHeight) {
    if (!arguments.length) {
      return this.h;
    }
    this.h = newHeight;
    this.y.rangeRoundBands([0, this.h], 0.1);
    this.base.attr('height', this.h);
    return this;
  },
  transform: function(dataSrc) {
      let chart = this;
      let textLength = 50;
      let data  = dataSrc.map(function(d){
        let data = {};
        data.x   = d[chart.config.xKey].length < textLength ? d[chart.config.xKey] : d[chart.config.xKey].substring(0,textLength) +'...';
        data.y   = d[chart.config.yKey];
        data. u = Math.random(10);
        return data;
      });
      this.x = d3.scale.linear();
      this.y = d3.scale.ordinal();
      this.width(chart.config.width);
      this.height(chart.config.height);
      this.x.domain([0, d3.max(data, function(d){ return d.y; })]);
      this.y.domain(d3.range(0, data.length));
      return data;
  }
});
