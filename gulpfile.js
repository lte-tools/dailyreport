var gulp = require('gulp'),
    nodeunit_runner = require('gulp-nodeunit-runner'),
    jslint = require('gulp-jslint'),
    jshint = require('gulp-jshint');

gulp.task('default', function() {
  gulp.src('./test/*.js')
    .pipe(nodeunit_runner());
  gulp.src(['./model/*.js', './route/*.js'])
    .pipe(jshint({
      predef: ['define', 'require', 'module', 'exports'],
      node: true
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function(error) {
      console.error(String(error));
    });
  gulp.src(['./public/js/*.js', './public/js/**/*.js', '!./public/js/bootstrap-datepicker.js', '!./public/js/summernote.js'])
    .pipe(jshint({
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .on('error', function(error) {
      console.error(String(error));
    });
})
