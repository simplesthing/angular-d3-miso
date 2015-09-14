'use strict';

var config = require('../config');
var gulp   = require('gulp');

// Only applies for fonts from bower dependencies
gulp.task('fonts', function() {
  config.log('Copying fonts');

  return gulp.src(config.fonts)
    .pipe(gulp.dest(config.build + '/fonts'));
});
