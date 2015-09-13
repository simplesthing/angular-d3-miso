'use strict';

var $ = require('gulp-load-plugins')({lazy: true});

module.exports = function log(msg){
  /**
  * Log a message or series of messages using chalk's blue color.
  * Can pass in a string, object or array.
  */
  if (typeof(msg) === 'object') {
      for (var item in msg) {
          if (msg.hasOwnProperty(item)) {
              $.util.log($.util.colors.blue(msg[item]));
          }
      }
  } else {
      $.util.log($.util.colors.blue(msg));
  }

};
