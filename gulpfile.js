var gulp = require('gulp'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-sass');

var src = {
        root: './src/'
    },
    dist = {
        root: './dist/'
    };

src.browserify = src.root + 'main.js';
dist.browserify = dist.root + 'js';
src.browserifyWatch = [
    './*.js',
    src.root + '*.js',
    src.root + '**/*.js'
];

src.jshint = [
    './*.js',
    src.root + '*.js',
    src.root + '**/*.js'
];

src.sass = src.root + 'scss/*.scss';
dist.sass = dist.root + 'css';

src.fonts = src.root + 'fonts/*';
dist.fonts = dist.root + 'fonts';

src.views = [
    './*.ejs',
    src.root + '*.ejs',
    src.root + '**/*.ejs'
];
dist.views = dist.root;

gulp.task('sass', function () {
    return gulp.src(src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(dist.sass));
});

gulp.task('jshint', function () {
    if ('production' !== process.env.NODE_ENV) {
        return gulp.src(src.jshint)
            .pipe(jshint())
            .pipe(jshint.reporter('jshint-stylish', {
                verbose: true
            }));
    }
});

gulp.task('browserify', ['jshint'], function () {
    browserify(src.browserify)
        .bundle()
        .on('error', console.error.bind(console))
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(dist.browserify));
});

gulp.task('fonts', function () {
    gulp.src(src.fonts)
        .pipe(gulp.dest(dist.fonts));
});

gulp.task('views', function () {
    gulp.src(src.views)
        .pipe(gulp.dest(dist.views));
});

gulp.task('watch', function () {
    gulp.watch(src.sass, ['sass']);
    gulp.watch(src.browserifyWatch, ['browserify']);
    gulp.watch(src.views, ['views']);
});

gulp.task('default', [
    'sass',
    'browserify',
    'fonts',
    'views',
    'watch'
]);
