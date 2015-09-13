'use strict';

var config      = require('../config');
var gulp        = require('gulp');
var $           = require('gulp-load-plugins')({lazy: true});
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var path        = require('path');


gulp.task('watch', function(){
  config.log('Watching source files');
  // SASS
  $.watch(path.join(config.src, '/**/*.scss'), $.batch(function(events){
     events.on(['change'], runSequence('styles',reload));
  }))
  .on('change',  $.memoryCache.update('styles'));
  // JS
  $.watch(config.js, {events: ['change']}, $.batch(function(events){
    events.on(['change'], runSequence('scripts', reload));
  }));
  $.watch(config.js, {events: ['unlink', 'add']}, $.batch(function(events){
    events.on(['unlink','add'], runSequence( 'build'));
  }))
  .on(['add', 'change', 'unlink'],  $.memoryCache.update('js'));
  // ASSETS
  $.watch(config.assets, $.batch(function(events){
    events.on(['add', 'change'], runSequence('copy', reload));
  }))
  .on(['add', 'change'], $.memoryCache.update('assets'));
  // GULPFILES
  $.watch(config.gulpjs, $.batch(function(events){
  events.on(['add', 'change'], runSequence('jshint:gulp', reload));
  }))
  .on(['add', 'change'], $.memoryCache.update('gulpjs'));
  // BOWER
  $.watch( ['./bower.json'], $.batch(function(events){
    events.on(['change'], runSequence('build', reload));
  }));
  // TESTS
  $.watch(config.tests, $.batch(function(events){
    events.on(['add', 'change'], runSequence('test'));
  }));
  // HTML
  $.watch(path.join(config.src, '/**/*.html'), $.batch(function(events){
    events.on(['add', 'change'], runSequence('html', reload));
  }))
  .on(['add', 'change'], $.memoryCache.update('html'));
});
