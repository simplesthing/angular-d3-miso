'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var path   = require('path');

/**
 * Compiles SASS in /src and writes output to /build
 * @return {Stream}
 */
gulp.task('styles', function(){
  config.log('Compiling SASS --> CSS');

  return  gulp
          .src(config.sass)
          .pipe($.memoryCache('styles'))
          .pipe($.sourcemaps.init())
          .pipe($.sass()).on('error', config.errorHandler('Sass'))
          .pipe($.autoprefixer()).on('error', config.errorHandler('Autoprefixer'))
          .pipe($.sourcemaps.write('../maps'))
          .pipe(gulp.dest(path.join(config.build, '/example/styles')))
          .pipe($.size({title:'styles', showFiles: true}));
});

/**
 * Compiles SASS in /src and writes minified output to /dist
 * @return {Stream}
 */
gulp.task('styles:dist', function(){
  config.log('Compiling SASS --> minifed CSS');

  return gulp.src(config.sassdist)
          .pipe($.sourcemaps.init())
          .pipe($.sass()).on('error', config.errorHandler('Sass'))
          .pipe($.autoprefixer()).on('error', config.errorHandler('Autoprefixer'))
          // .pipe($.csso())
          .pipe($.sourcemaps.write())
          .pipe(gulp.dest(path.join(config.dist)))
          .pipe($.size({title:'styles', showFiles: true}));
});
