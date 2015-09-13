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
      '!src//**/*.spec.js',
      '!src//**/*.mock.js'
    ],
    gulpjs       : ['gulpfile.js', './gulp/**/*.js'],
    sass         : ['src/example/styles/styles.scss'],
    images       : ['src/example/images/**/*.*', '!src/example/images/sprites/*.*'],
    assets       : [
      'src/**/*.*',
      '!src/example/images/sprites/*.*',
      '!src/**/*.html',
      '!src/example/index.html',
      '!src/example/**/*.scss',
      '!src/**/*.js',
    ],
    fonts        : ['./bower_components/fontawesome/fonts/**/*.*', './bower_components/bootstrap-sass-official/assets/fonts/**/*.*'],
    sprites      : 'src/example/images/sprites/**/*.{png,jpg,gif}',
    log          : log,
    errorHandler : errorHandler,
    gitReporter  : gitReporter,
    inject       : {
      ignorePath   : [ 'src', '../dist/' ],
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
