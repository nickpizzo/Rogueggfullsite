'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

var reload = browserSync.reload;

gulp.task('default', ['browser-sync', 'sass', 'scripts', 'watch']);

/////////////// CSS ///////////////

gulp.task('sass', function () {
	gulp.src('css/*.scss')
	.pipe(sass())
	.pipe(gulp.dest('public/css'))
})

/////////////// JS ///////////////

gulp.task('scripts', function () {
	gulp.src('js/*.js')
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest('public/js'))
})

/////////////// Serve & Watch ///////////////

gulp.task('watch', function () {
	gulp.watch('views/*.pug', reload);
	gulp.watch('css/**/*.scss', ['sass']);
	gulp.watch('js/*.js', ['scripts']);
})

gulp.task('browser-sync', ['nodemon'], function () {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
      files: ["public/**/*.*"],
      browser: "google chrome canary",
      port: 7000,
	});
});

gulp.task('nodemon', function (cb) {

	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', function () {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});
