const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const path = require('path');


function logError(err){
    console.log(err);
    this.emit('end');
}


gulp.task('js:app', () => {
    return gulp.src(path.join(__dirname,'lib/**/*.js',))
    .pipe(sourcemaps.init())
    .on('error',logError)
    .pipe(babel({
        presets: ['env']
    }))
    .on('error', logError)
    .pipe(sourcemaps.write())
    .on('error', logError)
    .pipe(gulp.dest('./dist'));
});

gulp.task('js:watch', () => {
    return gulp.watch('./lib/**/*.js',['js:app']);
});


/**
 * The default gulp taks
 * Dev - for dev watch
 * default - for build
 */
gulp.task('default', ['js:app']);
gulp.task('dev',['js:app','js:watch']);