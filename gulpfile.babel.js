import gulp from 'gulp';
import gutil from 'gulp-util';
import inject from 'gulp-inject-string'
import webpack from 'webpack';
import webpackConfig from './webpack.config';


gulp.task('webpack', callback => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }
    gutil.log('[webpack]', stats.toString({colors: true}));
    callback();
  });
});

gulp.task('copy:styles', () => {
  return gulp.src('./semantic/**')
    .pipe(gulp.dest('dist/vendor/semantic'));
});

gulp.task('copy:html', function(){
  gulp.src('src/index.html')
    .pipe(inject.replace('../semantic/dist/semantic.min.css', 'vendor/semantic/dist/semantic.min.css'))
    .pipe(inject.replace('../dist/bundle.js', './bundle.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['webpack', 'copy:styles', 'copy:html']);