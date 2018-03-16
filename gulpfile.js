const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const tsProject = ts.createProject('tsconfig.json');
const del = require('del');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
    .pipe(tsProject());

  return tsResult.js.pipe(gulp.dest('dist'));
});
                                                                                                                                                                                                      
gulp.task('watch', ['scripts'], () => {
  gulp.watch('src/**/*.ts', ['scripts','clean:output']);
});

gulp.task('clean:output', function () {
  return del([
    'dist/**/*.js'
  ]);
});

gulp.task('default', ['watch']);