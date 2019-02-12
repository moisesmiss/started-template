var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var wait = require('gulp-wait');
var php = require('gulp-connect-php');

gulp.task('php', function(){
	php.server({base:'./', port:8000, keepalive:true});
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("./scss/**/*.scss") //CARPETA SCSS ORIGEN
        .pipe(wait(100))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest("./css/")) //CARPETA CSS DESTINO
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['php', 'sass'], function() {


    browserSync.init({
    	proxy: 'localhost:8000',
    	baseDir: './',
    	open: true,
    	notify: false,
        //server: "./" //RUTA PRINCIPAL DONDE SE INICIALIZARÁ EL SERVIDOR
    });

    gulp.watch("./scss/**/*.scss", ['sass']); //RUTA DE LA CARPETA DE SASS ORIGEN
    gulp.watch("./**/*.html").on('change', browserSync.reload); //WATCH DE LOS ARCHIVOS HTML
    gulp.watch("./**/*.php", browserSync.reload); //WATCH DE LOS ARCHIVOS PHP
});

gulp.task('default', ['serve']);