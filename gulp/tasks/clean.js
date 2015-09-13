'use strict';

var config = require('../config');
var gulp   = require('gulp');
var del    = require('del');

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done){
  config.log('Cleaning: ' + path);
  del(path, done);
}
/**
 * Clean build directory
 */
gulp.task('clean', function(){
  clean(config.build);
});
/**
 * Clean dist directory
 */
gulp.task('clean:dist', function(){
  clean(config.dist);
});
