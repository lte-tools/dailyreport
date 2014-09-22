var gulp = require('gulp'),
    nodeunit_runner = require('gulp-nodeunit-runner');

gulp.task('default', function() {
  gulp.src('./test/*.js')
    .pipe(nodeunit_runner());
})