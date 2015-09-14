'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var runSequence = require('run-sequence');

/**
 * Build project but do not serve or watch
 */
gulp.task('build', function(){
  config.log('Building source --> /build');

  runSequence(
    'clean:dist',
    ['scripts:dist', 'styles:dist']
  );
});
