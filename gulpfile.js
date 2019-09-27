const gulp = require('gulp');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

/**
 * 压缩js 将 ./src/js 所有的js文件进行压缩
 * 输出 ./dist/js
 */
gulp.task('default', () => {
  gulp
    .src('./dist/*.js')
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('./dist/min'));
});
