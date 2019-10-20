const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync').create();
var devMode = false;

/*
	wiredep is a plugin that help automatic inject bower dependencies into the index.html
	** bower js and css dependecies will be automatically injected

	Note: wiredep inject the file by looking at bower pakages "main":'property'
	Therefore, if downloaded pakages's bower.json does not have property -> "main"
	
	**Can Be Overide manually in Our project bower.json
	Examples for Font Awesome bower dependencies

	"overrides": {
		"font-awesome": {
		"main": [
			"css/all.css"
		]
		}
  	}
*/
const wiredep = require('wiredep').stream;



//Project Javascript file section
/* 
	gulp-inject plugin is use to inject our project javascript file into index.html

	Note: Only own written javascript file, NOT node_modules & bower
*/
const scripts = require('./scripts');//all node_modules front end dependencies will be declare insde the file
const gulpInject = require('gulp-inject');

//SCSS Compiler
/* 
	gulp-sass plugin to convert 
	.scss file from {src} path into css file 

	Note: After converting .scss file, it will be places in {dist} path
*/
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

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

	gulp.src(scripts)
		.pipe(uglify())
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
		
	done();
});

gulp.task('inject', function(done) {
	const injectJs = gulp.src(['./dist/**/*.js', '!./dist/script.js', '!./dist/**/*.sample.js']);//inject js and node modules

	var wiredepConfig = {
		directory: 'bower_components'
	};
	

	gulp.src('./src/index.html')
		.pipe(gulpInject(injectJs, {ignorePath: ['src', 'dist'], addRootSlash: false}))
		.pipe(wiredep(Object.assign({}), wiredepConfig))	
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());

	done();
});

gulp.task('html', function(done) {
	gulp.src('./src/**/*.html')
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
	done();
});

gulp.task('build',gulp.series(gulp.parallel('scss','html'), 'copyJs', 'inject'));

gulp.task('browser-sync', function(done) {
	browserSync.init(null, {
		open: false,
		server: {
			baseDir: 'dist',
			routes: {
				'/bower_components': 'bower_components',
				'/node_modules': 'node_modules'
			}
		}
	});
	done();
});

gulp.task('start',gulp.series('build','browser-sync', function(done) {
	devMode = true;
	gulp.watch(['./src/**/*.css', './src/**/*.scss'],gulp.series('scss'));
	gulp.watch(['./src/**/*.js'], gulp.series('build'));
	gulp.watch(['./src/**/*.html'],gulp.series('build'));
	done();
}))