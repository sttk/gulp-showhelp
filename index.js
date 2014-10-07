(function(){
  'use strict';

  var gulp = require('gulp');
  var gutil = require('gulp-util');

  var originalTaskFn = gulp.task;
  gulp.task = function() {
    originalTaskFn.apply(gulp, arguments);
    var name = arguments[0];
    return gulp.tasks[name];
  };

  module.exports = new function() {
    this.show = _show;
    this.show_task = _show_task;
    this.show_option = _show_option;

    var _indentSize = 2;
    var _tabSize = 0;
    
    function _show(taskname /* ... */) {
      var args = (arguments.length > 0) ?
        Array.prototype.slice.call(arguments) :
        Object.getOwnPropertyNames(gulp.tasks);

      var hasOption = false;

      for (var i=0; i<args.length; i++) {
        var name = args[i];
        if (name == null) { continue; }

        var task = gulp.tasks[name];
        if (task == null) { continue; }
        if (typeof(task.help) == 'undefined') { continue; }

        _tabSize = Math.max(_tabSize, name.length);
        if (typeof(task.help) == 'object') {
          for (var option in task.help) {
            if (option == null || option === '') { continue; }
//            _tabSize = Math.max(_tabSize, option.length + 2);
            hasOption = true;
          }
        }
      }

      var msg = '\n' + gutil.colors.bold('Usage') + '\n';
      msg += '  gulp ' + gutil.colors.cyan('task');
      if (hasOption) {
        msg += ' [ ' + gutil.colors.green('option ...') + ' ]';
      }
      msg += '\n\n';
      msg += gutil.colors.bold('Tasks');
      console.log(msg);

      ARG: for (var i=0; i<args.length; i++) {
        var name = args[i];
        if (name == null || name === '') { console.log(); continue; }

        var task = gulp.tasks[name];
        switch (typeof(task.help)) {
        case 'undefined': continue ARG;
        case 'function': _exec_func(task.help, 2, _tabSize); break;
        case 'object': _show_map(name, task.help, _tabSize); break;
        case 'string': _show_task(name, task.help, _tabSize); break;
        }
      }

      console.log();
    };

    function _exec_func(fn) {
      fn();
    }

    function _show_map(name, map) {
      var desc = map[''];
      _show_task(name, desc);

      for (var option in map) {
        if (option == null || option === '') { continue; }
        _show_option(option, map[option]);
      }
    }

    function _show_task(name, desc) {
      if (desc == null) { desc = ''; }
      var tab = '';
      for (var i=name.length; i<_tabSize; i++) { tab += ' '; }
      console.log('  ' + gutil.colors.cyan(name) + tab + ' : ' + desc);
    }

    function _show_option(name, desc) {
      if (desc == null) { desc = ''; }
      var tab = '';
//      for (var i=name.length; i<_tabSize-2; i++) { tab += ' '; }
      console.log('    ' + gutil.colors.green(name) + tab + ' : ' + desc);
    }
  };

}());
