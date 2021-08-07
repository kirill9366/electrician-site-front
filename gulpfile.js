var gulp = require("gulp");

var sass = require('gulp-sass')(require('sass')); // переводит SASS в CSS
    cssnano = require("gulp-cssnano"), // Минимизация CSS
    autoprefixer = require('gulp-autoprefixer'), // Проставлет вендорные префиксы в CSS для поддержки старых браузеров
    imagemin = require('gulp-imagemin'), // Сжатие изображение
    concat = require("gulp-concat"), // Объединение файлов - конкатенация
    uglify = require("gulp-uglify"), // Минимизация javascript
    rename = require("gulp-rename"); // Переименование файлов
    pug = require('gulp-pug');

/* --------------------------------------------------------
   ----------------- Таски ---------------------------
------------------------------------------------------------ */

gulp.task('pug', function buildHTML() {
  return gulp.src('src/pages/*.pug')
  .pipe(pug({
      doctype: 'html',
      pretty: true
  }))
  .pipe(gulp.dest("dist/html"))
});

// Объединение, компиляция Sass в CSS, простановка венд. префиксов и дальнейшая минимизация кода
gulp.task("sass", function() {
    return gulp.src(['src/sass/*.sass','src/blocks/**/*.sass', 'src/pages/**/*.sass', 'src/elements/**/*.sass'])
        .pipe(concat('styles.sass'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
         }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("dist/css"));
});

// Объединение и сжатие JS-файлов
gulp.task("scripts", function() {
    return gulp.src("src/js/*.js") // директория откуда брать исходники
        .pipe(concat('scripts.js')) // объеденим все js-файлы в один 
        .pipe(uglify()) // вызов плагина uglify - сжатие кода
        .pipe(rename({ suffix: '.min' })) // вызов плагина rename - переименование файла с приставкой .min
        .pipe(gulp.dest("dist/js")); // директория продакшена, т.е. куда сложить готовый файл
});

// Сжимаем картинки
gulp.task('imgs', function() {
    return gulp.src("src/images/*.+(jpg|jpeg|png|gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest("dist/images"))
});

// Задача слежения за измененными файлами
gulp.task("watch", function() {
    gulp.watch("src/blocks/**/*.pug", gulp.series("pug"));
    gulp.watch("src/pages/*.pug", gulp.series("pug"));
    gulp.watch("src/js/*.js", gulp.series("scripts"));
    gulp.watch(['src/sass/*.sass','src/blocks/**/*.sass', 'src/pages/**/*.sass', 'src/elements/**/*.sass'], gulp.series("sass"));
    gulp.watch("src/images/*.+(jpg|jpeg|png|gif)",  gulp.series("imgs"));
});
