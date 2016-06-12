	var gulp = require('gulp')
		, fs = require('fs-extra')
		, inject = require('gulp-inject')
		//, sass = require('gulp-sass')
		//, sass = require('gulp-ruby-sass')
		, autoprefixer = require('gulp-autoprefixer')
		, scsslint = require('gulp-scss-lint')
		, cssmin = require('gulp-minify-css')
		, sequence = require('run-sequence')
		, wiredep = require('wiredep').stream
		, open = require('gulp-open')
		, connect = require('gulp-connect')
		, concat = require('gulp-concat')
		, uglify = require('gulp-uglify')
		, rename = require('gulp-rename')
		, angularFilesort = require('gulp-angular-filesort')
		, jshint = require('gulp-jshint')
		, stylish = require('jshint-stylish')
		, util = require('util')
		, shell = require('gulp-shell')
		, browserSync = require('browser-sync');


	gulp.task('wire', function(){
	  gulp.src('./app/index.html')
	    .pipe(wiredep())
	    .pipe(gulp.dest('./app'));
	});

	// var filesToInject = ['./app/**/*.js', './app/**/*.css'];
	// //i've replaced this task with angularFilesort below
	// //I think that the syntax is much clearer
	// //TODO remove this and fix the wire-inject task to use `sort`
	// gulp.task('inject', function (){
	//   var target = gulp.src('./index.html');
	//   var sources = gulp.src(filesToInject, {read: false});
	//   return target.pipe(inject(sources))
	//     .pipe(gulp.dest('.'));
	// });

	// gulp.task('wire-inject',  function(callback){
	//     sequence('wire', 'inject', callback);
	// });

	gulp.task('sort', function(){
		gulp.src('./app/index.html')
	  	.pipe(inject(
	    	gulp.src(['./app/css/**/*.css', './app/**/*.js']).pipe(angularFilesort())
	  	))
	  	.pipe(gulp.dest('./app/'));
	});


	// gulp.task('sass', function() {
	//   return sass('./app/styles/sass/**/*.scss', { style: 'expanded' })
 //    	.pipe(autoprefixer({
	// 			browsers: ['last 2 versions', 'Explorer 9']
	// 		}))
 //       .pipe(gulp.dest('./app/styles/css/'));
	// });

	// gulp.task('scss-lint', function() {
	//   return gulp.src('./app/styles/sass/**/*.scss')
	//     .pipe(scsslint());
	// });

	// gulp.task('watch-sass', function () {
	//     gulp.watch('./app/styles/sass/*.scss', ['scss-lint', 'sass']);
	// });


	// gulp.task('sass-minify', function() {
	// 	return gulp.src('./app/styles/sass/**/*.scss')
	// 		.pipe(sass())
	// 		//.pipe(autoprefixer({
	// 		//	browsers: ['last 2 versions', 'Explorer 9']
	// 		//}))
	// 		//.pipe(cssmin())
	// 		.pipe(gulp.dest('./app/styles/css/'));
	// });


	// gulp.task('hint', function(){
	//   return gulp.src('./app/**/*.js')
	//     .pipe(jshint({laxcomma: true}))
	//     .pipe(jshint.reporter(stylish));
	// });

	/* launch app in browser */

	//start node server
	// gulp.task('start-server', false, shell.task([
 //    'node ' + 'server.js'
	// ]));

	// //open browser
	// gulp.task('browser-open', false, function () {
	//     var options = {
	//         url: 'http://0.0.0.0:' + PORT + '/',
	//         app: 'Google Chrome'
	//     };
	//     return gulp.src('./index.html')
	//         .pipe(open('', options));
	// });


	// gulp.task('launch', function(callback){
	// 	sequence(['start-server', 'browser-open'], callback);
	// });


var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var src = {
    scss: './app/scss/*.scss',
    css:  './app/css',
    html: './app/*.html'
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync({
        server: ".",
        files: [
        './bower_components/**/*.css',
        './bower_components/**/*.js',
				'./app/**/*.css',
				'./app/**/*.js',
				'./app/**/*.html'
			]
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// Compile sass into CSS
gulp.task('sass', function() {
		console.log('sassing');
    return gulp.src(src.scss)
        .pipe(sass())
        .pipe(gulp.dest(src.css))
        .pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);