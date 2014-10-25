(function(){
  'use strict';
  /*jshint -W057, -W058, eqnull:true */

  var gulp = require('gulp');
  var gutil = require('gulp-util');
  var argv = require('yargs').argv;

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
    this.get_argv = _get_argv;

    var _indentSize = 2;
    var _tabSize = 0;
    var _hasOption = false;

    function _show(taskname /* ... */) {
      var args = (arguments.length > 0) ?
        Array.prototype.slice.call(arguments) :
        Object.getOwnPropertyNames(gulp.tasks);

      _tabSize = _calc_tab_size(args);

      _hasOption = false;
      var _buf = '';
      var _console_log_bk = console.log;
      console.log = function(s) { _buf += (s != null ? s : '') + '\n'; }; 

      _write_task_list(args);
      _buf = _get_usage() + _buf;

      console.log = _console_log_bk;
      console.log(_buf);
    }

    function _show_map(name, map) {
      var desc = map[''];
      _show_task(name, desc);

      for (var option in map) {
        if (option === '') { continue; }
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
      console.log('    ' + gutil.colors.green(name) + tab + ' : ' + desc);
      _hasOption = true;
    }

    function _calc_tab_size(tasknames) {
      for (var i=0; i<tasknames.length; i++) {
        var name = tasknames[i];
        if (name == null) { continue; }

        var task = gulp.tasks[name];
        if (task == null) { continue; }
        if (typeof(task.help) == 'undefined') { continue; }

        return Math.max(_tabSize, name.length);
      }
    }

    function _write_task_list(tasknames) {
      console.log(gutil.colors.bold('Tasks'));

      for (var i=0; i<tasknames.length; i++) {
        var name = tasknames[i];
        if (name == null || name === '') { console.log(); continue; }
        var task = gulp.tasks[name];
        if (task == null) continue;
        switch (typeof(task.help)) {
        case 'function': task.help(); break;
        case 'object': _show_map(name, task.help, _tabSize); break;
        case 'string': _show_task(name, task.help, _tabSize); break;
        }
      }
    }

    function _get_usage() {
      var str = '\n' + gutil.colors.bold('Usage') + '\n';
      str += '  gulp ' + gutil.colors.cyan('task');
      if (_hasOption) {
        str += ' [ ' + gutil.colors.green('option ...') + ' ]';
      }
      str += '\n\n';
      return str;
    }

    function _get_argv(opt /* ... */) {
      var opts = Array.prototype.slice.call(arguments);
      for (var i=0; i<opts.length; i++) {
        if (opts[i] in argv) { return argv[opts[i]]; }
      }
      return null;
    }
  };

}());
