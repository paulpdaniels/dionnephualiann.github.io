const gulp = require('gulp');
const connect= require('gulp-connect');
const rollup = require('rollup-stream');
const typescript = require('rollup-plugin-typescript');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

gulp.task('default', ['copy', 'bundle', 'serve', 'watch']);

gulp.task('serve', () => {
  connect.server();
});

gulp.task('copy', () => {
  return gulp.src([
    'node_modules/redux/dist/redux.min.js',
    'node_modules/react/dist/react.min.js',
    'node_modules/react-dom/dist/react-dom.min.js',
    'node_modules/react-bootstrap/dist/react-bootstrap.min.js',
    'node_modules/react-router/umd/ReactRouter.min.js',
    'node_modules/rxjs/bundles/Rx.min.js',
    'node_modules/ramda/dist/ramda.min.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('bundle', () => {
  return rollup({
    entry: 'src/main.tsx',
    format: 'iife',
    plugins: [
      typescript({
        jsx: 'react',
        typescript: require('typescript')
      })
    ],
    sourceMap: true,
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-slick': 'Slider',
      'react-router': 'ReactRouter',
      'react-bootstrap': 'ReactBootstrap',
      'redux': 'Redux',
      'ramda': 'R',
      'rxjs': 'Rx'
    }
  })
  // give the file the name you want to output with.
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))

    // transform the code further here.

    // write the sourcemap alongside the output file.
    .pipe(sourcemaps.write('.'))

    // and output to ./dist/app.js as normal.
    .pipe(gulp.dest('./build'));
});

gulp.task('watch', () => {
  gulp.watch('./src/**/*.tsx', ['bundle']);
});