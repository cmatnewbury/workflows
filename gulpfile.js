var gulp = require('gulp'), 
    gutil = require('gulp-util'),
    coffee = require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    //rubsass = require('gulp-ruby-sass'),
    concat = require('gulp-concat');


var coffeeSources = ['components/coffee/tagline.coffee'];
var jsSources = [
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js'
];
var sassSources = ['components/sass/style.scss']

gulp.task('coffee', function(done){
    gulp.src(coffeeSources)
        .pipe(coffee({bare: true})
            .on('error', gutil.log))
        .pipe(gulp.dest('components/scripts'))
        done();
});

gulp.task('js', function(done){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify())
        .pipe(gulp.dest('builds/development/js'))
        .pipe(connect.reload())
        done();
});
/*gulp.task('compass', function(done){
    gulp.src(sassSources)
        .pipe(rubsass())
        .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
        done();
});*/
gulp.task('compass', function(done){
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: 'builds/development/images',
            style: 'expanded'
        }))
        .on('error', gutil.log)
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())
        done();
});

gulp.task('watch', function(){
    gulp.watch(coffeeSources, gulp.parallel('coffee'));
    gulp.watch(jsSources, gulp.parallel('js'));
    gulp.watch('components/sass/*.scss', gulp.parallel('compass'));
});

gulp.task('connect', function(){
    connect.server({
        root:'builds/development/', 
        livereload: true
    })
});


gulp.task('default',  gulp.parallel('coffee','js','compass', 'watch', 'connect'));

