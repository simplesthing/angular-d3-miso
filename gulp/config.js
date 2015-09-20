'use strict';
// Dependencies
var log          = require('./util/log');
var errorHandler = require('./util/errorHandler');
var gitReporter  = require('./util/gitReporter');

// default config
var defaultConfig = {
    root         : './',
    src          : 'src',
    build        : 'build',
    dist         : 'dist',
    index        : 'src/example/index.html',
    app          : 'src/example',
    tests        : [
     'src/**/*.spec.js'
    ],
    js        : [
      'src/**/*.js',
      '!src/**/*.spec.js',
      '!src/**/*.mock.js'
    ],
    modulejs     : [
      'src/angular-d3-miso/**/*.js',
      '!src/angular-d3-miso/**/*.spec.js',
      '!src/angular-d3-miso/**/*.mock.js'
    ],
    gulpjs       : ['gulpfile.js', './gulp/**/*.js'],
    sass         : ['src/example/styles/styles.scss'],
    sassdist     : ['src/angular-d3-miso/angular-d3-miso.scss'],
    assets       : [
      'src/**/*.*',
      '!src/example/**/*.scss',
      '!src/**/*.js',
    ],
    log          : log,
    errorHandler : errorHandler,
    gitReporter  : gitReporter,
    inject       : {
      // ignorePath   : [ 'src', '../dist/' ],
      addRootSlash : false,
      relative     : true
    },
    wiredep      : {
      bowerJson    : require('../bower.json'),
      directory    : './bower_components/',
      ignorePath   : '../..',
      exclude      : [/bootstrap-sass-official\/.*\.js/, /bootstrap\.css/]
    },
    jshint        : '.jshintrc',
    htmlhint      : '.htmlhintrc',
    htmlTemplates  : ['src/**/*.html', '!src/example/index.html' ],
    templateCache : {
      module  : 'angular-d3-miso',
      root    : '/'
    }
};

module.exports = defaultConfig;
