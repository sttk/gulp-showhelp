'use strict';

var gulp = require('gulp');
var ghelp = require('../../..');

gulp.task('help1', function(done) {
  ghelp.show('help1');
  done();
}).help = function() {
  ghelp.showTask('help1');
};

gulp.task('help2', function(done) {
  ghelp.show('help2');
  done();
}).help = function() {
  ghelp.showTask('help2');
  ghelp.showOption('option');
};
