# [gulp-showhelp][repo-url] [![NPM version][npm-img]][npm-url] [![MIT License][mit-img]][mit-url] [![Build Status][travis-img]][travis-url] [![Build Status][appveyor-img]][appveyor-url] [![Coverage Status][coverage-img]][coverage-url]

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

`gulp-showhelp` provides the following functions:

### <u>.show([ ...taskname ]) : Void</u>

Shows a help message about all tasks or specified tasks in gulpfile.js.

#### Parameters:

| Parameter   |  Type  | Description                                             |
|:------------|:------:|:--------------------------------------------------------|
| *taskname*  | string | A task name. If null or empty, displays an empty line.  |

### <u>.show(tasknames) : Void</u>

Shows a help message about tasks specified by an array in gulpfile.js.

#### Parameters:

| Parameter   |  Type    | Description                                           |
|:------------|:--------:|:------------------------------------------------------|
| *tasknames* | Array    | An array which contains task names.                   |

### <u>.showTask(taskname, taskdesc) : Void</u>

Shows a task description using a help message.

| Parameter   |  Type  | Description                                             |
|:------------|:------:|:--------------------------------------------------------|
| *taskname*  | string | A task name.                                            |
| *taskdesc*  | string | A task explanation.                                     |

### <u>.showOption(optionname, optiondesc) : Void</u>

Shows a option description using a help message.

| Parameter    |  Type  | Description                                            |
|:-------------|:------:|:-------------------------------------------------------|
| *optionname* | string | An option name.                                        |
| *optiondesc* | string | An option explanation.                                 |

### <u>.getArgv(optionname [, optionalias, ...]) : Void</u>

Gets a option value corresponding to the specified option name or alias.

| Parameter     |  Type  | Description                                           |
|:--------------|:------:|:------------------------------------------------------|
| *optionname*  | string | An option name.                                       |
| *optionalias* | string | An option alias.                                      |

### <u>.taskNames() : Array</u>

Gets an array which contains all task names.

#### Returns:

An array of task names.

**Type:** Array


## License

Copyright (C) 2014-2017 Takayuki Sato.

This program is free software under [MIT][mit-url] License.
See the file LICENSE in this distribution for more details.


[repo-url]: https://github.com/sttk/gulp-showhelp/
[npm-img]: https://img.shields.io/badge/npm-v1.2.0-blue.svg
[npm-url]: https://www.npmjs.org/package/gulp-showhelp/
[mit-img]: https://img.shields.io/badge/license-MIT-green.svg
[mit-url]: https://opensource.org/licenses.MIT
[travis-img]: https://travis-ci.org/sttk/gulp-showhelp.svg?branch=master
[travis-url]: https://travis-ci.org/sttk/gulp-showhelp
[appveyor-img]: https://ci.appveyor.com/api/projects/status/github/sttk/gulp-showhelp?branch=master&svg=true
[appveyor-url]: https://ci.appveyor.com/project/sttk/gulp-showhelp
[coverage-img]: https://coveralls.io/repos/github/sttk/gulp-showhelp/badge.svg
[coverage-url]: https://coveralls.io/github/sttk/gulp-showhelp?branch=master

