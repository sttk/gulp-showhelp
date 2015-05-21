# gulp-showhelp [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Gulp plugin to show a help message for your gulpfile.js.

## Install

Install `gulp-showhelp` with npm:

```bash
$ npm install --save-dev gulp-showhelp
```

## Usage

First, load `gulp-showhelp` module and add a task to show a help message in your gulpfile.js like following:

```js
var gulp = require('gulp');
var ghelp = require('gulp-showhelp');

gulp.task('help', function() {
  ghelp.show();
}).help = 'shows this help message.'; 
```

Then, you can show a help message about `help` task via `gulp help`.

```bash
$ gulp help
[gulp] Starting 'help'...

Usage
  gulp task

Tasks
  help : shows this help message.

[gulp] Finished 'help' after 557 μs
```

Next, add a description to each tasks.
There are three types to add.

### Add a task description

#### 1. Task only

If you want to show a description about a task with no option, add `help` property as a string to a task object, e.g.:

```js
gulp.task('lint', function() {
  ...
}).help = 'lints all js files.';
```

The result is:

```bash
$ gulp help
[gulp] Starting 'help'...

Usage
  gulp task

Tasks
  help : shows this help message.
  lint : lints all js files. 

[gulp] Finished 'help' after 660 μs
```

#### 2. Task with options

If you want to show a description about a task with some options, add `help` property as an object to a task object.
A value of a propery of which a key is an empty string is treated as a task description.

```js
gulp.task('compile', function() {
  ...
}).help = {
  '': 'compiles source files.',
  '--srcs=pattern': 'specifys a path pattern of source files.',
  '--dest=path': 'specifys a file path.'
};
``` 

The result is:

```bash
$ gulp help
[gulp] Starting 'help'...

Usage
  gulp task [ option ... ]

Tasks
  help    : shows this help message.
  lint    : lints all js files. 
  compile : compiles source files.
    --srcs=pattern : specifys a path pattern of source files.
    --dest=path : specifys a file path.

[gulp] Finished 'help' after 753 μs
```

#### 3. Free description using a function

If you want to show a free format description about a task, add `help` property as a function to a task object.
You can use `showTask` function to show a task description and `showOption` function to show a option description.

```js
gulp.task('test', function(){
  ...
}).help = function() {
  ghelp.showTask('test', 'tests modules.');
  ghelp.showOption('--case=id', 'specifys a test case ID.');
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
```

The result is:

```bash
$ gulp help
[gulp] Starting 'help'...

Usage
  gulp task [ option ... ]

Tasks
  help    : shows this help message.
  lint    : lints all js files. 
  compile : compiles source files.
    --srcs=pattern : specifys a path pattern of source files.
    --dest=path : specifys a file path.
  test    : tests modules.
    --case=id : specifys a test case ID.

    Test case IDs:
        ID  :        description
      ------:-------------------------------------
      case1 : .... 
      case2 : .... 
      case3 : .... 


[gulp] Finished 'help' after 934 μs
```

### Select and order tasks

You can select and order tasks of which you want to show a description by specifying task names in order.

```js
gulp.task('help', function() {
  ghelp.show('lint', 'help', '', 'compile');
}).help = 'shows this help message.'; 
```

If a null or an empty string is specified as a task name, an empty line is displayed.

### Select a task via a command-line argument. 

If you want to be able to select a task via a command-line argument, `getArgv` function is useful. Write as follows:

```js
gulp.task('help', function() {
  var task = ghelp.getArgv('task', 't');
  if (task != null) {
    ghelp.show(task);
  } else {
    ghelp.show();
  }
}).help = {
  '': 'shows this help message.',
  '[ --task=t ]': 'specifys a task shown. Alias: -t.' 
};
```

## APIs

> API names are changed to camel case according to JavaScript coding conventions.
> So the functions `show_task`, `show_option`, `get_argv` are deprecated, but they are left for compatibility.

`gulp-showhelp` module provides following functions:

### show([ taskname, ... ])

Shows a help message about own gulpfile.js.

- **taskname** `{string|null}` - a task name. If null or empty, displays an empty line.

### showTask(taskname, taskdesc)

Shows a task description using a help message.

- **taskname** `{string}` - a task name.
- **taskdesc** `{string}` - a task explanation.

### showOption(optionname, optiondesc)

Shows a option description using a help message.

- **optionname** `{string}` - an option name.
- **optiondesc** `{string}` - an option explanation.

### getArgv(optionname [, optionalias, ...])

Gets a option value corresponding to the specified option name or alias.

- **optionname** `{string}` - an option name.
- **optionalias** `{string}` - an option alias.

## License

Copyright (C) 2014 Takayuki Sato.

gulp-showhelp is free software under [MIT](http://opensource.org/licenses/MIT) License.
See the file LICENSE in this distribution for more details.


[npm-image]: http://img.shields.io/badge/npm-v1.0.2-blue.svg
[npm-url]: https://www.npmjs.org/package/gulp-showhelp
[travis-image]: https://travis-ci.org/sttk/gulp-showhelp.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/gulp-showhelp
