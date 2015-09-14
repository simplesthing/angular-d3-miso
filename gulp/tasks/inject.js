'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var path   = require('path');
var series = require('stream-series');
var sort = require('sort-stream');
/**
 * Inject both JS, CSS into /build/index.html
 */
gulp.task('inject', function(){
  config.log('Injecting assets');

  var miso    = gulp
                .src([config.build + '/**/*.miso.js'])
                .pipe(sort(function (a, b) {
                  if (a > b) {return 1;}
                  if (a < b) {return -1;}
                  return 0;
                }));

  var injects = gulp
                .src([config.build + '/**/*.js','!'+config.build + '/**/*.miso.js', config.build + '/**/*.css'])
                .pipe($.if('*.js', $.angularFilesort()).on('error', config.errorHandler('AngularFilesort')));

  return  gulp
          .src(path.join(config.build, '/example/index.html'))
          .pipe($.inject(series(miso, injects), config.inject))
          .pipe(gulp.dest(path.join(config.build, '/example')));
});

