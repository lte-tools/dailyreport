var gulp = require('gulp'),
    nodeunit_runner = require('gulp-nodeunit-runner'),
    jslint = require('gulp-jslint')

gulp.task('default', function() {
  gulp.src('./test/*.js')
    .pipe(nodeunit_runner());
  gulp.src(['./model/*.js', './route/*.js'])
    .pipe(jslint({
      node: true,
      indent: 2
    }))
    .on('error', function(error) {
      console.error(String(error));
    })
})