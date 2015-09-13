'use strict';

var config  = require('../config');
var path    = require('path');
var gulp    = require('gulp');
var karma   = require('karma');
var _       = require('lodash');
var wiredep = require('wiredep');
var concat  = require('concat-stream');


function listFiles(callback) {
  var wiredepOptions = _.extend({}, config.wiredep, {
    dependencies: true,
    devDependencies: true,
    stream: false
  });

  var bowerDeps = wiredep(wiredepOptions);

  var specFiles = [
    path.join(config.app, '/**/*.spec.js')
  ];

  var htmlFiles = [
    path.join(config.src, '/**/*.html')
  ];

  var srcFiles = [
    path.join(config.app, '/**/*.js')
  ].concat(specFiles.map(function(file){
    return '!' + file;
  }));

  var jsonFiles = [
    path.join(config.src, '/**/*.json')
  ];

  gulp.src(srcFiles)
    .pipe(concat(function(files){
      callback(bowerDeps.js
        .concat(path.join(config.root, '/node_modules/ng-describe/dist/ng-describe.js'))
        .concat(_.pluck(files, 'path'))
        .concat(htmlFiles)
        .concat(jsonFiles)
        .concat(specFiles));
    }));
}

function runTests(singleRun, done) {
  listFiles(function(files){
    karma.server.start({
      configFile  : path.join(__dirname, '../../karma.conf.js'),
      files       : files,
      singleRun   : singleRun,
      autoWatch   : !singleRun
    }, done);
  });
}

gulp.task('test', function(done) {
  runTests(true, done);
});
