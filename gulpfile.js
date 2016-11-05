
var gulp        = require('gulp'),
    imagemin    = require('gulp-imagemin'),
    cssmin      = require('gulp-cssmin'),
    htmlmin     = require('gulp-htmlmin'),
    browserSync = require('browser-sync'),
    serve       = require('gulp-serve'),
    sequence    = require('run-sequence'),
    reload      = browserSync.reload;

var config      = {
    "build": "dist",
    "html": {
        "source": "*.html",
        "target": "/"
    },
    "fonts": {
        "source": "fonts/",
        "target": "/fonts"
    },
    "css": {
        "source": "css/*.css",
        "target": "/css"
    },
    "js": {
        "source": "js/*",
        "target": "/js"
    }
  };

gulp.task('css', function () {
  return gulp.src(config.css.source)
  .pipe(cssmin())
  .pipe(gulp.dest(config.build + config.css.target));
});

gulp.task('fonts', function () {
  return gulp.src(config.fonts.source)
  .pipe(gulp.dest(config.build + config.fonts.target));
});

gulp.task('html', function () {
  return gulp.src(config.html.source)
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest(config.build + config.html.target));
});

gulp.task('js', function () {
  return gulp.src(config.js.source)
  .pipe(gulp.dest(config.build + config.js.target));
});

gulp.task('build', ['html','css','js','fonts']);

gulp.task('serve', function() {
  browserSync({
    notify: false,
    logPrefix: 'EoM',
    server: {
      baseDir: "./"
    }
  });

  gulp.watch(['*.html'], reload);
  gulp.watch(['css/*.css'], reload);
  gulp.watch(['js/*.js'], reload);
});