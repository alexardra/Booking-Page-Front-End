const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const concatCss = require('gulp-concat-css');
const concat = require('gulp-concat');


gulp.task('babel', () =>
    gulp.src('dist/app.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('browserify', function() {
    return browserify({ entries: ['js/code/main.js'] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('combineStyles', function () {
    return gulp.src('css/*.css')
      .pipe(concatCss("bundle.css"))
      .pipe(gulp.dest('css/')); 
});

gulp.task('combineHtmls', function() {
    return gulp.src('views/*.html')
      .pipe(concat('templates.html')) 
      .pipe(gulp.dest('html/'));
});

gulp.task('default', ['combineHtmls', 'combineStyles', 'browserify', 'babel']);

