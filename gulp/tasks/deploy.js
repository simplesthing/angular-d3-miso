'use strict';

var config = require('../config');
var gulp   = require('gulp');
var $      = require('gulp-load-plugins')({lazy: true});

gulp.task('deploy', function(){
  return gulp
          .src(config.build+ '/example/**/*.*')
          .pipe($.ghPages());

});
