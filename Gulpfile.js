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
  return gulp.src('./src/scripts/*.js')
  .pipe(jsof())
  .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('mincss', ()=>{
  return gulp.src('./src/scripts/*.css')
  .pipe(cssmin())
  .pipe('.build/css/');
});

gulp.task('default', ['html', 'obfjs', 'mincss']);
