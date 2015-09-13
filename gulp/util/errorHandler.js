'use strict';

var log = require('./log');

module.exports = function(title){
  return function(error){
    log('*** Start ' + title +'Error ***');
    log(error);
    log('*** End of Error ***');
    this.emit('end');
  };
};
