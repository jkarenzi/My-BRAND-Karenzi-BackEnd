const gulp = require('gulp');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

function compileTS() {
    return tsProject.src(['routes/**/*.ts', 'controllers/**/*.ts', '*.ts','models/**/*.ts'])
        .pipe(tsProject())
        .pipe(gulp.dest('dist'));
}

function watch() {
    gulp.watch(['routes/**/*.ts', 'controllers/**/*.ts', '*.ts','models/**/*.ts'], compileTS);
}

exports.default = gulp.series(compileTS, watch);