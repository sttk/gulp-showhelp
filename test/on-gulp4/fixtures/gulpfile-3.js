'use strict';

var gulp = require('gulp');
var ghelp = require('../../..');

gulp.task('help1', function(done) {
  ghelp.show('help1');
  done();
}).help = function() {
  ghelp.show_task('help1');
};

gulp.task('help2', function(done) {
  ghelp.show('help2');
  done();
}).help = function() {
  ghelp.show_task('help2');
  ghelp.show_option('option');
};
