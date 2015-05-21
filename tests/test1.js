'use strict';

var gulp = require('gulp');
var ghelp = require('../index.js');

gulp.task('help', function() {
  var task = ghelp.getArgv('task', 't', 'x');
  if (task != null) {
    ghelp.show(task);
  } else {
    ghelp.show();
  }
}).help = {
  '': 'show this help message.',
  '[ --task=t ]': 'specifys a task shown. Alias -t.'
};

gulp.task('task0', function() {
}).help = 'task 0.';

gulp.task('task_1', function() {
}).help = {
  '': 'task 1.',
};

gulp.task('task__2', function() {
}).help = {
  '': 'task 2.',
  '--opt': 'an option.'
};

gulp.task('task___3', function() {
}).help = function() {
  ghelp.showTask('task___3', 'task 3.');
};

gulp.task('task4', function() {
}).help = function() {
  console.log('--task4--');
  ghelp.showOption('-o', 'an option.');
};

gulp.task('task5', function() {
});
