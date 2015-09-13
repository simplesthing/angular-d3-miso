'use strict';

var $         = require('gulp-load-plugins')({lazy: true});
var mapStream = require('map-stream');
/**
 * Tests each file passed through jshint or htmlhint and checks for success:true
 * if any file fails it will exit the process with code 1 - Uncaught Fatal Exception
 * which will stop the git commit from executing
 */
module.exports = function(test){
    return mapStream(function(file, cb){
    if(test === 'js' ? !file.jshint.success : !file.htmlhint.success){
      $.util.colors.red('FAIL: ' + test);
      process.exit(1);
    }
    cb(null, file);
  });
};

