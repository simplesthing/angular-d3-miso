'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({lazy: true});
var sprity      = require('sprity');
var path        = require('path');
var runSequence = require('run-sequence');
/**
 * Create a sprite sheet out of images in /images/sprites
 */
gulp.task('images', function(){
  return sprity.src({
    src       : config.sprites,
    style     : '_sprite.scss',
    processor : 'sass'
  })
  .pipe($.if('*.{png,jpg,gif}', gulp.dest(path.join(config.src, '/images')), gulp.dest(path.join(config.src, '/styles'))));
});
/**
 * Compress images and move to /dist
 * Callback for images:dist
 */
function imagemin(){
  return gulp
          .src(config.images)
          .pipe($.imagemin({
            progressive : true
          }))
          .pipe(gulp.dest(path.join(config.dist, '/images')));
}
/**
 * Create sprites and move to /dist
 */
gulp.task('images:dist', function(){
  return  runSequence('images', imagemin);
});
