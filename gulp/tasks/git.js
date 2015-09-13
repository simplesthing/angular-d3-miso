'use strict';

var gulp        = require('gulp');
var runSequence = require('run-sequence');
/**
 * Tasks to run before committing to git, if any fail commit prevented
 */
gulp.task('git', function(){
  runSequence('scripts:commit', 'html:commit');
});
