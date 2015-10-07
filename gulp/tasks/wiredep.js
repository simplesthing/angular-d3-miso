'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var $       = require('gulp-load-plugins')({lazy: true});
var path    = require('path');
var _       = require('lodash');

/**
 * Concat and minify bower dependencies to /dist/vendor
 * @return {Stream}
 */
gulp.task('wiredep', function(){
  config.log('Copying bower dependencies');

  var deps      = require('wiredep')();
  var jsFilter  = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return  gulp
          .src(_.flatten([deps.js, deps.css]))
          .pipe(jsFilter)
          .pipe($.concat('vendor.js'))
          .pipe($.ngAnnotate())
          .pipe($.uglify({
            preserveComments: $.uglifySaveLicense
          })).on('error', config.errorHandler('Uglify'))
          .pipe(jsFilter.restore())
          .pipe(cssFilter)
          .pipe($.concat('vendor.css'))
          .pipe($.csso()).on('error', config.errorHandler('CSSO'))
          .pipe(cssFilter.restore())
          // .pipe($.rev())
          .pipe(gulp.dest(path.join(config.build, '/example/vendor')));
});

