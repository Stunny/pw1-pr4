var gulp = require('gulp');

var htmlmin = require('gulp-html-minifier2');
var cssmin = require('gulp-mcss');
var jsof = require('gulp-javascript-obfuscator');

gulp.task('html', ()=>{
  return gulp.src('./src/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('./build/'));
});

gulp.task('obfjs', ()=>{
  return gulp.src('./src/js/*.js')
  .pipe(jsof())
  .pipe(gulp.dest('./build/js/'));
});

gulp.task('mincss', ()=>{
  return gulp.src('./src/css/*.css')
  .pipe(cssmin())
  .pipe(gulp.dest('./build/css/'));
});

gulp.task('imgs', ()=>{
  return gulp.src('./src/media/finales/*')
  .pipe(gulp.dest('./build/img/'));
});

gulp.task('default', ['html', 'obfjs', 'mincss', 'imgs']);
