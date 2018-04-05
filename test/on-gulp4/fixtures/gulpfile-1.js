'use strict';

var gulp = require('gulp');
var ghelp = require('../../..');

gulp.task('help', function(done) {
  ghelp.show();
  done();
}).help = 'shows a standard help message.';

gulp.task('help2', function(done) {
  ghelp.show('help2', '', 'all', null, 'mkdoc', 'compile', '', 'test');
  done();
}).help = 'shows a help message about specified tasks.';

gulp.task('help3', function(done) {
  var task = ghelp.getArgv('task', 't', 'x');
  if (task != null) {
    ghelp.show(task);
  } else {
    ghelp.show();
  }
  done();
}).help = {
  '': 'shows a help message about a task by a command argument.',
  '[ --task=t ]': 'specifys a task shown. Alias -t.'
};

gulp.task('help4', function(done) {
  ghelp.show(ghelp.taskNames().sort());
  done();
}).help = 'shows a help message which sorts task names.';

gulp.task('compile', function(done) {
  console.log('>>> compile');
  done();
}).help = {
  '': 'compiles source files.',
  '--srcs=(path pattern)': 'specifys a path pattern of source files.',
  '--dest=(file path)': 'specifys a file path.'
};

gulp.task('mkdoc', function(done) {
  console.log('>>> mkdoc');
  done();
}).help = 'make documents.';

gulp.task('test', function(done){
  console.log('>>> test');
  done();
}).help = function() {
  ghelp.showTask('test', 'tests modules.');
  ghelp.showOption('--case=(case ID)', 'specifys a test case ID.');
  var text = '\n' +
    '    Test case IDs:\n' +
    '        ID  :        description\n' +
    '      ------:-------------------------------------\n' +
    '      case1 : .... \n' +
    '      case2 : .... \n' +
    '      case3 : .... \n' +
    '';
  console.log(text);
};

gulp.task('all', gulp.series('compile', 'test'))
  .help = 'processes all tasks.';

gulp.task('default', gulp.parallel('all'));

