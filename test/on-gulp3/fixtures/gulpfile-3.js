'use strict';

var gulp = require('gulp');
var ghelp = require('../../..');

gulp.task('help1', function() {
  ghelp.show('help1');
}).help = function() {
  ghelp.show_task('help1');
};

gulp.task('help2', function() {
  ghelp.show('help2');
}).help = function() {
  ghelp.show_task('help2');
  ghelp.show_option('option');
};
