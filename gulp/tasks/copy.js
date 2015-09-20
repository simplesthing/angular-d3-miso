'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
/**
 * Copy assets from /src to /build
 */
gulp.task('copy', function(){
  config.log('Copying --> /build');

  gulp.src(config.assets)
          .pipe($.memoryCache('assets'))
          .pipe(gulp.dest(config.build));

  return  gulp
          .src(config.dist+'**/*.*')
          .pipe($.memoryCache('module'))
          .pipe(gulp.dest(config.build+'/example'));
});
