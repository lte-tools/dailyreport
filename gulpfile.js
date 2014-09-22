var gulp = require('gulp'),
    nodeunit_runner = require('gulp-nodeunit-runner'),
    jslint = require('gulp-jslint')

gulp.task('default', function() {
  gulp.src('./test/*.js')
    .pipe(nodeunit_runner());
  gulp.src(['./model/*.js', './route/*.js'])
    .pipe(jslint({
      node: true,
      indent: 2,
      unparam: false
    }))
    .on('error', function(error) {
      console.error(String(error));
    });
  gulp.src(['./public/js/*.js', './public/js/**/*.js', '!./public/js/bootstrap-datepicker.js', '!./public/js/summernote.js'])
    .pipe(jslint({
      indent: 2,
      unparam: true,
      browser: true,
      vars: true,
      nomen: true,
      predef: ['define', 'require', '$', 'alert']
    }))
    .on('error', function(error) {
      console.error(String(error));
    });
})