'use strict';
// Karma configuration
// Generated on Mon Jun 15 2015 12:37:42 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'jasmine-matchers'],


    // list of files / patterns to load in the browser
    files: [
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.html'              : 'ng-html2js',
      'src/**/*.json'              : 'ng-json2js',
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'src/**/!(*.spec.js|*.html)' : ['coverage', 'babel']
    },


    // Report test that are slower than timeout period (60000)
    reportSlowerThan: 500,


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      // Reports are available in the following formats:
      // html - produces a bunch of HTML files with annotated source code
      // cobertura - produces a cobertura-coverage.xml file for easy Hudson integration
      // text-summary - produces a compact text summary of coverage, typically to console
      // text - produces a detailed text table with coverage for all files
      // teamcity - produces service messages to report code coverage to TeamCity
      // clover - produces a clover.xml file to integrate with Atlassian Clover
      reporters: [{
        type: 'html',
        dir: './coverage/'
      }, {
        type: 'text',
        dir: './coverage/'
      }, {
        type: 'cobertura',
        dir: './coverage/',
        file: 'coverage.xml'
      }]
    },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // failure after no activity in browser
    browserNoActivityTimeout: 30000,


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    // singleRun: false

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
    },

    ngJson2JsPreprocessor: {
      cacheIdFromPath: function(filepath) {
        // var newPath = filepath.replace('src/assets/json', 'assets/');
        console.log('json2js', filepath);
        return filepath;
      }
    }
  });
};
