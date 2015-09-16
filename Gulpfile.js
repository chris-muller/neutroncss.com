var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');


// SASS
gulp.task('sass', function() {
    return sass('./assets/**/*.scss', {style: 'expanded'})
	.on('error', sass.logError)
    .pipe(gulp.dest('assets'));
});

gulp.task('scripts', function() {
  return gulp.src('./assets/js/lib/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('assets/js'));
});


//SASS Watch task
gulp.task('watch',function() {
    gulp.watch('./assets/**/*.scss',['sass']);
    gulp.watch('./assets/js/lib/*.js',['scripts']);
});

//Default task
gulp.task('default', ['sass', 'scripts', 'watch']);
