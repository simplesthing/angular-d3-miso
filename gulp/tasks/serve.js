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

/**
 * Create a development build and serve files from /build
 */
gulp.task('serve', function(){
  runSequence(
    'clean',
    ['build', 'scripts'],
    ['wiredep', ],
    'copy',
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
