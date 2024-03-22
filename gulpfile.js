const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function compileTS() {
    return gulp.src(['./**/*.ts', '!node_modules/**/*.ts', '!__tests__/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
}

//function watch() {
    //gulp.watch(['./**/*.ts',"!node_modules/**/*.ts"], compileTS);
//}

exports.default = gulp.series(compileTS);