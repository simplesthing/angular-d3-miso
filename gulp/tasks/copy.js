'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
/**
 * Copy assets from /src to /build
 */
gulp.task('copy', function(){
  config.log('Copying assets --> /build');
  return  gulp
          .src(config.assets)
          .pipe($.memoryCache('assets'))
          .pipe(gulp.dest(config.build));
});
/**
 * Copy assets from /src to /dist
 */
gulp.task('copy:dist', function(){
  config.log('Copying assets --> /dist');
  config.assets.push( '!src/**/*.html');
  return  gulp
          .src(config.assets)
          .pipe(gulp.dest(config.dist));
});


