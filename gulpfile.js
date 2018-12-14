const gulp = require('gulp'),
sass = require('gulp-sass'),
imagemin = require('gulp-imagemin'),
browserSync = require('browser-sync'),
babel = require('gulp-babel'),
uglify = require('gulp-uglify');

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

gulp.task('sass', function() {
  return gulp.src('app/assets/styles/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
    .pipe(sass().on('error', sass.logError)) // Passes it through a gulp-sass, log errors to console
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('app/assets/styles/css')) // Outputs it in the css folder
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
})

gulp.task('transpile', function() {
  return gulp.src('app/assets/scripts/src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('app/assets/scripts/dist'))
})

gulp.task('minify', function() {
  gulp.src('app/assets/images/src/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/assets/images/dist'))
});

// Watchers
gulp.task('watch', ['browserSync', 'sass', 'transpile'], function() {
  gulp.watch('app/assets/styles/scss/**/*.scss', ['sass']);
  gulp.watch('app/assets/scripts/src/**/*.js', ['transpile']);
  gulp.watch('app/assets/styles/scss/**/*.scss', browserSync.reload); 
  gulp.watch('app/assets/scripts/src/**/*.js', browserSync.reload);
  gulp.watch('app/*.html', browserSync.reload); 
})