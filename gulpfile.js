'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
//var ghelp = require('./src/index.js');
var ghelp = require('./index.js');

gulp.task('help', function() {
  var task = ghelp.get_argv('task', 't');
  if (task != null) {
    ghelp.show(task);
  } else {
    ghelp.show();
  }
}).help = {
  '': 'shows this help message.',
  '[ --task=t ]': 'specifys a task shown. Alias: -t.'
};

gulp.task('make', [ 'lint', 'uglify' ])
  .help = 'makes index.js file.';

gulp.task('lint', function() {
  gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('uglify', function() {
  gulp.src('src/index.js')
    .pipe(uglify())
    .pipe(gulp.dest('.'));
});

gulp.task('default', [ 'make' ]);
