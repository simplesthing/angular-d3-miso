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

  var vendor = gulp
                .src([config.build+'/vendor/**/*.js', config.build, '/vendor/**/*.css']);

  var miso    = gulp
                .src([config.build + '/example/**/*.miso.js'])
                .pipe(sort(function (a, b) {
                  if (a > b) {return 1;}
                  if (a < b) {return -1;}
                  return 0;
                }));

  var injects = gulp
                .src([config.build + '/example/**/*.js','!'+config.build + '/example/**/*.miso.js', config.build + '/example/**/*.css'])
                .pipe($.if('*.js', $.angularFilesort()).on('error', config.errorHandler('AngularFilesort')));

  return  gulp
          .src(path.join(config.build, '/example/index.html'))
          .pipe($.inject(series(vendor, miso, injects), config.inject))
          .pipe(gulp.dest(path.join(config.build, '/example')));
});

