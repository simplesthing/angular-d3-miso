'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var path   = require('path');
var sort   = require('sort-stream');

/**
 * Lint app JS for errors, transpile ES6 to ES5 and copy to /build
 */
gulp.task('scripts', function(){
  config.log('Linting and transpiling js');

  return  gulp
          .src(config.js)
          .pipe($.babel()).on('error', config.errorHandler('Babel'))
          .pipe($.memoryCache('js'))
          .pipe($.jshint())
          .pipe($.jshint.reporter('jshint-stylish'))
          .pipe(gulp.dest(config.build))
          .pipe($.size({title:'scripts', showFiles: true}));
});
/**
 * Lint gulpfile for errors
 */
gulp.task('jshint:gulp', function(){
  config.log('Linting gulp files');

    return  gulp
           .src(config.gulpjs)
           .pipe($.memoryCache('gulpjs'))
           .pipe($.jshint())
           .pipe($.jshint.reporter('jshint-stylish'));
});
/**
 * Lint, minify, transpile and copy app JS to /dist
 */
gulp.task('scripts:dist', function(){
  config.log('Linting, minifying and transpiling js');

  return  gulp
          .src(config.js)
          .pipe($.jshint())
          .pipe($.jshint.reporter('jshint-stylish'))
          .pipe($.jshint.reporter('fail'))
          .pipe($.babel())
          .pipe($.ngAnnotate())
          .pipe($.if('*.miso.js', sort(function (a, b) {
                  if (a > b) {return 1;}
                  if (a < b) {return -1;}
                  return 0;
                }), $.angularFilesort())
          )

          // .pipe()
          .pipe($.concat('app.js'))
          .pipe($.uglify({
            mangle: false
          })).on('error', config.errorHandler('Uglify'))
          .pipe($.rev())
          .pipe(gulp.dest(config.dist + '/app'))
          .pipe($.size({title:'scripts', showFiles: true}));
});
/**
 * Run on git commit on all js files in project to check for errors and prevent commit on fail
 */
gulp.task('scripts:commit', function(){
  return gulp
          .src(path.join(config.src, '/**/*.js'))
          .pipe($.jshint(config.jshint))
          .pipe($.jshint.reporter('jshint-stylish'))
          .pipe(config.gitReporter('js'));
});
