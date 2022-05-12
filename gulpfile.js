var gulp = require("gulp");

var sass = require('gulp-sass')(require('sass')); // переводит SASS в CSS
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображение
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"); // Переименование файлов
    pug = require('gulp-pug');
    browserSync = require('browser-sync');

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pages/*.pug')
  .pipe(pug({
      doctype: 'html',
      pretty: true
  }))
  .pipe(gulp.dest("dist/html"))
  .pipe(browserSync.stream());
});

gulp.task("sass", function() {
    return gulp.src(['src/sass/*.sass',"src/components/***/**/*.sass", 'src/pages/**/*.sass', 'src/elements/**/*.sass'])
        .pipe(concat('styles.sass'))
        .pipe(sass())
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions'],
        //     cascade: true
        //  }))
        // .pipe(cssnano())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream()) ;
});

gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один 
        .pipe(gulp.dest("dist/js")) // директория продакшена, т.е. куда сложить готовый файл
        .pipe(browserSync.stream());
});

gulp.task('imgs', function() {
    return gulp.src("src/images/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"))
        .pipe(browserSync.stream());
});

gulp.task("myserv", function myServer() {
    browserSync.init({
        server: {
            baseDir: 'dist' // здесь указываем корневую папку для локального сервера
        },
        notify: false       // отключаем уведомления
    });

    gulp.watch("src/components/***/**/*.pug", gulp.series("pug"));
    gulp.watch("src/pages/*.pug", gulp.series("pug"));
    gulp.watch("src/js/*.js", gulp.series("scripts"));
    gulp.watch(['src/sass/*.sass',"src/components/***/**/*.sass", 'src/pages/**/*.sass', 'src/elements/**/*.sass'], gulp.series("sass"));
    gulp.watch("src/images/*.+(jpg|jpeg|png|gif)",  gulp.series("imgs"));
});

gulp.task("watch", function() {
    gulp.watch("src/blocks/**/*.pug", gulp.series("pug"));
    gulp.watch("src/pages/*.pug", gulp.series("pug"));
    gulp.watch("src/js/*.js", gulp.series("scripts"));
    gulp.watch(['src/sass/*.sass','src/blocks/**/*.sass', 'src/pages/**/*.sass', 'src/elements/**/*.sass'], gulp.series("sass"));
    gulp.watch("src/images/*.+(jpg|jpeg|png|gif)",  gulp.series("imgs"));
});
