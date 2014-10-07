var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('less', function () {
  gulp.src('./index/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./index/css'));
});

gulp.task('watch', function() {
    gulp.watch('./index/less/**/*.less', ['less']);
});

gulp.task('default', ['less']);
