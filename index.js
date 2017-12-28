(function(){
  'use strict';

  var gulp = require('gulp');
  var chalk = require('chalk');
  var argv = require('yargs').argv;

  var originalTaskFn = gulp.task;
  gulp.task = function() {
    originalTaskFn.apply(gulp, arguments);
    var name = arguments[0];
    return gulp.tasks[name];
  };

  module.exports = new function() {
    this.show = _show;
    this.showTask = _show_task;
    this.showOption = _show_option;
    this.getArgv = _get_argv;
    this.taskNames = _task_names;

    // leave old APIs for compatibility
    this.show_task = _show_task;
    this.show_option = _show_option;
    this.get_argv = _get_argv;

    var _indentSize = 2;
    var _tabSize = 0;
    var _hasOption = false;

    function _show(taskname /* ... */) {
      var args;
      if (arguments.length == 1 && Array.isArray(arguments[0])) {
        args = arguments[0];
      } else if (arguments.length > 0) {
        args = Array.prototype.slice.call(arguments);
      } else {
        args = Object.getOwnPropertyNames(gulp.tasks);
      }

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
      console.log('  ' + chalk.cyan(name) + tab + ' : ' + desc);
    }

    function _show_option(name, desc) {
      if (desc == null) { desc = ''; }
      var tab = '';
      console.log('    ' + chalk.green(name) + tab + ' : ' + desc);
      _hasOption = true;
    }

    function _calc_tab_size(tasknames) {
      var tabSize = 0;
      for (var i=0; i<tasknames.length; i++) {
        var name = tasknames[i];
        if (name == null) { continue; }

        var task = gulp.tasks[name];
        if (task == null) { continue; }
        if (typeof(task.help) == 'undefined') { continue; }

        tabSize = Math.max(tabSize, name.length);
      }
      return tabSize;
    }

    function _write_task_list(tasknames) {
      console.log(chalk.bold('Tasks'));

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
      var str = '\n' + chalk.bold('Usage') + '\n';
      str += '  gulp ' + chalk.cyan('task');
      if (_hasOption) {
        str += ' [ ' + chalk.green('option ...') + ' ]';
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

    function _task_names() {
      return Object.getOwnPropertyNames(gulp.tasks);
    }
  };

}());
