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