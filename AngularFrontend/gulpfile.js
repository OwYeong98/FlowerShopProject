const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('css', function(done) {
	gulp.src(styles)
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

gulp.task('js', function(done) {
	gulp.src(scripts)
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('./dist/js'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

gulp.task('html', function(done) {
	gulp.src('./src/templates/**/*.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

gulp.task('build',gulp.series('css','js','html'));

gulp.task('browser-sync', function(done) {
	browserSync.init(null, {
		open: false,
		server: {
			baseDir: 'dist'
		}
	});
	done();
});

gulp.task('start',gulp.series('build','browser-sync', function(done) {
	devMode = true;
	gulp.watch(['./src/css/**/*.css'],gulp.series('css'));
	gulp.watch(['./src/js/**/*.js'], gulp.series('js'));
	gulp.watch(['./src/templates/**/*.html'],gulp.series('html'));
	console.log("gagas")
	done();
}))