'use strict';

var config  = require('../config');
var gulp    = require('gulp');
var wiredep = require('wiredep').stream;
var $       = require('gulp-load-plugins')({lazy: true});
var path    = require('path');
var _       = require('lodash');

/**
 * Wire-up the bower dependencies from bower.json and write out to /build/index.html
 * @return {Stream}
 */
gulp.task('wiredep', function(){
  config.log('Adding bower dependencies');

  return gulp
        .src(config.index)
        .pipe(wiredep(config.wiredep))
        .pipe(gulp.dest('build/example'));
});
/**
 * Concat and minify bower dependencies to /dist/vendor
 * @return {Stream}
 */
gulp.task('wiredep:dist', function(){
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
            mangle: false,
            // compress: false,
            preserveComments: $.uglifySaveLicense
          })).on('error', config.errorHandler('Uglify'))
          .pipe(jsFilter.restore())
          .pipe(cssFilter)
          .pipe($.concat('vendor.css'))
          .pipe($.csso()).on('error', config.errorHandler('CSSO'))
          .pipe(cssFilter.restore())
          .pipe($.rev())
          .pipe(gulp.dest(path.join(config.dist, '/vendor')));
});

