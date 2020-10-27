const  gulp = require("gulp");
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const notifier = require('node-notifier');
const c = require('ansi-colors');
var csso = require('gulp-csso');
var reload = browserSync.reload;


function ourError (err){

    console.log(c.red(err.messageFormatted));

    notifier.notify({
        title: 'Sass error',
        message: err.messageFormatted
      });
}

const server = function(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        notify: false
    });

    cb();
};



const css = function (){
    return gulp.src('./scss/main.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({
          outputStyle: "expanded" // nested, compact, expanded, compressed
      }).on('error', ourError))
      .pipe(csso()) 
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./css'))
      .pipe(browserSync.stream());
}

const watchFiles = function(cb){
    gulp.watch('./scss/**/*.scss', gulp.series(css));
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch(['./js/**/*.js', './js/*.js']).on('change', reload);

    cb();
}


exports.css = css;
exports.watchFiles = watchFiles;
exports.server = server;

exports.default = gulp.series(css, server, watchFiles);