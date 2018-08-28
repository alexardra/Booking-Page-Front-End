const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');


gulp.task('babel', () =>
    gulp.src('public/dist/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('public/dist'))
);

gulp.task('browserify', function() {
    return browserify({ entries: ['public/js/code/main.js'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('public/dist'));
});

gulp.task('combineStyles', function () {
    return gulp.src('public/css/*.css')
      .pipe(concatCss("bundle.css"))
      .pipe(gulp.dest('public/css/')); 
});

gulp.task('combineHtmls', function() {
    return gulp.src('public/views/*.html')
      .pipe(concat('templates.html')) 
      .pipe(gulp.dest('public/html/'));
});

gulp.task('default', ['combineHtmls', 'combineStyles', 'browserify', 'babel']);

