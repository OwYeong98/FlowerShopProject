const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');
//Inject Dep
const gulpInject = require('gulp-inject');
const wiredep = require('wiredep').stream;
const angularFilesort = require('gulp-angular-filesort');

var devMode = false;

//SCSS Compiler
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const excludeNodeModule = [
	'!./node_modules/serve-index/**/*',
	'!./node_modules/uri-js/**/*',
	'!./node_modules/browser-sync-ui/**/*',
	'!./node_modules/tar/**/*',
	'!./node_modules/node-sass/**/*',
	'!./node_modules/postcss/**/*',
	'!./node_modules/bs-recipes/**/*',
	'!./node_modules/bower/**/*'
]

gulp.task('scss', function(done) {
	gulp.src('./src/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

gulp.task('copyJs', function(done) {
	gulp.src('./src/**/*.js')
		.pipe(gulp.dest('./dist'));
		
	done();
});

gulp.task('inject', function(done) {
	const injectJs = gulp.src('./dist/**/*.js', ['./node_modules/**/*.js'].concat(excludeNodeModule));//inject js and node modules
	const injectCss = gulp.src(['./node_modules/**/*.css'].concat(excludeNodeModule));//inject node module css



	var wiredepConfig = {
		directory: 'bower_components'
	}
	gulp.src('./src/index.html')
		.pipe(gulpInject(injectJs, {ignorePath: ['./src', './dist'], addRootSlash: false}))
		.pipe(gulpInject(injectCss, {ignorePath: ['./src', './dist'], addRootSlash: false}))
		.pipe(wiredep(Object.assign({}, wiredepConfig)))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());

	done();
});

gulp.task('css', function(done) {
	gulp.src(styles)
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./dist/css'))
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

gulp.task('build',gulp.series(gulp.parallel('scss','copyJs','html'), 'inject'));

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
	gulp.watch(['./src/**/*.css', './src/**/*.scss'],gulp.series('css'));
	gulp.watch(['./src/**/*.js'], gulp.series('build'));
	gulp.watch(['./src/**/*.html'],gulp.series('html'));
	console.log("gagas");
	done();
}))