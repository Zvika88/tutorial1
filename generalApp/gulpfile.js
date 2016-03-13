var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  ts: ['./www/ts/**/*.ts']
};

// Get copyright using NodeJs file system
var getCopyright = function () {
  return fs.readFileSync('Copyright');
};

gulp.task('default', ['sass']);

/**** TypeScript Compilation Setup Start ****/
var ts = require('gulp-typescript');
gulp.task('compile', function () {
  gulp.src(paths.ts)
    .pipe(ts(ts.createProject('tsconfig.json')))
    .pipe(ngAnnotate({
      remove: true,
      add: true,
      single_quotes: true
    }))
    .pipe(gulp.dest('www/js/'))
});
/**** TypeScript Compilation Setup End ****/

/**** TypeScript Production Setup Start ****/
var fs = require('fs');
var header = require("gulp-header");
var uglify = require("gulp-uglify");
var ngAnnotate = require("gulp-ng-annotate");
gulp.task('compile-production', function () {
  gulp.src(paths.ts)
    .pipe(ts(ts.createProject('tsconfig.json')))
    .pipe(concat('app.min.js'))
    .pipe(ngAnnotate({
      remove: true,
      add: true,
      single_quotes: true
    }))
    .pipe(uglify())
    .pipe(header(getCopyright()))
    .pipe(gulp.dest('www/js/'))
});
/**** TypeScript Production Setup End ****/

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.ts, ['compile']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
