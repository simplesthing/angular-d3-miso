'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});
var path   = require('path');
/**
 * Lint html files for errors, will not stop gulp stream on fail
 */
gulp.task('html', function(){
  config.log('Linting html');

  return  gulp
          .src(config.htmlTemplates)
          .pipe($.memoryCache('html'))
          .pipe($.htmlhint(config.htmlhint))
          .pipe($.htmlhint.reporter())
          .pipe(gulp.dest(path.join(config.build, '/app')))
          .pipe($.size({title:'html', showFiles: true}));
});
/**
 * Lint html files for errors, will stop gulp stream on fail
 */
gulp.task('html:dist', function(){
  config.log('Linting html');

  return gulp
          .src(config.htmlTemplates)
          .pipe($.htmlhint(config.htmlhint))
          .pipe($.htmlhint.failReporter())
          .pipe($.minifyHtml({empty: true}))
          .pipe($.angularTemplatecache(
            'templateCache.js',
            config.templateCache
          ))
          .pipe($.rev())
          .pipe(gulp.dest(path.join(config.dist, '/app')))
          .pipe($.size({title:'html', showFiles: true}));
});
/**
 * Lint html files on git commit and prevent commit on fail
 */
gulp.task('html:commit', function(){
  return  gulp
          .src(path.join(config.src, '/**/*.html'))
          .pipe($.htmlhint(config.htmlhint))
          .pipe($.htmlhint.reporter())
          .pipe(config.gitReporter('html'));
});
