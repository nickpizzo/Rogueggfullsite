'use strict';

import gulp from 'gulp';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import nodemon from 'gulp-nodemon';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';

const reload = browserSync.reload;
const paths = {
  allSrcJs: 'js/**/*.js',
  allSrcCss: 'css/**/*.{css,scss}',
  jsDistDir: 'public/js',
  cssDistDir: 'public/css',
	gulpFile: 'gulpfile.babel.js',
	appEntryPoint: 'app.js',
};

//// JS ////

gulp.task('scripts', () => {
	gulp.src(paths.allSrcJs)
	.pipe(sourcemaps.init())
	.pipe(uglify())
	.pipe(concat('main.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(paths.jsDistDir))
});

//// CSS ////

gulp.task('sass', () => {
	gulp.src(paths.allSrcCss)
	.pipe(sass())
	.pipe(gulp.dest(paths.cssDistDir))
});

//// Serve & Watch ////

gulp.task('serve', ['nodemon', 'scripts', 'sass'], () => {
	browserSync.init(null, {
		proxy: "http://localhost:5000",
      files: ["public/**/*.*"],
      browser: "google chrome canary",
      port: 7000,
	});
	gulp.watch('views/*.pug', reload);
	gulp.watch(paths.allSrcCss, ['sass']);
	gulp.watch(paths.allSrcJs, ['js-watch']);
});

gulp.task('js-watch', ['scripts'], (done) => {
  browserSync.reload();
  done();
});

gulp.task('nodemon', (cb) => {

	var started = false;

	return nodemon({
		script: 'app.js'
	}).on('start', () => {
		// to avoid nodemon being started multiple times
		if (!started) {
			cb();
			started = true;
		}
	});
});

gulp.task('default', ['serve']);
