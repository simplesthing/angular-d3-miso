'use strict';
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var spa         = require('browser-sync-spa');
var runSequence = require('run-sequence');

browserSync.use(spa({
  selector: '[ng-app]' // Only needed for angular apps
}));

function serveCallback() {
  browserSync.instance = browserSync.init({
      startPath: '/example/index.html',
      notify  : false,
      port    : 3000,
      server: {
        baseDir    : ['build', './']
      }
  });
}

function serveDistCallback() {
  browserSync.instance = browserSync.init({
      startPath: '/example/index.html',
      notify  : false,
      port    : 3000,
      server: {
        baseDir    : ['dist']
      }
  });
}

/**
 * Create a development build and serve files from /build
 */
gulp.task('serve', function(){
  runSequence(
    'clean',
    'copy',
    ['wiredep', 'scripts'],
    // 'images',
    'styles',
    'html',
    'inject',
    'watch',
    serveCallback
  );
});
gulp.task('serve:build', function(){
  serveCallback();
});

/**
 * Create a production build and serve from /dist
 */
gulp.task('serve:dist', function(){
  runSequence(
    'clean:dist',
    'wiredep:dist',
    // 'images:dist',
    ['scripts:dist', 'styles:dist', 'html:dist', 'fonts:dist'],
    'copy:dist',
    'inject:dist',
    serveDistCallback
  );
});

gulp.task('serve:test', function(){
  serveDistCallback();
});
