'use strict';

var expect = require('chai').expect;
var runner = require('gulp-test-tools').gulpRunner;
var skipLines = require('gulp-test-tools').skipLines;
var eraseTime = require('gulp-test-tools').eraseTime;
var eraseLapse = require('gulp-test-tools').eraseLapse;
var semver = require('semver');

var path = require('path');
var fs = require('fs');

var deprecationPrefix = semver.lt(process.version, '6.0.0') ? '' :
  'DeprecationWarning: ';

function expected(filename) {
  var fp = path.resolve(__dirname, 'expected', filename);
  return fs.readFileSync(fp, 'utf8');
}

describe('gulp-showhelp', function() {
  describe('.show', function() {
    it('Should not affect to running gulp"',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1.txt'));
        done(err);
      }
    });

    it('Should print help message', function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js', 'help')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1-help.txt'));
        done(err);
      }
    });

    it('Should print help message of tasks only specified', function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js', 'help2')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1-help2.txt'));
        done(err);
      }
    });

    it('Should ignore when the specified task does not exist',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js', 'help3', '--task=x')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1-help3a.txt'));
        done(err);
      }
    });
  });

  describe('.taskNames', function() {
    it('Should print help message by using .taskNames function',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js', 'help4')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1-help4.txt'));
        done(err);
      }
    });
  });

  describe('.getArgv', function() {
    it('Should print help message of a task specified by cli arg',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-1.js', 'help3')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-1-help3.txt'));
        done(err);
      }
    });
  });


  describe('.showTask', function() {
    it('Should print an empty description when setted to nullish',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-2.js', 'help1')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-2-help1.txt'));
        done(err);
      }
    });
  });

  describe('.showOption', function() {
    it('Should print an empty description when setted to nullish',
    function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-2.js', 'help2')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr).to.equal('');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-2-help2.txt'));
        done(err);
      }
    });
  });

  describe('.show_task (deprecated)', function() {
    it('Should print an error message of deprecation warning', function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-3.js', 'help1')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr.replace(/\(node:[0-9]+\) /g, '')).to.equal(
          deprecationPrefix + 'show_task() is deprecated.\n');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-2-help1.txt'));
        done(err);
      }
    });
  });

  describe('.show_option (deprecated)', function() {
    it('Should print an error message of deprecation warning', function(done) {
      runner({ verbose: false })
        .chdir(__dirname, 'fixtures')
        .gulp('--gulpfile', 'gulpfile-3.js', 'help2')
        .run(cb);

      function cb(err, stdout, stderr) {
        expect(err).to.equal(null);
        expect(stderr.replace(/\(node:[0-9]+\) /g, '')).to.equal(
          deprecationPrefix + 'show_task() is deprecated.\n' +
          deprecationPrefix + 'show_option() is deprecated.\n');
        stdout = skipLines(stdout, 1);
        stdout = eraseTime(stdout);
        stdout = eraseLapse(stdout);
        expect(stdout).to.equal(expected('gulpfile-2-help2.txt'));
        done(err);
      }
    });
  });

});
