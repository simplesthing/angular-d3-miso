'use strict';

var config     = require('../config');
var gulp       = require('gulp');
var $          = require('gulp-load-plugins')({lazy: true});

gulp.task('war', function(){
  return gulp.src([config.dist + '/**/*'])
    .pipe($.war({
      welcome: 'index.html',
      displayName: config.deploy.displayName,
    }))
    .pipe($.zip(config.deploy.war))
    .pipe(gulp.dest(config.dist))
    .pipe($.size({
      title: 'war',
      showFiles: true
  }));
});
