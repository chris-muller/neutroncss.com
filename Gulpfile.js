var gulp = require('gulp');
var sass = require('gulp-ruby-sass');

// SASS
gulp.task('sass', function() {
    return sass('./assets/**/*.scss', {style: 'expanded'})
	.on('error', sass.logError)
    .pipe(gulp.dest('assets'));
});

//SASS Watch task
gulp.task('watch',function() {
    gulp.watch('./assets/**/*.scss',['sass']);
});

//Default task
gulp.task('default', ['sass', 'watch']);
