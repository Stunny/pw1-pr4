var gulp = require('gulp')
var htmlmin = require('gulp-html-minifier2')

gulp.task('html', ()=>{
  return gulp.src('*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('../build/'))
})

gulp.task('default', ['html'])
