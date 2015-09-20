'use strict';
var gulp = require('gulp')
var rename = require('gulp-rename')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var connect = require('gulp-connect')
var notify = require("gulp-notify")
var autoprefixer = require('gulp-autoprefixer')
var minifycss = require('gulp-minify-css')
var notify = require("gulp-notify")
var plumber = require('gulp-plumber')
var sass = require('gulp-scss')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var ngAnnotate = require('gulp-ng-annotate')
var browserSync = require('browser-sync').create()


var src = 'css/main.scss';
var dest = 'css/';

gulp.task('serve', function() {
    browserSync.init({
        server: "",
        port: 1337
    });
    gulp.watch(['css/**/*.scss'], ['sass', browserSync.reload]);
    gulp.watch(['index.html'], [browserSync.reload]);
});


gulp.task('sass', function() {
    return gulp.src(['css/main.scss'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass())
        .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}))
        .pipe(autoprefixer('last 2 version'))
        .pipe(minifycss())
        .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}))
        .pipe(gulp.dest('css/'))
        .on("error", notify.onError({message: "Error: <%= error.message %>", title: "Error running something"}))
        .pipe(browserSync.stream());
});


gulp.task('watch', function() {
    gulp.watch([src], ['sass']);
});

gulp.task('default', ['serve' ]);