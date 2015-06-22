'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var debug = require('gulp-debug');
var gh_pages = require('gulp-gh-pages');
var uglify = require('gulp-uglify');
var minify_css = require('gulp-minify-css');
var minify_html = require('gulp-minify-html');
var image_resize = require('gulp-image-resize');
var rename = require('gulp-rename');
var imagemin = require('imagemin-jpegtran');

gulp.task('html', function() {
  return gulp.src(['views/**/*.html', '*.html'], {base: '.'})
    .pipe(minify_html())
    .pipe(gulp.dest('build'));
});

gulp.task('css', function() {
  return gulp.src('{css,views}/**/*.css', {base: '.'})
    .pipe(minify_html())
    .pipe(gulp.dest('build'));
});

gulp.task('js', function() {
  return gulp.src('{js,views}/**/*.js', {base: '.'})
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('build'));
});

gulp.task('jpg', function() {
  return gulp.src(['img/**/*.jpg', 'views/**/!(pizzeria).jpg'], {base: '.'})
    .pipe(imagemin()().on('error', console.error.bind(console)))
    .pipe(debug())
    .pipe(gulp.dest('build'));
});

gulp.task('png', function() {
  return gulp.src('{img/**/*.png,views/**/*.png}', {base: '.'})
    .pipe(gulp.dest('build'));
});

gulp.task('pizzeria_image', function() {
  return gulp.src('views/images/pizzeria.jpg')
    .pipe(gulp.dest('build/views/images'))
    .pipe(image_resize({width: 100, quality: 0.5}))
    .pipe(rename(function(path) {
      path.basename += "_100";
    }))
    .pipe(imagemin()())
    .pipe(gulp.dest('build/views/images'));
});

gulp.task('gh_pages', ['default'], function() {
  return gulp.src('build/**/*')
    .pipe(gh_pages());
});

gulp.task('default', ['html', 'css', 'js', 'jpg', 'png', 'pizzeria_image']);
