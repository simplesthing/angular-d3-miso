'use strict';

var config     = require('../config');
var gulp       = require('gulp');
var $          = require('gulp-load-plugins')({lazy: true});
var packageObj = require('../../package.json');

gulp.task('apti-status', function(){
  var tokenVals = {
    appVersion     : packageObj.version,
    appDisplayName : config.deploy.displayName,
    appArtifact    : config.deploy.war
  };
  // add select values from the environment
  Object.keys(process.env).filter(function(k) {
    return /^(SVN|JENKINS|BUILD|GIT|git)/.test(k);
  }).forEach(function(k) {
    tokenVals[k] = process.env[k];
  });
  // function that will replace tokens using tokenVals
  function replaceTokens(val) {
    var token = val.replace(/^@@(.*)@@$/, '$1');
    if (tokenVals[token] !== undefined) {
      // console.log('token match', token, tokenVals[token]);
      return tokenVals[token];
    } else {
      // console.log('token not found', token);
      return val;
    }
  }

  config.log('apti-status - replacement data', JSON.stringify(tokenVals));

  return gulp.src(config.src + '/apti/status', {
        base: config.src
      })
      .pipe($.replace(/@@[\w\-]+@@/g, replaceTokens))
      .pipe(gulp.dest(config.dist))
      .pipe($.size({
        title: 'template',
        showFiles: true
      }));
});
