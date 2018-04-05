'use strict';

var gulp = require('gulp');
var chalk = require('chalk');
var argv = require('yargs').argv;
var util = require('util');

var originalTaskFn = gulp.task;

gulp.task = function() {
  originalTaskFn.apply(gulp, arguments);
  var name = arguments[0];
  return getTask(gulp, name);
};


var colors = {
  title: chalk.bold,
  task: chalk.cyan,
  option: chalk.green,
};

module.exports = new function() {
  var ctx = {
    hasOption: false,
    tabSize: 0,
  };

  this.show = function() {
    var names = parseArgsToTaskNames(arguments);

    ctx.tabSize = calcTabSize(names);
    ctx.hasOption = false;

    var buf = bufferConsoleLog(function() {
      printTaskList.call(ctx, names);
    });

    console.log(getUsage(ctx.hasOption) + buf);
  };

  this.showTask = function() {
    printTask.apply(ctx, arguments);
  };

  this.showOption = function() {
    printOption.apply(ctx, arguments);
  };

  this.getArgv = getArgv;
  this.taskNames = taskNames;

  this.show_task = util.deprecate(function() {
    printTask.apply(ctx, arguments);
  }, 'show_task() is deprecated.');

  this.show_option = util.deprecate(function() {
    printOption.apply(ctx, arguments);
  }, 'show_option() is deprecated.');

  this.get_argv = util.deprecate(getArgv);
};

function parseArgsToTaskNames(args) {
  if (args.length === 1 && Array.isArray(args[0])) {
    return args[0];
  } else if (args.length > 0) {
    return Array.prototype.slice.call(args);
  } else {
    return taskNames();
  }
}

function calcTabSize(names) {
  var tabSize = 0;

  for (var i = 0, n = names.length; i < n; i++) {
    var name = names[i];
    if (!name) {
      continue;
    }

    var task = getTask(gulp, name);
    if (!task || !task.help) {
      continue;
    }

    tabSize = Math.max(tabSize, name.length);
  }

  return tabSize;
}

function bufferConsoleLog(fn) {
  var logBk = console.log;
  var buf = '';
  console.log = function(str) {
    buf += (str == null) ? '' : str;
    buf += '\n';
  };

  fn();

  console.log = logBk;
  return buf;
}

function printTaskList(names) {
  var ctx = this;

  console.log(colors.title('Tasks'));

  for (var i = 0, n = names.length; i < n; i++) {
    var name = names[i];
    if (!name) {
      console.log();
      continue;
    }

    var task = getTask(gulp, name);
    if (!task || !task.help) {
      continue;
    }

    switch (typeof task.help) {
      case 'function': {
        task.help();
        break;
      }
      case 'object': {
        printMap.call(ctx, name, task.help);
        break;
      }
      case 'string': {
        printTask.call(ctx, name, task.help);
        break;
      }
    }
  }
}

function getTab(tabSize, name) {
  var tab = '';
  for (var i = 0, n = tabSize - name.length; i < n; i++) {
    tab += ' ';
  }
  return tab;
}

function printTask(name, desc) {
  desc = desc || '';
  var ctx = this;
  var tab = getTab(ctx.tabSize, name);
  console.log('  ' + colors.task(name) + tab + ' : ' + desc);
}

function printOption(name, desc) {
  desc = desc || '';
  var ctx = this;
  console.log('    ' + colors.option(name) + ' : ' + desc);
  ctx.hasOption = true;
}

function printMap(name, map, tabSize) {
  var ctx = this;
  printTask.call(ctx, name, map['']);

  for (var opt in map) {
    if (opt) {
      printOption.call(ctx, opt, map[opt]);
    }
  }
}

function getUsage(hasOption) {
  var str = '\n' + colors.title('Usage') + '\n';
  str += '  gulp ' + colors.task('task');
  if (hasOption) {
    str += ' [ ' + colors.option('option ...') + ' ]';
  }
  str += '\n\n';
  return str;
}

function getArgv(/* ...opt */) {
  var opts = Array.prototype.slice.call(arguments);
  for (var i = 0, n = opts.length; i < n; i++) {
    var opt = opts[i];
    if (opt in argv) {
      return argv[opt];
    }
  }
  return null;
}

function getTask(gulp, name) {
  /* istanbul ignore next */
  if (gulp.tasks) { // v3
    return gulp.tasks[name];
  } else { // v4
    return gulp._getTask(name);
  }
}

function taskNames() {
  /* istanbul ignore next */
  if (gulp.tasks) { // v3
    return Object.getOwnPropertyNames(gulp.tasks);
  } else { // v4
    return gulp.tree().nodes;
  }
}

